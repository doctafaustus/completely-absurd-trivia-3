export function triggerConfetti(targetElement = document.body) {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const particleCount = 240;
  const colors = [
    '#ff6b9d',
    '#00d4ff',
    '#00ff88',
    '#ff6b35',
    '#8b5cf6',
    '#ffd700',
    '#ff1493',
    '#00ffff',
    '#ff4500',
    '#32cd32',
  ];
  const sillyShapes = [
    '🌭',
    '🦆',
    '🐸',
    '🦄',
    '🧻',
    '🧦',
    '🎈',
    '🎭',
    '🎪',
    '🦀',
    '🐙',
    '🦒',
    '🦙',
    '🐧',
    '🦔',
    '🐢',
    '🦩',
    '🐥',
    '🚂',
    '🛸',
    '👾',
    '🤖',
    '👽',
    '🦖',
    '🐲',
    '🧙‍♂️',
    '🧚‍♀️',
    '🧞‍♂️',
    '🧛‍♂️',
    '🧟‍♂️',
    '🤡',
    '👻',
    '💩',
    '🦇',
    '🕷️',
    '🐍',
    '🦅',
    '🦜',
    '🐠',
    '🐡',
    '🦈',
    '🐋',
    '🦭',
    '🐺',
    '🦊',
    '🐨',
    '🐼',
    '🦘',
    '🐪',
    '🦏',
    '🐘',
    '🦓',
    '🦌',
    '🐎',
    '🐄',
    '🐷',
    '🐑',
    '🐐',
    '🦃',
    '🐓',
    '🐁',
    '🐿️',
    '🦫',
    '🦨',
    '🦡',
  ];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';

    const isFromLeft = Math.random() < 0.5;
    const startX = isFromLeft ? 50 : window.innerWidth - 50;
    const startY = window.innerHeight - 50;

    const velocityX = isFromLeft
      ? Math.random() * 800 + 400
      : -(Math.random() * 800 + 400);
    const velocityY = -(Math.random() * 800 + 600);
    const gravity = Math.random() * 200 + 300;
    const rotation = Math.random() * 720 - 360;
    const duration = Math.random() * 2000 + 4000;
    const delay = Math.random() * 300;

    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    particle.style.color = colors[Math.floor(Math.random() * colors.length)];
    particle.textContent =
      sillyShapes[Math.floor(Math.random() * sillyShapes.length)];
    particle.style.animationDelay = delay + 'ms';

    particle.animate(
      [
        { transform: `translateX(0) translateY(0) rotate(0deg)`, opacity: 1 },
        {
          transform: `translateX(${velocityX * 0.75}px) translateY(${
            (velocityY + gravity) * 0.6
          }px) rotate(${rotation * 0.75}deg)`,
          opacity: 1,
          offset: 0.7,
        },
        {
          transform: `translateX(${velocityX}px) translateY(${
            velocityY + gravity
          }px) rotate(${rotation}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration - 2900,
        delay: delay,
        easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
        fill: 'forwards',
      }
    );

    container.appendChild(particle);
    setTimeout(() => {
      if (particle.parentNode) particle.remove();
    }, duration - 2000 + delay);
  }

  // Clean up container after animation
  setTimeout(() => {
    if (container.parentNode) container.remove();
  }, 5000);
}
