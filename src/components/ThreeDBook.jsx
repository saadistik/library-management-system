import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function Book({ mousePosition }) {
  const bookRef = useRef()
  
  useFrame((state) => {
    if (bookRef.current) {
      // Smooth rotation animation
      bookRef.current.rotation.y += 0.005
      
      // React to mouse position
      const targetRotationX = (mousePosition.y - 0.5) * 0.3
      const targetRotationZ = (mousePosition.x - 0.5) * 0.2
      
      bookRef.current.rotation.x += (targetRotationX - bookRef.current.rotation.x) * 0.05
      bookRef.current.rotation.z += (targetRotationZ - bookRef.current.rotation.z) * 0.05
      
      // Floating animation
      bookRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })
  
  return (
    <group ref={bookRef}>
      {/* Book Cover */}
      <mesh castShadow>
        <boxGeometry args={[2, 3, 0.3]} />
        <meshStandardMaterial 
          color="#6b2f28" 
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      
      {/* Book Pages */}
      <mesh position={[0.05, 0, 0.15]} castShadow>
        <boxGeometry args={[1.9, 2.9, 0.25]} />
        <meshStandardMaterial 
          color="#f5eadb" 
          roughness={0.8}
        />
      </mesh>
      
      {/* Gold Decorative Elements */}
      <mesh position={[0, 0, 0.16]}>
        <boxGeometry args={[1.6, 0.1, 0.02]} />
        <meshStandardMaterial 
          color="#f19c13" 
          emissive="#f19c13"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      <mesh position={[0, 0.5, 0.16]}>
        <boxGeometry args={[1.6, 0.1, 0.02]} />
        <meshStandardMaterial 
          color="#f19c13" 
          emissive="#f19c13"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      <mesh position={[0, -0.5, 0.16]}>
        <boxGeometry args={[1.6, 0.1, 0.02]} />
        <meshStandardMaterial 
          color="#f19c13" 
          emissive="#f19c13"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Spine */}
      <mesh position={[-1.05, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.3, 3, 0.1]} />
        <meshStandardMaterial 
          color="#4a1f1a" 
          roughness={0.6}
        />
      </mesh>
    </group>
  )
}

function Scene({ mousePosition }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#f19c13" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#5a7f5c" />
      <spotLight
        position={[0, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        color="#fdf2ca"
      />
      
      <Book mousePosition={mousePosition} />
      
      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial 
            color="#f19c13" 
            emissive="#f19c13"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </>
  )
}

export default function ThreeDBook() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0.5, y: 0.5 })
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-[600px] relative"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        shadows
        style={{ background: 'transparent' }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
      
      {/* Glow effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-glow" />
      </div>
    </motion.div>
  )
}
