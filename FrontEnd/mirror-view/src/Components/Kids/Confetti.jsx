import { useRef, useEffect } from "react";
const Confetti = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let particles = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 10 - 5,
        vy: Math.random() * 10 - 5,
        size: Math.random() + 1,
        color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)})`,
      });
    }

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.fill();
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x + particle.size > canvas.width) {
          particle.vx = -particle.vx;
        }
        if (particle.x - particle.size < 0) {
          particle.vx = -particle.vx;
        }
        if (particle.y + particle.size > canvas.height) {
          particle.vy = -particle.vy;
        }
        if (particle.y - particle.size < 0) {
          particle.vy = -particle.vy;
        }
      }
      requestAnimationFrame(render);
    };

    render();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width="1000"
      height="1000"
      style={{ background: "transparent" }}
    />
  );
};

export default Confetti;
