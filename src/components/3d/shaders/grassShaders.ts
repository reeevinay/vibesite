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

    // Height factor: 0 at base, 1 at tip (assuming blade geometry has uv.y 0->1 bottom->top)
    float heightFactor = uv.y;
    vHeight = heightFactor;

    // Start with the local vertex position, apply instance scale on Y
    vec3 pos = position;
    pos.y *= aScale;

    // --- Wind ---
    // Primary wave: large slow sway
    float primaryWind = sin(uTime * 0.8 + aPhase + aOffset.x * 0.5) * uWindStrength;
    // Secondary wave: smaller, faster, offset frequency for natural feel
    float secondaryWind = sin(uTime * 1.7 + aPhase * 1.3 + aOffset.z * 0.3) * uWindStrength * 0.3;
    // Tertiary micro-turbulence
    float tertiaryWind = sin(uTime * 3.1 + aPhase * 2.7 + aOffset.x * 0.9 + aOffset.z * 0.6) * uWindStrength * 0.08;

    float totalWind = primaryWind + secondaryWind + tertiaryWind;

    // Bend increases quadratically with height (tips move more)
    float bendAmount = heightFactor * heightFactor * totalWind;

    pos.x += bendAmount;
    // Slight z sway offset from x for natural 2D wind feel
    pos.z += bendAmount * 0.4 * sin(uTime * 0.6 + aPhase * 0.7);

    // --- Cursor Repulsion ---
    vec3 worldBase = aOffset;
    float distToMouse = length(worldBase.xz - uMouseWorld.xz);
    float repulsionRadius = 2.5;

    if (distToMouse < repulsionRadius) {
      float influence = 1.0 - distToMouse / repulsionRadius;
      influence = influence * influence; // quadratic falloff

      vec2 pushDir = normalize(worldBase.xz - uMouseWorld.xz + vec2(0.0001));
      float repulsionStrength = influence * 1.8;

      pos.x += pushDir.x * repulsionStrength * heightFactor * heightFactor;
      pos.z += pushDir.y * repulsionStrength * heightFactor * heightFactor;
      // Slight downward press near cursor
      pos.y -= influence * 0.3 * heightFactor;
    }

    // Apply instance offset (translation)
    pos += aOffset;

    // Apply the instance rotation/transform matrix (for random rotation around Y)
    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(pos - aOffset, 1.0);
    // Re-add offset in world space after instance rotation
    mvPosition = modelViewMatrix * vec4((instanceMatrix * vec4(pos - aOffset, 1.0)).xyz + aOffset, 1.0);

    vWorldPosition = (modelMatrix * vec4((instanceMatrix * vec4(pos - aOffset, 1.0)).xyz + aOffset, 1.0)).xyz;

    // Transform normal
    vNormal = normalize(normalMatrix * mat3(instanceMatrix) * normal);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const grassFragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying float vHeight;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  // Simple hash-based noise for color variation
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
    // Deep root shadow color
    vec3 rootColor = vec3(0.043, 0.055, 0.043); // #0B0E0B

    // Tip colors
    vec3 sageTip = vec3(0.56, 0.64, 0.57);   // #8FA392
    vec3 ochreTip = vec3(0.78, 0.49, 0.33);   // #C87D55

    // Noise-based blend between sage and ochre at tips
    float tipNoise = noise2D(vWorldPosition.xz * 0.8);
    float ochreBlend = smoothstep(0.35, 0.7, tipNoise);
    vec3 tipColor = mix(sageTip, ochreTip, ochreBlend * 0.45);

    // Mid-blade transition color (darker green)
    vec3 midColor = vec3(0.15, 0.22, 0.15);

    // Vertical gradient: root -> mid -> tip
    vec3 color;
    if (vHeight < 0.3) {
      color = mix(rootColor, midColor, vHeight / 0.3);
    } else {
      color = mix(midColor, tipColor, (vHeight - 0.3) / 0.7);
    }

    // Add per-blade color variation
    float bladeVariation = noise2D(vWorldPosition.xz * 2.5) * 0.08 - 0.04;
    color += bladeVariation;

    // Fresnel / rim lighting
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = 1.0 - abs(dot(viewDir, vNormal));
    fresnel = pow(fresnel, 3.0);
    color += fresnel * vec3(0.12, 0.15, 0.1) * vHeight;

    // Subsurface scattering approximation at tips
    float sss = pow(vHeight, 2.5) * 0.15;
    color += sss * vec3(0.3, 0.35, 0.2);

    // Alpha: solid through the body, taper at very top for clean blade tip
    float alpha = 1.0;
    // Taper alpha near the tip edges
    float edgeDist = abs(vUv.x - 0.5) * 2.0; // 0 center, 1 edge
    float taperStart = mix(0.95, 0.3, vHeight); // edges cut in more near tip
    if (edgeDist > taperStart) {
      alpha = 1.0 - smoothstep(taperStart, 1.0, edgeDist);
    }

    // Hard alpha cutoff for clean look
    if (alpha < 0.1) discard;

    // Premultiplied alpha output
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;
