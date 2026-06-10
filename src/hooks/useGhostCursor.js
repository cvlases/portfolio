import { useEffect } from 'react';

const PARTICLE_LIFE = 30;
const GHOST_CURSOR_SRC = '/assets/cursors/mouse.png';

function isFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
}

export function useGhostCursor() {
  useEffect(() => {
    if (!isFinePointer()) {
      return undefined;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
    const particles = [];
    let animationFrame = 0;

    image.src = GHOST_CURSOR_SRC;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    canvas.className = 'ghost-cursor-layer';
    document.body.appendChild(canvas);
    setCanvasSize();

    const addParticle = (x, y) => {
      particles.push({
        x,
        y,
        life: PARTICLE_LIFE,
      });
    };

    const handlePointerMove = (event) => {
      addParticle(event.clientX, event.clientY);
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.life -= 1;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }

        context.globalAlpha = particle.life / PARTICLE_LIFE;
        if (image.complete) {
          context.drawImage(image, particle.x, particle.y);
        }
      }

      context.globalAlpha = 1;
      animationFrame = window.requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('resize', setCanvasSize);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', setCanvasSize);
      canvas.remove();
    };
  }, []);
}
