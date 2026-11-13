import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface BlueSanctuary3DProps {
  className?: string;
  onLoaded?: () => void;
}

export const BlueSanctuary3D: React.FC<BlueSanctuary3DProps> = ({ className = '', onLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // Detect low-power or mobile
    const isMobile = window.innerWidth < 768;
    const isLowConcurrency = (navigator.hardwareConcurrency || 4) <= 4;
    setIsLowPower(isMobile || isLowConcurrency);

    let animationFrameId: number;
    let isVisible = true;

    // Scene, Camera, Renderer
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x061d33, 0.045);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 1. SIGNATURE ORGANIC LIQUID GLASS SCULPTURE
    // Procedural Torus Knot with liquid glass transmission aesthetics
    const knotGeometry = new THREE.TorusKnotGeometry(1.4, 0.42, isMobile ? 96 : 144, isMobile ? 24 : 36, 2, 3);
    
    // Custom physical liquid material mimicking glass & deep water refraction
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1672b1,
      emissive: 0x062037,
      roughness: 0.12,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.333, // Water refractive index!
      thickness: 1.8,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0x8ed2e4),
      transparent: true,
      opacity: 0.92,
      wireframe: false,
    });

    const sculpture = new THREE.Mesh(knotGeometry, glassMaterial);
    sculpture.position.set(1.4, 0, 0); // Positioned slightly to the right for typography balance on desktop
    if (isMobile) {
      sculpture.position.set(0, -0.6, -1);
      sculpture.scale.set(0.75, 0.75, 0.75);
    }
    scene.add(sculpture);

    // Inner glowing core
    const coreGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x63b9d1,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    sculpture.add(core);

    // 2. BIOLUMINESCENT CEILING STARRY PARTICLES (Echoing Sabon Spa's Salt Hammam Starfield)
    const particleCount = isMobile ? 160 : 380;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      particleScales[i] = Math.random() * 0.08 + 0.02;
      particleSpeeds[i] = Math.random() * 0.004 + 0.002;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle texture generator
    const canvasP = document.createElement('canvas');
    canvasP.width = 32;
    canvasP.height = 32;
    const ctx = canvasP.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(99, 185, 209, 0.8)');
      gradient.addColorStop(0.7, 'rgba(22, 114, 177, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvasP);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 3. UNDERWATER CAUSTIC LIGHT PLANE (Background)
    const causticVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const causticFragmentShader = `
      uniform float uTime;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying vec2 vUv;

      // Fast procedural caustic wave simulation
      float wave(vec2 p) {
        p *= 3.0;
        float w = sin(p.x * 2.0 + uTime * 0.8) + cos(p.y * 2.5 - uTime * 0.6);
        w += sin(p.x * 3.5 - p.y * 2.0 + uTime * 1.1) * 0.5;
        return smoothstep(-0.8, 1.4, w);
      }

      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float c1 = wave(vUv + vec2(uTime * 0.03, uTime * 0.02));
        float c2 = wave(vUv * 1.4 - vec2(uTime * 0.04, -uTime * 0.03));
        float caustics = pow((c1 + c2) * 0.5, 2.5);

        vec3 bg = mix(uColorA, uColorB, vUv.y);
        vec3 finalColor = bg + vec3(0.38, 0.72, 0.82) * caustics * 0.45;
        
        // Edge vignette fade
        float dist = length(p);
        float alpha = clamp(1.0 - dist * 0.45, 0.0, 1.0);

        gl_FragColor = vec4(finalColor, alpha * 0.85);
      }
    `;

    const causticUniforms = {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(0x041525) }, // Deepest Navy
      uColorB: { value: new THREE.Color(0x082b49) }  // Ocean Navy
    };

    const causticPlaneGeometry = new THREE.PlaneGeometry(16, 12);
    const causticMaterial = new THREE.ShaderMaterial({
      vertexShader: causticVertexShader,
      fragmentShader: causticFragmentShader,
      uniforms: causticUniforms,
      transparent: true,
      depthWrite: false
    });

    const causticPlane = new THREE.Mesh(causticPlaneGeometry, causticMaterial);
    causticPlane.position.set(0, 0, -2.5);
    scene.add(causticPlane);

    // 4. CINEMATIC LIGHTING
    const ambientLight = new THREE.AmbientLight(0x0a3357, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x63b9d1, 2.8);
    mainLight.position.set(4, 5, 4);
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(0xc9a16b, 2.5, 12); // Warm brass/amber glow
    rimLight.position.set(-4, -2, 2);
    scene.add(rimLight);

    const deepLight = new THREE.PointLight(0x1672b1, 3.2, 10);
    deepLight.position.set(2, -3, 3);
    scene.add(deepLight);

    // Interaction & Mouse Following (Damped)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.4;
      targetY = y * 0.3;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetX = x * 0.3;
        targetY = y * 0.2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Intersection Observer to pause rendering when off-screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(container);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || document.hidden) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Damped mouse follow
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // Gentle organic sculpture rotation
      sculpture.rotation.x = Math.sin(elapsedTime * 0.25) * 0.25 + mouseY * 0.4;
      sculpture.rotation.y += delta * 0.22;
      sculpture.rotation.z = Math.cos(elapsedTime * 0.2) * 0.15 + mouseX * 0.4;

      // Subtle float motion
      sculpture.position.y = (isMobile ? -0.6 : 0) + Math.sin(elapsedTime * 0.8) * 0.12;

      // Update Caustic Shader
      causticUniforms.uTime.value = elapsedTime;

      // Update Floating Particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Slow gentle upward water drift
        positions[i * 3 + 1] += particleSpeeds[i];
        if (positions[i * 3 + 1] > 6) {
          positions[i * 3 + 1] = -6;
        }
        // Subtle drift horizontally
        positions[i * 3] += Math.sin(elapsedTime + i) * 0.002;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Soft Camera Parallax
      camera.position.x = mouseX * 0.8;
      camera.position.y = mouseY * 0.6;
      camera.lookAt(isMobile ? 0 : 0.8, isMobile ? -0.4 : 0, 0);

      renderer.render(scene, camera);
    };

    animate();
    if (onLoaded) onLoaded();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      knotGeometry.dispose();
      glassMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      causticPlaneGeometry.dispose();
      causticMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  if (!hasWebGL) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 ${className}`}>
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-aqua/20 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
