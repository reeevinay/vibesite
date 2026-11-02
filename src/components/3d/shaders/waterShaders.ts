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
    // Base color: reflective dark obsidian water with subtle deep botanical tint
    vec3 baseDeep = vec3(0.043, 0.055, 0.043);    // #0B0E0B
    vec3 baseTint = vec3(0.06, 0.09, 0.08);
    vec3 color = mix(baseDeep, baseTint, 0.5);

    // --- Animated caustics / water movement ---
    vec2 causticUV = vWorldPosition.xz * 0.3;
    float caustic1 = fbm(causticUV + vec2(uTime * 0.04, uTime * 0.03));
    float caustic2 = fbm(causticUV * 1.3 + vec2(-uTime * 0.05, uTime * 0.02) + 5.0);
    float causticPattern = caustic1 * caustic2;
    causticPattern = smoothstep(0.05, 0.25, causticPattern);
    color += causticPattern * vec3(0.04, 0.07, 0.06) * 0.9;

    // Surface undulation highlights
    float surfaceNoise = noise2D(vWorldPosition.xz * 0.5 + vec2(uTime * 0.06));
    color += surfaceNoise * vec3(0.015, 0.02, 0.018) * 0.6;

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
    vec3 rippleColor = vec3(0.18, 0.24, 0.22);
    color += rippleIntensity * rippleColor;

    // Secondary inner ripple ring
    for (int i = 0; i < 5; i++) {
      if (i >= uRippleCount) break;

      vec3 ripple = uRippleOrigins[i];
      float age = uTime - ripple.z;
      if (age < 0.0 || age > 2.5) continue;

      float dist = length(vWorldPosition.xz - ripple.xy);
      float innerRadius = age * 2.0;
      float innerWidth = 0.3 + age * 0.15;
      float innerDist = abs(dist - innerRadius);

      float innerRing = 0.0;
      if (innerDist < innerWidth) {
        innerRing = sin((1.0 - innerDist / innerWidth) * 3.14159);
      }

      float fade = (1.0 - age / 2.5);
      fade *= fade;

      color += innerRing * fade * vec3(0.08, 0.12, 0.10) / (1.0 + dist * 0.4);
    }

    // --- Fresnel reflection ---
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 surfaceNormal = vec3(0.0, 1.0, 0.0);

    float normalNoise1 = noise2D(vWorldPosition.xz * 1.5 + uTime * 0.1) * 2.0 - 1.0;
    float normalNoise2 = noise2D(vWorldPosition.xz * 1.5 + uTime * 0.1 + 100.0) * 2.0 - 1.0;
    surfaceNormal = normalize(surfaceNormal + vec3(normalNoise1, 0.0, normalNoise2) * 0.06);

    float fresnel = 1.0 - max(dot(viewDir, surfaceNormal), 0.0);
    fresnel = pow(fresnel, 4.0);

    // Warm parchment reflection at grazing angles
    vec3 reflectionColor = vec3(0.949, 0.937, 0.914); // #F2EFE9
    color = mix(color, reflectionColor * 0.25, fresnel * 0.55);

    color += fresnel * vec3(0.05, 0.07, 0.06) * 0.4;

    gl_FragColor = vec4(color, 0.92);
  }
`;
