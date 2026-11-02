export const waterVertexShader = /* glsl */ `
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const waterFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uSunMode;
  uniform vec3 uRippleOrigins[5];
  uniform int uRippleCount;

  varying vec2 vUv;
  varying vec3 vWorldPosition;

  // Hash noise functions
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise2D(p);
      p *= 2.1;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    // Distance from center of pond (radius is 4.0)
    float distFromCenter = length(vWorldPosition.xz);

    // --- Dark Nocturnal Theme Colors ---
    vec3 nightDeep = vec3(0.043, 0.055, 0.043);
    vec3 nightTint = vec3(0.05, 0.08, 0.07);
    vec3 nightColor = mix(nightDeep, nightTint, 0.5);

    // --- Sun Mode Radiant Water Colors (Luminous Sky Pool) ---
    vec3 sunDeep   = vec3(0.66, 0.76, 0.82); // Soft cerulean sky reflection
    vec3 sunEdge   = vec3(0.82, 0.86, 0.84); // Glistening shallow edge
    vec3 sunColor  = mix(sunDeep, sunEdge, smoothstep(1.5, 4.0, distFromCenter));

    // Base color blend
    vec3 color = mix(nightColor, sunColor, uSunMode);

    // --- Animated caustics / water movement ---
    vec2 causticUV = vWorldPosition.xz * 0.3;
    float caustic1 = fbm(causticUV + vec2(uTime * 0.04, uTime * 0.03));
    float caustic2 = fbm(causticUV * 1.3 + vec2(-uTime * 0.05, uTime * 0.02) + 5.0);
    float causticPattern = caustic1 * caustic2;
    causticPattern = smoothstep(0.05, 0.25, causticPattern);

    vec3 nightCaustic = vec3(0.03, 0.05, 0.04) * 0.8;
    vec3 sunCaustic = vec3(0.96, 0.94, 0.84) * 0.45; // Warm sun caustics
    color += causticPattern * mix(nightCaustic, sunCaustic, uSunMode);

    // Subtle surface undulation highlights
    float surfaceNoise = noise2D(vWorldPosition.xz * 0.5 + vec2(uTime * 0.06));
    vec3 undulationColor = mix(vec3(0.01, 0.015, 0.012), vec3(0.08, 0.09, 0.07), uSunMode);
    color += surfaceNoise * undulationColor * 0.5;

    // --- Ripples ---
    float rippleIntensity = 0.0;

    for (int i = 0; i < 5; i++) {
      if (i >= uRippleCount) break;

      vec3 ripple = uRippleOrigins[i];
      vec2 ripplePos = ripple.xy;
      float birthTime = ripple.z;
      float age = uTime - birthTime;

      if (age < 0.0 || age > 3.0) continue;

      float dist = length(vWorldPosition.xz - ripplePos);
      float ringRadius = age * 3.0;
      float ringWidth = 0.6 + age * 0.3;
      float ringDist = abs(dist - ringRadius);

      float ring = 0.0;
      if (ringDist < ringWidth) {
        ring = sin((1.0 - ringDist / ringWidth) * 3.14159) * 0.5 + 0.5;
      }

      float lifeFade = 1.0 - age / 3.0;
      lifeFade = lifeFade * lifeFade;
      float distFade = 1.0 / (1.0 + dist * 0.3);

      rippleIntensity += ring * lifeFade * distFade;
    }

    rippleIntensity = clamp(rippleIntensity, 0.0, 1.0);
    vec3 nightRippleColor = vec3(0.15, 0.2, 0.18);
    vec3 sunRippleColor = vec3(0.98, 0.94, 0.80);
    vec3 rippleColor = mix(nightRippleColor, sunRippleColor, uSunMode);
    color += rippleIntensity * rippleColor * (uSunMode > 0.5 ? 0.6 : 1.0);

    // --- Fresnel reflection ---
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 surfaceNormal = vec3(0.0, 1.0, 0.0);

    float normalNoise1 = noise2D(vWorldPosition.xz * 1.5 + uTime * 0.1) * 2.0 - 1.0;
    float normalNoise2 = noise2D(vWorldPosition.xz * 1.5 + uTime * 0.1 + 100.0) * 2.0 - 1.0;
    surfaceNormal = normalize(surfaceNormal + vec3(normalNoise1, 0.0, normalNoise2) * 0.06);

    float fresnel = 1.0 - max(dot(viewDir, surfaceNormal), 0.0);
    fresnel = pow(fresnel, 3.5);

    vec3 nightReflection = vec3(0.949, 0.937, 0.914) * 0.2;
    vec3 sunReflection = vec3(0.984, 0.976, 0.945) * 0.6; // #FBF9F1 warm sky sheen
    vec3 reflectionColor = mix(nightReflection, sunReflection, uSunMode);
    color = mix(color, reflectionColor, fresnel * 0.6);

    // Soft organic edge alpha to blend seamlessly into the terrain bank
    float edgeAlpha = 1.0 - smoothstep(3.4, 4.0, distFromCenter);
    float finalAlpha = mix(0.92, 0.85, uSunMode) * edgeAlpha;

    gl_FragColor = vec4(color, finalAlpha);
  }
`;
