import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface BlueSanctuary3DProps {
  className?: string;
  onLoaded?: () => void;
  isFocusMode?: boolean;
  onTriggerRipple?: (fn: () => void) => void;
}

export const BlueSanctuary3D: React.FC<BlueSanctuary3DProps> = ({
  className = '',
  onLoaded,
  isFocusMode = false,
  onTriggerRipple
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const isFocusModeRef = useRef(isFocusMode);

  useEffect(() => {
    isFocusModeRef.current = isFocusMode;
  }, [isFocusMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const isMobile = window.innerWidth < 768;
    let animationFrameId: number;
    let isVisible = true;

    // Scene, Camera, Renderer
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x061d33, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2.0));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 1. SIGNATURE ORGANIC LIQUID GLASS SCULPTURE
    const knotGeometry = new THREE.TorusKnotGeometry(1.4, 0.42, isMobile ? 100 : 160, isMobile ? 28 : 40, 2, 3);

    // Vibrant crystal liquid water physical material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1672b1,
      emissive: 0x083358,
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transmission: 0.75,
      ior: 1.333,
      thickness: 1.6,
      specularIntensity: 1.2,
      specularColor: new THREE.Color(0xaae7f7),
      transparent: true,
      opacity: 0.94,
    });

    const sculpture = new THREE.Mesh(knotGeometry, glassMaterial);
    const initialX = isMobile ? 0 : 1.4;
    const initialY = isMobile ? -0.5 : 0;
    sculpture.position.set(initialX, initialY, 0);
    scene.add(sculpture);

    // Inner glowing core
    const coreGeometry = new THREE.SphereGeometry(0.72, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x63b9d1,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    sculpture.add(core);

    // 2. BIOLUMINESCENT CEILING STARRY PARTICLES (Salt Hammam Starfield)
    const particleCount = isMobile ? 180 : 360;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      particleSpeeds[i] = Math.random() * 0.005 + 0.002;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle texture
    const canvasP = document.createElement('canvas');
    canvasP.width = 32;
    canvasP.height = 32;
    const ctx = canvasP.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(99, 185, 209, 0.9)');
      gradient.addColorStop(0.7, 'rgba(22, 114, 177, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvasP);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.38,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 3. CAUSTIC LIGHT PLANE
    const causticVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const causticFragmentShader = `
      uniform float uTime;
      uniform float uRipple;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying vec2 vUv;

      float wave(vec2 p, float t) {
        p *= 3.0;
        float w = sin(p.x * 2.0 + t * 0.8) + cos(p.y * 2.5 - t * 0.6);
        w += sin(p.x * 3.5 - p.y * 2.0 + t * 1.1) * 0.5;
        return smoothstep(-0.8, 1.4, w);
      }

      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float dist = length(p);
        float rippleEffect = sin(dist * 18.0 - uTime * 4.0) * exp(-dist * 2.0) * uRipple;

        float c1 = wave(vUv + vec2(uTime * 0.03, uTime * 0.02) + rippleEffect * 0.1, uTime);
        float c2 = wave(vUv * 1.4 - vec2(uTime * 0.04, -uTime * 0.03), uTime);
        float caustics = pow((c1 + c2) * 0.5, 2.5) + uRipple * 0.35;

        vec3 bg = mix(uColorA, uColorB, vUv.y);
        vec3 finalColor = bg + vec3(0.38, 0.72, 0.82) * caustics * 0.55;

        float alpha = clamp(1.0 - dist * 0.42, 0.0, 1.0);
        gl_FragColor = vec4(finalColor, alpha * 0.9);
      }
    `;

    const causticUniforms = {
      uTime: { value: 0 },
      uRipple: { value: 0 },
      uColorA: { value: new THREE.Color(0x041525) },
      uColorB: { value: new THREE.Color(0x082b49) }
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

    // 4. LIGHTING
    const ambientLight = new THREE.AmbientLight(0x0e3f6c, 1.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x7ed6ec, 3.2);
    mainLight.position.set(4, 5, 4);
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(0xd4af37, 2.8, 14);
    rimLight.position.set(-4, -2, 2.5);
    scene.add(rimLight);

    const deepLight = new THREE.PointLight(0x1672b1, 3.8, 12);
    deepLight.position.set(2, -3, 3);
    scene.add(deepLight);

    // 5. INTERACTIVE DRAG & ORBIT CONTROLS
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const triggerRipple = () => {
      causticUniforms.uRipple.value = 1.0;
      coreMaterial.opacity = 0.8;
      setTimeout(() => {
        coreMaterial.opacity = 0.35;
      }, 400);
    };

    if (onTriggerRipple) {
      onTriggerRipple(triggerRipple);
    }

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
      velocityX = 0;
      velocityY = 0;
      triggerRipple();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.4;
      targetY = y * 0.3;

      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;

        velocityX = deltaX * 0.007;
        velocityY = deltaY * 0.007;

        sculpture.rotation.y += velocityX;
        sculpture.rotation.x += velocityY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(container);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
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

      // Ripple decay
      if (causticUniforms.uRipple.value > 0.005) {
        causticUniforms.uRipple.value *= 0.94;
      } else {
        causticUniforms.uRipple.value = 0;
      }

      // Smooth focus mode transition (center sculpture when focus mode is active)
      const isFocus = isFocusModeRef.current;
      const targetPosX = isFocus ? 0 : (isMobile ? 0 : 1.4);
      const targetPosY = isFocus ? 0 : (isMobile ? -0.5 : 0);
      const targetScale = isFocus ? (isMobile ? 1.05 : 1.35) : (isMobile ? 0.75 : 1.0);

      sculpture.position.x += (targetPosX - sculpture.position.x) * 0.06;
      sculpture.position.y += (targetPosY - sculpture.position.y) * 0.06;
      sculpture.scale.x += (targetScale - sculpture.scale.x) * 0.06;
      sculpture.scale.y += (targetScale - sculpture.scale.y) * 0.06;
      sculpture.scale.z += (targetScale - sculpture.scale.z) * 0.06;

      // Inertia & Damped Rotation
      if (isDragging) {
        // Dragging is actively controlling rotation
      } else {
        // Apply remaining velocity
        sculpture.rotation.y += velocityX;
        sculpture.rotation.x += velocityY;
        velocityX *= 0.93;
        velocityY *= 0.93;

        // Idle organic continuous floating rotation
        sculpture.rotation.y += delta * 0.24;
        sculpture.rotation.z = Math.cos(elapsedTime * 0.3) * 0.12;
      }

      // Float bobbing motion
      sculpture.position.y += Math.sin(elapsedTime * 0.9) * 0.002;

      // Update Caustic Shader
      causticUniforms.uTime.value = elapsedTime;

      // Update Floating Particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        if (positions[i * 3 + 1] > 6) {
          positions[i * 3 + 1] = -6;
        }
        positions[i * 3] += Math.sin(elapsedTime + i) * 0.0015;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Mouse Parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX * 0.6;
      camera.position.y = mouseY * 0.4;
      camera.lookAt(isFocus ? 0 : (isMobile ? 0 : 0.7), isFocus ? 0 : (isMobile ? -0.3 : 0), 0);

      renderer.render(scene, camera);
    };

    animate();
    if (onLoaded) onLoaded();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
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
  }, [onLoaded, onTriggerRipple]);

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
      className={`absolute inset-0 cursor-grab active:cursor-grabbing overflow-hidden touch-none ${className}`}
      aria-label="Expérience 3D Le Sanctuaire Bleu"
    />
  );
};
