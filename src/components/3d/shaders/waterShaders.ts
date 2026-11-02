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
  uniform vec3 uRippleOrigins[5]; // xy = world position, z = birth time
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

  // Fractional Brownian Motion for caustics
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
    // Base color: dark reflective surface with subtle blue-green tint
    vec3 baseDeep = vec3(0.043, 0.055, 0.043);    // #0B0E0B
    vec3 baseTint = vec3(0.05, 0.08, 0.07);
    vec3 color = mix(baseDeep, baseTint, 0.5);

    // --- Animated caustics / water movement ---
    vec2 causticUV = vWorldPosition.xz * 0.3;
    float caustic1 = fbm(causticUV + vec2(uTime * 0.04, uTime * 0.03));
    float caustic2 = fbm(causticUV * 1.3 + vec2(-uTime * 0.05, uTime * 0.02) + 5.0);
    float causticPattern = caustic1 * caustic2;
    causticPattern = smoothstep(0.05, 0.25, causticPattern);
    color += causticPattern * vec3(0.03, 0.05, 0.04) * 0.8;

    // Subtle surface undulation highlights
    float surfaceNoise = noise2D(vWorldPosition.xz * 0.5 + vec2(uTime * 0.06));
    color += surfaceNoise * vec3(0.01, 0.015, 0.012) * 0.5;

    // --- Ripples ---
    float rippleIntensity = 0.0;

    for (int i = 0; i < 5; i++) {
      if (i >= uRippleCount) break;

      vec3 ripple = uRippleOrigins[i];
      vec2 ripplePos = ripple.xy;
      float birthTime = ripple.z;
      float age = uTime - birthTime;

      // Ripple lives for 3 seconds
      if (age < 0.0 || age > 3.0) continue;

      float dist = length(vWorldPosition.xz - ripplePos);

      // Expanding ring: speed and radius grow with time
      float ringRadius = age * 3.0; // expands outward
      float ringWidth = 0.6 + age * 0.3; // ring gets wider as it ages

      float ringDist = abs(dist - ringRadius);

      // Soft ring shape using sin for smooth edges
      float ring = 0.0;
      if (ringDist < ringWidth) {
        ring = sin((1.0 - ringDist / ringWidth) * 3.14159) * 0.5 + 0.5;
      }

      // Fade over lifetime (3 seconds)
      float lifeFade = 1.0 - age / 3.0;
      lifeFade = lifeFade * lifeFade; // quadratic fade

      // Diminish with distance from origin
      float distFade = 1.0 / (1.0 + dist * 0.3);

      rippleIntensity += ring * lifeFade * distFade;
    }

    // Apply ripples as bright concentric highlights
    rippleIntensity = clamp(rippleIntensity, 0.0, 1.0);
    vec3 rippleColor = vec3(0.15, 0.2, 0.18);
    color += rippleIntensity * rippleColor;

    // Secondary inner ripple ring for realism
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

      color += innerRing * fade * vec3(0.06, 0.09, 0.08) / (1.0 + dist * 0.4);
    }

    // --- Fresnel reflection ---
    // Approximate view direction from camera
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 surfaceNormal = vec3(0.0, 1.0, 0.0); // flat water surface

    // Perturb normal slightly with noise for micro-waves
    float normalNoise1 = noise2D(vWorldPosition.xz * 1.5 + uTime * 0.1) * 2.0 - 1.0;
    float normalNoise2 = noise2D(vWorldPosition.xz * 1.5 + uTime * 0.1 + 100.0) * 2.0 - 1.0;
    surfaceNormal = normalize(surfaceNormal + vec3(normalNoise1, 0.0, normalNoise2) * 0.06);

    float fresnel = 1.0 - max(dot(viewDir, surfaceNormal), 0.0);
    fresnel = pow(fresnel, 4.0);

    // Parchment-tinted reflection at grazing angles
    vec3 reflectionColor = vec3(0.949, 0.937, 0.914); // #F2EFE9
    color = mix(color, reflectionColor * 0.2, fresnel * 0.5);

    // Slight overall edge glow
    color += fresnel * vec3(0.04, 0.05, 0.045) * 0.3;

    gl_FragColor = vec4(color, 0.92);
  }
`;
