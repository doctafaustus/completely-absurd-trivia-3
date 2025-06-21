import React, { useEffect, useRef } from 'react';

const ParticleCanvas = ({
  particleCount = 160,
  speed = 0.13,
  colors = [
    'rgba(0,212,255,0.6)',
    'rgba(139,92,246,0.5)',
    'rgba(0,212,255,0.4)',
    'rgba(139,92,246,0.4)',
  ],
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = particlesRef.current;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = (count) => {
      particles.length = 0; // Clear existing particles

      for (let i = 0; i < count; i++) {
        // Create mix of small and larger particles
        const isLargeParticle = Math.random() < 0.3; // 30% chance for larger particles
        const radius = isLargeParticle
          ? Math.random() * 1.2 + 1.8 // Large: 1.8 to 3px
          : Math.random() * 0.8 + 0.8; // Small: 0.8 to 1.6px

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: radius,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.3 + 0.5, // 0.5 to 0.8
          pulseSpeed: Math.random() * 0.01 + 0.005,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.016; // ~60fps timing

      for (let p of particles) {
        // Add subtle pulsing
        const pulse =
          Math.sin(timeRef.current * p.pulseSpeed + p.pulseOffset) * 0.2 + 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);

        // Extract rgba values and apply pulse to opacity
        const baseOpacity = p.opacity * pulse;
        const colorWithOpacity = p.color.replace(
          /[\d\.]+\)$/g,
          baseOpacity + ')'
        );
        ctx.fillStyle = colorWithOpacity;
        ctx.fill();

        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;

        // Seamless wrapping - no gaps!
        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
        if (p.y > canvas.height + p.radius) p.y = -p.radius;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    createParticles(particleCount);
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      createParticles(particleCount);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleCanvas;
