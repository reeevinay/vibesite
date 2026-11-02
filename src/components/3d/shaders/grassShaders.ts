export const grassVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uWindStrength;
  uniform vec3 uMouseWorld;

  attribute vec3 aOffset;
  attribute float aScale;
  attribute float aPhase;

  varying vec2 vUv;
  varying float vHeight;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;

    float heightFactor = uv.y;
    vHeight = heightFactor;

    vec3 pos = position;
    pos.y *= aScale;

    // --- Wind ---
    float primaryWind = sin(uTime * 0.8 + aPhase + aOffset.x * 0.5) * uWindStrength;
    float secondaryWind = sin(uTime * 1.7 + aPhase * 1.3 + aOffset.z * 0.3) * uWindStrength * 0.3;
    float tertiaryWind = sin(uTime * 3.1 + aPhase * 2.7 + aOffset.x * 0.9 + aOffset.z * 0.6) * uWindStrength * 0.08;

    float totalWind = primaryWind + secondaryWind + tertiaryWind;
    float bendAmount = heightFactor * heightFactor * totalWind;

    pos.x += bendAmount;
    pos.z += bendAmount * 0.4 * sin(uTime * 0.6 + aPhase * 0.7);

    // --- Cursor Repulsion ---
    vec3 worldBase = aOffset;
    float distToMouse = length(worldBase.xz - uMouseWorld.xz);
    float repulsionRadius = 2.5;

    if (distToMouse < repulsionRadius) {
      float influence = 1.0 - distToMouse / repulsionRadius;
      influence = influence * influence;

      vec2 pushDir = normalize(worldBase.xz - uMouseWorld.xz + vec2(0.0001));
      float repulsionStrength = influence * 1.8;

      pos.x += pushDir.x * repulsionStrength * heightFactor * heightFactor;
      pos.z += pushDir.y * repulsionStrength * heightFactor * heightFactor;
      pos.y -= influence * 0.3 * heightFactor;
    }

    pos += aOffset;

    vec4 mvPosition = modelViewMatrix * vec4((instanceMatrix * vec4(pos - aOffset, 1.0)).xyz + aOffset, 1.0);
    vWorldPosition = (modelMatrix * vec4((instanceMatrix * vec4(pos - aOffset, 1.0)).xyz + aOffset, 1.0)).xyz;
    vNormal = normalize(normalMatrix * mat3(instanceMatrix) * normal);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const grassFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uSunMode;

  varying vec2 vUv;
  varying float vHeight;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

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

  void main() {
    // Nocturnal / Dawn blade colors
    vec3 rootColor = vec3(0.043, 0.055, 0.043);
    vec3 sageTip   = vec3(0.56, 0.64, 0.57);
    vec3 ochreTip  = vec3(0.78, 0.49, 0.33);

    float tipNoise = noise2D(vWorldPosition.xz * 0.8);
    float ochreBlend = smoothstep(0.35, 0.7, tipNoise);
    vec3 darkTipColor = mix(sageTip, ochreTip, ochreBlend * 0.45);
    vec3 darkMidColor = vec3(0.15, 0.22, 0.15);

    vec3 darkColor;
    if (vHeight < 0.3) {
      darkColor = mix(rootColor, darkMidColor, vHeight / 0.3);
    } else {
      darkColor = mix(darkMidColor, darkTipColor, (vHeight - 0.3) / 0.7);
    }

    // --- Luminous Sun Mode Blade Colors ---
    // Warm sunlit sage base rising into sun-kissed meadow green and golden wheat tips
    vec3 sunRoot      = vec3(0.42, 0.50, 0.32); // Sunlit earth base (warm, not black!)
    vec3 sunMid       = vec3(0.55, 0.68, 0.38); // Lush sunlit clover green
    vec3 sunGoldenTip = vec3(0.90, 0.78, 0.44); // Honey-golden sunlight tips

    vec3 sunColor;
    if (vHeight < 0.35) {
      sunColor = mix(sunRoot, sunMid, vHeight / 0.35);
    } else {
      sunColor = mix(sunMid, sunGoldenTip, (vHeight - 0.35) / 0.65);
    }

    // Full smooth transition to Sun Mode
    vec3 color = mix(darkColor, sunColor, uSunMode);

    // Subtle per-blade variation
    float bladeVariation = noise2D(vWorldPosition.xz * 2.5) * 0.06 - 0.03;
    color += bladeVariation;

    // Fresnel / rim lighting
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = 1.0 - abs(dot(viewDir, vNormal));
    fresnel = pow(fresnel, 2.5);
    vec3 rimColor = mix(vec3(0.12, 0.15, 0.1), vec3(0.55, 0.48, 0.25), uSunMode);
    color += fresnel * rimColor * vHeight;

    // Subsurface scattering at blade tips
    float sss = pow(vHeight, 2.0) * (uSunMode > 0.5 ? 0.25 : 0.15);
    vec3 sssColor = mix(vec3(0.3, 0.35, 0.2), vec3(0.75, 0.78, 0.40), uSunMode);
    color += sss * sssColor;

    // Alpha taper at blade tip
    float alpha = 1.0;
    float edgeDist = abs(vUv.x - 0.5) * 2.0;
    float taperStart = mix(0.95, 0.3, vHeight);
    if (edgeDist > taperStart) {
      alpha = 1.0 - smoothstep(taperStart, 1.0, edgeDist);
    }

    if (alpha < 0.1) discard;

    gl_FragColor = vec4(color * alpha, alpha);
  }
`;
