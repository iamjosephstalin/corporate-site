import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const ZenShape = () => {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh scale={1.5}>
                <icosahedronGeometry args={[1, 0]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.1}
                    transmission={0.6} // Increased for better transparency
                    thickness={1.5} // Increased thickness
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    ior={1.5}
                />
            </mesh>
        </Float>
    );
};

const Experience = () => {
    const crystalRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!crystalRef.current) return;

        // Calculate scroll progress (0 to 1)
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

        // Waypoints & Scale
        // 0.0 (Hero): Center Right, Big
        // 0.25 (About): Far Left, Small (avoid text)
        // 0.5 (Services): Top Right, Massive
        // 0.75 (Process): Center, Medium
        // 1.0 (Footer): Bottom Center, Giant

        // Constant Scale
        let targetScale = 1.0;
        let targetPos = new THREE.Vector3(2, 0, 0);
        let targetRot = new THREE.Euler(0, 0, 0);

        if (progress < 0.25) {
            // Hero -> About
            const t = progress / 0.25;
            targetPos.lerpVectors(new THREE.Vector3(3, 0, 0), new THREE.Vector3(-4, -2, 2), t);
            targetRot.set(0, t * Math.PI * 2, t * 0.5);
        } else if (progress < 0.5) {
            // About -> Services
            const t = (progress - 0.25) / 0.25;
            targetPos.lerpVectors(new THREE.Vector3(-4, -2, 2), new THREE.Vector3(3.5, 2, -1), t);
            targetRot.set(t * Math.PI, Math.PI * 2 + t * Math.PI, 0.5 + t);
        } else if (progress < 0.75) {
            // Services -> Process
            const t = (progress - 0.5) / 0.25;
            targetPos.lerpVectors(new THREE.Vector3(3.5, 2, -1), new THREE.Vector3(0, 0, 3.5), t);
            targetRot.set(Math.PI + t, Math.PI * 3 + t * Math.PI * 2, 1.5 - t);
        } else {
            // Process -> Footer
            const t = (progress - 0.75) / 0.25;
            targetPos.lerpVectors(new THREE.Vector3(0, 0, 3.5), new THREE.Vector3(0, -1, 1), t);
            targetRot.set(Math.PI * 2 + t, Math.PI * 5 + t * Math.PI, 0.5);
        }

        // Smoothly interpolate current position/rotation/scale to target
        crystalRef.current.position.lerp(targetPos, 0.08);
        crystalRef.current.scale.setScalar(THREE.MathUtils.lerp(crystalRef.current.scale.x, targetScale, 0.08));

        // Manual rotation interpolation
        crystalRef.current.rotation.x = THREE.MathUtils.lerp(crystalRef.current.rotation.x, targetRot.x, 0.08);
        crystalRef.current.rotation.y = THREE.MathUtils.lerp(crystalRef.current.rotation.y, targetRot.y, 0.08);
        crystalRef.current.rotation.z = THREE.MathUtils.lerp(crystalRef.current.rotation.z, targetRot.z, 0.08);

        // Constant spin
        crystalRef.current.rotation.y += 0.005;
    });

    return (
        <group ref={crystalRef}>
            <ZenShape />
        </group>
    );
};

export default Experience;
