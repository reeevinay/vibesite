'use client'

import { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { grassVertexShader, grassFragmentShader } from './shaders/grassShaders'
import { waterVertexShader, waterFragmentShader } from './shaders/waterShaders'
import { terrainVertexShader, terrainFragmentShader } from './shaders/terrainShaders'

// ---------------------------------------------------------------------------
// Inline 2D value noise (no external deps)
// ---------------------------------------------------------------------------

function hash(x: number, y: number): number {
  return ((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1 + 1) % 1
}

function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy

  const sx = fx * fx * (3.0 - 2.0 * fx)
  const sy = fy * fy * (3.0 - 2.0 * fy)

  const n00 = hash(ix, iy)
  const n10 = hash(ix + 1, iy)
  const n01 = hash(ix, iy + 1)
  const n11 = hash(ix + 1, iy + 1)

  const nx0 = n00 * (1 - sx) + n10 * sx
  const nx1 = n01 * (1 - sx) + n11 * sx

  return nx0 * (1 - sy) + nx1 * sy
}

function noise2D(x: number, y: number): number {
  return smoothNoise(x, y) * 2.0 - 1.0
}

function terrainHeight(x: number, z: number): number {
  return noise2D(x * 0.15, z * 0.15) * 2.0 + noise2D(x * 0.4, z * 0.4) * 0.5
}

// ---------------------------------------------------------------------------
// GrassField
// ---------------------------------------------------------------------------

const GRASS_COUNT = 12000
const GRASS_AREA = 30

function GrassField() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const mouseWorld = useRef(new THREE.Vector3(0, 0, 0))
  const groundPlaneRef = useRef<THREE.Mesh>(null)
  const raycaster = useRef(new THREE.Raycaster())
  const pointerNdc = useRef(new THREE.Vector2(0, 0))

  const { bladeGeo, offsets, scales, phases } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.05, 1.0, 1, 5)
    const posAttr = geo.attributes.position as THREE.BufferAttribute
    const posArray = posAttr.array as Float32Array

    // Taper top vertices – the blade is in XY plane, Y going up 0→1
    for (let i = 0; i < posArray.length; i += 3) {
      const yNorm = (posArray[i + 1] + 0.5) // 0 at bottom, 1 at top
      const taper = 1.0 - yNorm * 0.9
      posArray[i] *= taper
    }
    posAttr.needsUpdate = true

    // Shift pivot to base (bottom of blade)
    geo.translate(0, 0.5, 0)

    const oArr = new Float32Array(GRASS_COUNT * 3)
    const sArr = new Float32Array(GRASS_COUNT)
    const pArr = new Float32Array(GRASS_COUNT)

    for (let i = 0; i < GRASS_COUNT; i++) {
      const x = (Math.random() - 0.5) * GRASS_AREA
      const z = (Math.random() - 0.5) * GRASS_AREA
      const y = terrainHeight(x, z)

      oArr[i * 3 + 0] = x
      oArr[i * 3 + 1] = y
      oArr[i * 3 + 2] = z

      sArr[i] = 0.5 + Math.random() * 1.0 // 0.5-1.5
      pArr[i] = Math.random() * Math.PI * 2.0
    }

    return {
      bladeGeo: geo,
      offsets: oArr,
      scales: sArr,
      phases: pArr,
    }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWindStrength: { value: 0.4 },
      uMouseWorld: { value: new THREE.Vector3(0, 0, 0) },
    }),
    []
  )

  // Attach instanced attributes once
  useEffect(() => {
    if (!meshRef.current) return
    const geo = meshRef.current.geometry
    geo.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 3))
    geo.setAttribute('aScale', new THREE.InstancedBufferAttribute(scales, 1))
    geo.setAttribute('aPhase', new THREE.InstancedBufferAttribute(phases, 1))
  }, [offsets, scales, phases])

  const handlePointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (e.point) {
        mouseWorld.current.copy(e.point)
      }
    },
    []
  )

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime()
      matRef.current.uniforms.uMouseWorld.value.lerp(mouseWorld.current, 0.1)
    }
  })

  return (
    <>
      {/* Hidden ground plane for mouse tracking */}
      <mesh
        ref={groundPlaneRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        visible={false}
        onPointerMove={handlePointerMove}
      >
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* Visible ground plane for raycasting (invisible) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onPointerMove={handlePointerMove}
      >
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      <instancedMesh ref={meshRef} args={[bladeGeo, undefined, GRASS_COUNT]} frustumCulled={false}>
        <shaderMaterial
          ref={matRef}
          vertexShader={grassVertexShader}
          fragmentShader={grassFragmentShader}
          uniforms={uniforms}
          side={THREE.DoubleSide}
          transparent
        />
      </instancedMesh>
    </>
  )
}

// ---------------------------------------------------------------------------
// Terrain
// ---------------------------------------------------------------------------

function Terrain() {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  )

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[60, 60, 128, 128]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={terrainVertexShader}
        fragmentShader={terrainFragmentShader}
        uniforms={uniforms}
        side={THREE.FrontSide}
      />
    </mesh>
  )
}

// ---------------------------------------------------------------------------
// WaterPlane
// ---------------------------------------------------------------------------

interface WaterPlaneProps {
  onWaterClick?: () => void
  onSpawnParticles?: (origin: THREE.Vector3) => void
}

const MAX_RIPPLES = 5

function WaterPlane({ onWaterClick, onSpawnParticles }: WaterPlaneProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const rippleIndex = useRef(0)

  const uniforms = useMemo(() => {
    const origins = new Float32Array(MAX_RIPPLES * 3).fill(9999)
    const times = new Float32Array(MAX_RIPPLES).fill(-100)
    return {
      uTime: { value: 0 },
      uRippleOrigins: { value: origins },
      uRippleTimes: { value: times },
      uRippleCount: { value: MAX_RIPPLES },
    }
  }, [])

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      if (!matRef.current) return

      const p = e.point
      const idx = rippleIndex.current % MAX_RIPPLES
      const origins = matRef.current.uniforms.uRippleOrigins.value as Float32Array
      const times = matRef.current.uniforms.uRippleTimes.value as Float32Array

      origins[idx * 3 + 0] = p.x
      origins[idx * 3 + 1] = p.y
      origins[idx * 3 + 2] = p.z
      times[idx] = matRef.current.uniforms.uTime.value

      rippleIndex.current++

      if (onWaterClick) onWaterClick()
      if (onSpawnParticles) onSpawnParticles(p.clone())
    },
    [onWaterClick, onSpawnParticles]
  )

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} onClick={handleClick}>
      <circleGeometry args={[4, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// ---------------------------------------------------------------------------
// SporeParticles
// ---------------------------------------------------------------------------

const SPORE_COUNT = 200
const SPORE_COLOR = new THREE.Color(0xc87d55)

function SporeParticles({ spawnQueue }: { spawnQueue: THREE.Vector3[] }) {
  const pointsRef = useRef<THREE.Points>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const { positions, velocities, lifetimes, ages, startPositions } = useMemo(() => {
    const pos = new Float32Array(SPORE_COUNT * 3)
    const vel = new Float32Array(SPORE_COUNT * 3)
    const life = new Float32Array(SPORE_COUNT)
    const age = new Float32Array(SPORE_COUNT)
    const startPos = new Float32Array(SPORE_COUNT * 3)

    for (let i = 0; i < SPORE_COUNT; i++) {
      pos[i * 3 + 0] = 0
      pos[i * 3 + 1] = -100 // offscreen
      pos[i * 3 + 2] = 0

      vel[i * 3 + 0] = 0
      vel[i * 3 + 1] = 0
      vel[i * 3 + 2] = 0

      life[i] = 0
      age[i] = 0

      startPos[i * 3 + 0] = 0
      startPos[i * 3 + 1] = -100
      startPos[i * 3 + 2] = 0
    }
    return { positions: pos, velocities: vel, lifetimes: life, ages: age, startPositions: startPos }
  }, [])

  const nextParticle = useRef(0)

  const sporeUniforms = useMemo(
    () => ({
      uColor: { value: SPORE_COLOR },
    }),
    []
  )

  const spawnBurst = useCallback(
    (origin: THREE.Vector3) => {
      const burstCount = 20
      for (let b = 0; b < burstCount; b++) {
        const idx = nextParticle.current % SPORE_COUNT
        nextParticle.current++

        positions[idx * 3 + 0] = origin.x + (Math.random() - 0.5) * 0.5
        positions[idx * 3 + 1] = origin.y + 0.1
        positions[idx * 3 + 2] = origin.z + (Math.random() - 0.5) * 0.5

        startPositions[idx * 3 + 0] = positions[idx * 3 + 0]
        startPositions[idx * 3 + 1] = positions[idx * 3 + 1]
        startPositions[idx * 3 + 2] = positions[idx * 3 + 2]

        velocities[idx * 3 + 0] = (Math.random() - 0.5) * 0.4
        velocities[idx * 3 + 1] = 0.8 + Math.random() * 1.2
        velocities[idx * 3 + 2] = (Math.random() - 0.5) * 0.4

        lifetimes[idx] = 1.5 + Math.random() * 2.0
        ages[idx] = 0
      }
    },
    [positions, velocities, lifetimes, ages, startPositions]
  )

  // Process spawn queue
  const lastQueueLen = useRef(0)

  useFrame(({ clock }, delta) => {
    // Check for new spawn requests
    if (spawnQueue.length > lastQueueLen.current) {
      for (let i = lastQueueLen.current; i < spawnQueue.length; i++) {
        spawnBurst(spawnQueue[i])
      }
      lastQueueLen.current = spawnQueue.length
    }

    // Update existing particles
    for (let i = 0; i < SPORE_COUNT; i++) {
      if (lifetimes[i] <= 0) continue

      ages[i] += delta

      if (ages[i] >= lifetimes[i]) {
        // Kill particle
        lifetimes[i] = 0
        positions[i * 3 + 1] = -100
        continue
      }

      positions[i * 3 + 0] += velocities[i * 3 + 0] * delta
      positions[i * 3 + 1] += velocities[i * 3 + 1] * delta
      positions[i * 3 + 2] += velocities[i * 3 + 2] * delta

      // Gentle drift
      velocities[i * 3 + 0] += (Math.random() - 0.5) * 0.1 * delta
      velocities[i * 3 + 2] += (Math.random() - 0.5) * 0.1 * delta

      // Slow down upward velocity
      velocities[i * 3 + 1] *= 1.0 - 0.5 * delta
    }

    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
      ;(posAttr.array as Float32Array).set(positions)
      posAttr.needsUpdate = true

      const ageAttr = pointsRef.current.geometry.attributes.aAge as THREE.BufferAttribute
      ;(ageAttr.array as Float32Array).set(ages)
      ageAttr.needsUpdate = true

      const lifeAttr = pointsRef.current.geometry.attributes.aLifetime as THREE.BufferAttribute
      ;(lifeAttr.array as Float32Array).set(lifetimes)
      lifeAttr.needsUpdate = true
    }
  })

  const sporeVertexShader = `
    attribute float aAge;
    attribute float aLifetime;
    varying float vAlpha;
    void main() {
      vAlpha = 1.0 - clamp(aAge / max(aLifetime, 0.001), 0.0, 1.0);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = mix(4.0, 1.0, aAge / max(aLifetime, 0.001)) * (200.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `

  const sporeFragmentShader = `
    uniform vec3 uColor;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      if (d > 0.5) discard;
      float softEdge = 1.0 - smoothstep(0.2, 0.5, d);
      gl_FragColor = vec4(uColor, vAlpha * softEdge);
    }
  `

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aAge"
          args={[ages, 1]}
        />
        <bufferAttribute
          attach="attributes-aLifetime"
          args={[lifetimes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={sporeVertexShader}
        fragmentShader={sporeFragmentShader}
        uniforms={sporeUniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ---------------------------------------------------------------------------
// CameraRig
// ---------------------------------------------------------------------------

interface CameraRigProps {
  currentChapter: number
}

const CAMERA_WAYPOINTS = [
  { position: new THREE.Vector3(0, 3, 8), lookAt: new THREE.Vector3(0, 0, 0) },
  { position: new THREE.Vector3(-6, 4, 4), lookAt: new THREE.Vector3(-3, 0, 0) },
  { position: new THREE.Vector3(4, 2, -4), lookAt: new THREE.Vector3(2, 0, -2) },
  { position: new THREE.Vector3(0, 5, -8), lookAt: new THREE.Vector3(0, 1, -4) },
]

function CameraRig({ currentChapter }: CameraRigProps) {
  const { camera } = useThree()
  const currentPos = useRef(new THREE.Vector3(0, 3, 8))
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const mouseOffset = useRef(new THREE.Vector2(0, 0))
  const targetMouseOffset = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseOffset.current.set(
        (e.clientX / window.innerWidth - 0.5) * 2.0,
        (e.clientY / window.innerHeight - 0.5) * 2.0
      )
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((_, delta) => {
    const chapter = Math.max(0, Math.min(3, currentChapter))
    const wp = CAMERA_WAYPOINTS[chapter]

    const damping = 1.0 - Math.pow(0.001, delta)

    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, wp.position.x, damping)
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, wp.position.y, damping)
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, wp.position.z, damping)

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, wp.lookAt.x, damping)
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, wp.lookAt.y, damping)
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, wp.lookAt.z, damping)

    // Mouse parallax
    mouseOffset.current.x = THREE.MathUtils.lerp(
      mouseOffset.current.x,
      targetMouseOffset.current.x,
      0.05
    )
    mouseOffset.current.y = THREE.MathUtils.lerp(
      mouseOffset.current.y,
      targetMouseOffset.current.y,
      0.05
    )

    const parallaxX = mouseOffset.current.x * 0.3
    const parallaxY = mouseOffset.current.y * -0.3

    camera.position.set(
      currentPos.current.x + parallaxX,
      currentPos.current.y + parallaxY,
      currentPos.current.z
    )
    camera.lookAt(currentLookAt.current)
  })

  return null
}

// ---------------------------------------------------------------------------
// VolumetricLight
// ---------------------------------------------------------------------------

const CHAPTER_LIGHT_COLORS = [
  new THREE.Color(0xc87d55), // Chapter 0: warm morning gold
  new THREE.Color(0xb0634b), // Chapter 1: warm terracotta
  new THREE.Color(0xa87230), // Chapter 2: earthy amber
  new THREE.Color(0x2a2d4a), // Chapter 3: cool indigo-blue
]

function VolumetricLight({
  currentChapter,
  season = 'Dawn',
}: {
  currentChapter: number
  season?: 'Dawn' | 'Sun' | 'Night'
}) {
  const groupRef = useRef<THREE.Group>(null)
  const materialsRef = useRef<THREE.MeshBasicMaterial[]>([])

  const rays = useMemo(() => {
    const configs = [
      { pos: [2, 6, -1] as const, rot: [0.3, 0.1, 0.2] as const, scale: [3, 12, 1] as const, opacity: 0.05 },
      { pos: [-3, 7, 1] as const, rot: [-0.2, -0.15, 0.3] as const, scale: [2.5, 14, 1] as const, opacity: 0.04 },
      { pos: [0, 5, -3] as const, rot: [0.15, 0.3, -0.1] as const, scale: [4, 10, 1] as const, opacity: 0.06 },
      { pos: [4, 8, 2] as const, rot: [-0.1, -0.2, 0.15] as const, scale: [2, 16, 1] as const, opacity: 0.07 },
    ]
    return configs
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.z += Math.sin(t * 0.1 + i * 1.5) * 0.0003
        child.rotation.x += Math.cos(t * 0.08 + i * 2.0) * 0.0002
      })
    }

    let targetColor: THREE.Color
    if (season === 'Night') {
      targetColor = new THREE.Color(0x4a72a8) // Moonlit indigo
    } else if (season === 'Sun') {
      targetColor = new THREE.Color(0xf5a062) // Radiant terracotta
    } else {
      const chapter = Math.max(0, Math.min(3, currentChapter))
      targetColor = CHAPTER_LIGHT_COLORS[chapter]
    }

    materialsRef.current.forEach((mat) => {
      mat.color.lerp(targetColor, 0.04)
    })
  })

  return (
    <group ref={groupRef}>
      {rays.map((ray, i) => {
        return (
          <mesh
            key={i}
            position={[ray.pos[0], ray.pos[1], ray.pos[2]]}
            rotation={[ray.rot[0], ray.rot[1], ray.rot[2]]}
            scale={[ray.scale[0], ray.scale[1], ray.scale[2]]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              ref={(el) => {
                if (el) materialsRef.current[i] = el
              }}
              color={CHAPTER_LIGHT_COLORS[0]}
              transparent
              opacity={ray.opacity}
              side={THREE.DoubleSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// ---------------------------------------------------------------------------
// MistPlanes
// ---------------------------------------------------------------------------

function MistPlanes() {
  const groupRef = useRef<THREE.Group>(null)

  const mists = useMemo(() => {
    return [
      { pos: [0, 1.5, -8] as const, scale: [20, 4, 1] as const, opacity: 0.03 },
      { pos: [-5, 0.8, -4] as const, scale: [15, 3, 1] as const, opacity: 0.02 },
      { pos: [6, 2.0, -12] as const, scale: [25, 5, 1] as const, opacity: 0.04 },
      { pos: [-3, 1.0, 5] as const, scale: [18, 3.5, 1] as const, opacity: 0.025 },
      { pos: [2, 2.5, -16] as const, scale: [22, 6, 1] as const, opacity: 0.05 },
    ]
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        mesh.position.x += Math.sin(t * 0.03 + i * 1.7) * 0.002
        mesh.position.y += Math.cos(t * 0.02 + i * 2.3) * 0.001
      })
    }
  })

  return (
    <group ref={groupRef}>
      {mists.map((mist, i) => (
        <mesh
          key={i}
          position={[mist.pos[0], mist.pos[1], mist.pos[2]]}
          scale={[mist.scale[0], mist.scale[1], mist.scale[2]]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={0xf2efe9}
            transparent
            opacity={mist.opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

// ---------------------------------------------------------------------------
// CelestialNightSky – Twinkling Stars & Drifting Fireflies
// ---------------------------------------------------------------------------

function CelestialNightSky({ active }: { active: boolean }) {
  const starsRef = useRef<THREE.Points>(null)
  const firefliesRef = useRef<THREE.Points>(null)

  const { starPositions } = useMemo(() => {
    const count = 350
    const pos = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const r = 22 + Math.random() * 20
      const theta = Math.random() * Math.PI * 2
      const phi = 0.15 + Math.random() * (Math.PI / 2 - 0.2)

      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.cos(phi) + 4
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }

    return { starPositions: pos }
  }, [])

  const { fireflyPositions } = useMemo(() => {
    const count = 50
    const pos = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 24
      pos[i * 3 + 1] = 0.6 + Math.random() * 3.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24
    }

    return { fireflyPositions: pos }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (starsRef.current) {
      const mat = starsRef.current.material as THREE.PointsMaterial
      const targetOp = active ? 0.85 : 0.0
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOp, 0.06)
      starsRef.current.visible = mat.opacity > 0.02
    }

    if (firefliesRef.current && firefliesRef.current.geometry) {
      const mat = firefliesRef.current.material as THREE.PointsMaterial
      const targetOp = active ? 0.9 : 0.0
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOp, 0.06)
      firefliesRef.current.visible = mat.opacity > 0.02

      if (active) {
        const posAttr = firefliesRef.current.geometry.attributes.position as THREE.BufferAttribute
        const arr = posAttr.array as Float32Array

        for (let i = 0; i < arr.length; i += 3) {
          arr[i + 0] += Math.sin(t * 0.4 + i) * 0.005
          arr[i + 1] += Math.cos(t * 0.6 + i * 2) * 0.003
          arr[i + 2] += Math.sin(t * 0.3 + i * 3) * 0.005

          if (arr[i + 1] < 0.4) arr[i + 1] = 3.6
          if (arr[i + 1] > 4.2) arr[i + 1] = 0.5
        }
        posAttr.needsUpdate = true
      }
    }
  })

  return (
    <group>
      {/* Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#B8D5FF"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating Fireflies */}
      <points ref={firefliesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[fireflyPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.24}
          color="#E6B86A"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

// ---------------------------------------------------------------------------
// Dynamic Atmospheric Shifter (Background, Fog, Lighting)
// ---------------------------------------------------------------------------

function AtmosphereManager({ season }: { season: 'Dawn' | 'Sun' | 'Night' }) {
  const { scene } = useThree()
  const currentBg = useRef(new THREE.Color(0x0b0e0b))
  const currentFog = useRef(new THREE.Color(0x0b0e0b))

  const targets = useMemo(() => {
    switch (season) {
      case 'Night':
        return {
          bgColor: new THREE.Color(0x040714), // Deep Starlit Indigo
          fogColor: new THREE.Color(0x040714),
          fogDensity: 0.038,
        }
      case 'Sun':
        return {
          bgColor: new THREE.Color(0x22150e), // Warm Sunlit Terracotta Clay
          fogColor: new THREE.Color(0x22150e),
          fogDensity: 0.032,
        }
      case 'Dawn':
      default:
        return {
          bgColor: new THREE.Color(0x0b0e0b), // Misty Obsidian Forest
          fogColor: new THREE.Color(0x0b0e0b),
          fogDensity: 0.04,
        }
    }
  }, [season])

  useEffect(() => {
    if (!scene.fog) {
      scene.fog = new THREE.FogExp2(targets.fogColor.getHex(), targets.fogDensity)
    }
  }, [scene, targets])

  useFrame((_, delta) => {
    const rate = Math.min(1.0, delta * 3.5)

    // Lerp background color smoothly
    currentBg.current.lerp(targets.bgColor, rate)
    if (scene.background instanceof THREE.Color) {
      scene.background.copy(currentBg.current)
    } else {
      scene.background = currentBg.current.clone()
    }

    // Lerp fog color and density smoothly
    if (scene.fog && scene.fog instanceof THREE.FogExp2) {
      currentFog.current.lerp(targets.fogColor, rate)
      scene.fog.color.copy(currentFog.current)
      scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, targets.fogDensity, rate)
    }
  })

  return null
}

function DynamicLighting({ season }: { season: 'Dawn' | 'Sun' | 'Night' }) {
  const ambRef = useRef<THREE.AmbientLight>(null)
  const dirRef = useRef<THREE.DirectionalLight>(null)

  const lightTarget = useMemo(() => {
    switch (season) {
      case 'Night':
        return {
          ambColor: new THREE.Color(0x455a75),
          ambIntensity: 0.22,
          dirColor: new THREE.Color(0x7ba7db),
          dirIntensity: 0.35,
        }
      case 'Sun':
        return {
          ambColor: new THREE.Color(0xe6c9b8),
          ambIntensity: 0.38,
          dirColor: new THREE.Color(0xffaa77),
          dirIntensity: 0.85,
        }
      case 'Dawn':
      default:
        return {
          ambColor: new THREE.Color(0xf2efe9),
          ambIntensity: 0.2,
          dirColor: new THREE.Color(0xc87d55),
          dirIntensity: 0.5,
        }
    }
  }, [season])

  useFrame((_, delta) => {
    const rate = Math.min(1.0, delta * 3.5)
    if (ambRef.current) {
      ambRef.current.color.lerp(lightTarget.ambColor, rate)
      ambRef.current.intensity = THREE.MathUtils.lerp(ambRef.current.intensity, lightTarget.ambIntensity, rate)
    }
    if (dirRef.current) {
      dirRef.current.color.lerp(lightTarget.dirColor, rate)
      dirRef.current.intensity = THREE.MathUtils.lerp(dirRef.current.intensity, lightTarget.dirIntensity, rate)
    }
  })

  return (
    <>
      <ambientLight ref={ambRef} intensity={0.2} color={0xf2efe9} />
      <directionalLight
        ref={dirRef}
        intensity={0.5}
        color={0xc87d55}
        position={[5, 8, 3]}
        castShadow
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// Main LivingMeadowScene
// ---------------------------------------------------------------------------

interface LivingMeadowSceneProps {
  currentChapter: number
  season?: 'Dawn' | 'Sun' | 'Night'
  onWaterClick?: () => void
}

export default function LivingMeadowScene({
  currentChapter,
  season = 'Dawn',
  onWaterClick,
}: LivingMeadowSceneProps) {
  const [spawnQueue, setSpawnQueue] = useState<THREE.Vector3[]>([])

  const handleSpawnParticles = useCallback((origin: THREE.Vector3) => {
    setSpawnQueue((prev) => [...prev, origin])
  }, [])

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}
      camera={{ fov: 45, near: 0.1, far: 100 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
      onCreated={({ gl, scene }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        scene.background = new THREE.Color(0x0b0e0b)
      }}
    >
      <AtmosphereManager season={season} />
      <DynamicLighting season={season} />

      {/* Scene components */}
      <CameraRig currentChapter={currentChapter} />
      <Terrain />
      <GrassField />
      <WaterPlane onWaterClick={onWaterClick} onSpawnParticles={handleSpawnParticles} />
      <SporeParticles spawnQueue={spawnQueue} />
      <VolumetricLight currentChapter={currentChapter} season={season} />
      <MistPlanes />
      <CelestialNightSky active={season === 'Night'} />
    </Canvas>
  )
}
