export const terrainVertexShader = /* glsl */ `
  uniform float uTime;

  varying float vHeight;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  //
  // Simplex 2D noise — based on the work of Ian McEwan, Ashima Arts.
  //
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec2 mod289v2(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec3 permute(vec3 x) {
    return mod289(((x * 34.0) + 1.0) * x);
  }

  float simplex2D(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187,   // (3.0 - sqrt(3.0)) / 6.0
      0.366025403784439,   // 0.5 * (sqrt(3.0) - 1.0)
      -0.577350269189626,  // -1.0 + 2.0 * C.x
      0.024390243902439    // 1.0 / 41.0
    );

    // First corner
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);

    // Other corners
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);

    vec2 x1 = x0 + C.xx - i1;
    vec2 x2 = x0 + C.zz;

    // Permutations
    i = mod289v2(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));

    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0);
    m = m * m;
    m = m * m;

    // Gradients
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    // Normalise gradients implicitly by scaling m
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

    // Compute final noise value at P
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.y = a0.y * x1.x + h.y * x1.y;
    g.z = a0.z * x2.x + h.z * x2.y;

    return 130.0 * dot(m, g);
  }

  void main() {
    vec3 pos = position;

    // Layered simplex noise displacement
    float noiseVal = simplex2D(pos.xz * 0.15) * 2.0
                   + simplex2D(pos.xz * 0.4) * 0.5;

    pos.y += noiseVal;

    vHeight = noiseVal;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;

    // Approximate displaced normal via finite differences
    float eps = 0.2;

    float hL = simplex2D((position.xz + vec2(-eps, 0.0)) * 0.15) * 2.0
             + simplex2D((position.xz + vec2(-eps, 0.0)) * 0.4) * 0.5;
    float hR = simplex2D((position.xz + vec2( eps, 0.0)) * 0.15) * 2.0
             + simplex2D((position.xz + vec2( eps, 0.0)) * 0.4) * 0.5;
    float hD = simplex2D((position.xz + vec2(0.0, -eps)) * 0.15) * 2.0
             + simplex2D((position.xz + vec2(0.0, -eps)) * 0.4) * 0.5;
    float hU = simplex2D((position.xz + vec2(0.0,  eps)) * 0.15) * 2.0
             + simplex2D((position.xz + vec2(0.0,  eps)) * 0.4) * 0.5;

    vec3 displNormal = normalize(vec3(hL - hR, 2.0 * eps, hD - hU));
    vNormal = normalize(normalMatrix * displNormal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const terrainFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uSunMode;

  varying float vHeight;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  // Simple hash noise for texture variation
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
      p *= 2.03;
      amplitude *= 0.48;
    }
    return value;
  }

  void main() {
    // Terrain colors
    vec3 obsidian    = vec3(0.043, 0.055, 0.043); // #0B0E0B — deep valleys
    vec3 darkMoss    = vec3(0.118, 0.157, 0.125); // #1E2820 — mid rises
    vec3 driedMoss   = vec3(0.227, 0.278, 0.235); // #3A473C — peaks

    // Normalize height for blending (noise range is roughly -2.5 to 2.5)
    float normalizedHeight = smoothstep(-2.0, 2.5, vHeight);

    // Blend between terrain colors based on height
    vec3 color;
    if (normalizedHeight < 0.4) {
      color = mix(obsidian, darkMoss, normalizedHeight / 0.4);
    } else {
      color = mix(darkMoss, driedMoss, (normalizedHeight - 0.4) / 0.6);
    }

    // Bright sunlit earth enhancement in Sun Mode
    vec3 sunTerrain = mix(vec3(0.32, 0.42, 0.30), vec3(0.55, 0.58, 0.46), normalizedHeight);
    color = mix(color, sunTerrain, uSunMode * 0.7);

    // Noise-based texture variation for organic look
    float texNoise = fbm(vWorldPosition.xz * 1.5);
    color += (texNoise - 0.5) * 0.04;

    // Additional micro-detail noise
    float detailNoise = noise2D(vWorldPosition.xz * 8.0);
    color += (detailNoise - 0.5) * 0.015;

    // Subtle directional lighting based on displaced normal
    vec3 lightDir = normalize(vec3(0.3, 1.0, 0.2));
    float diffuse = max(dot(vNormal, lightDir), 0.0);
    float ambient = 0.4;
    float lighting = ambient + (1.0 - ambient) * diffuse;
    color *= lighting;

    // Slope-based darkening (steeper slopes are darker / mossy)
    float slope = 1.0 - vNormal.y; // 0 = flat, 1 = vertical
    color = mix(color, obsidian * 1.2, slope * 0.3);

    // --- Distance fog ---
    float distFromCamera = length(vWorldPosition - cameraPosition);
    float fogStart = 30.0;
    float fogEnd = 80.0;
    float fogFactor = smoothstep(fogStart, fogEnd, distFromCamera);
    vec3 fogColor = vec3(0.035, 0.045, 0.04); // very dark atmospheric fog
    color = mix(color, fogColor, fogFactor * 0.6);

    gl_FragColor = vec4(color, 1.0);
  }
`;
