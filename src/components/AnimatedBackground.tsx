import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";
import { classNames } from "../util/lang";

const AnimatedBackground: QuartzComponent = ({
  displayClass,
}: QuartzComponentProps) => {
  return (
    <canvas
      id="animated-background-canvas"
      class={classNames(
        displayClass,
        "pointer-events-none fixed inset-0 -z-10",
      )}
      style={{ background: "#0c090d" }}
    />
  );
};

const script = `
document.addEventListener("nav", () => {
  const canvas = document.getElementById("animated-background-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let animationId;
  let particles = [];
  let gradientAngle = 0;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  };

  const initParticles = () => {
    particles = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 25000);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "rgba(255, 0, 64," : "rgba(0, 255, 255,",
      });
    }
  };

  const drawGradient = () => {
    gradientAngle += 0.002;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const baseGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      Math.max(canvas.width, canvas.height)
    );
    baseGradient.addColorStop(0, "rgba(12, 9, 13, 1)");
    baseGradient.addColorStop(1, "rgba(12, 9, 13, 1)");

    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const blob1X = centerX + Math.sin(gradientAngle) * 300;
    const blob1Y = centerY + Math.cos(gradientAngle * 0.7) * 200;
    const blob1Gradient = ctx.createRadialGradient(
      blob1X,
      blob1Y,
      0,
      blob1X,
      blob1Y,
      400
    );
    blob1Gradient.addColorStop(0, "rgba(255, 0, 64, 0.15)");
    blob1Gradient.addColorStop(0.5, "rgba(255, 0, 64, 0.05)");
    blob1Gradient.addColorStop(1, "rgba(255, 0, 64, 0)");

    ctx.fillStyle = blob1Gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const blob2X = centerX + Math.cos(gradientAngle * 0.8) * 350;
    const blob2Y = centerY + Math.sin(gradientAngle * 1.2) * 250;
    const blob2Gradient = ctx.createRadialGradient(
      blob2X,
      blob2Y,
      0,
      blob2X,
      blob2Y,
      350
    );
    blob2Gradient.addColorStop(0, "rgba(0, 255, 255, 0.12)");
    blob2Gradient.addColorStop(0.5, "rgba(0, 255, 255, 0.04)");
    blob2Gradient.addColorStop(1, "rgba(0, 255, 255, 0)");

    ctx.fillStyle = blob2Gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const blob3X = canvas.width * 0.8 + Math.sin(gradientAngle * 0.5) * 100;
    const blob3Y = canvas.height * 0.7 + Math.cos(gradientAngle * 0.6) * 150;
    const blob3Gradient = ctx.createRadialGradient(
      blob3X,
      blob3Y,
      0,
      blob3X,
      blob3Y,
      500
    );
    blob3Gradient.addColorStop(0, "rgba(204, 0, 51, 0.1)");
    blob3Gradient.addColorStop(0.6, "rgba(204, 0, 51, 0.03)");
    blob3Gradient.addColorStop(1, "rgba(204, 0, 51, 0)");

    ctx.fillStyle = blob3Gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawParticles = () => {
    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color + particle.opacity + ")";
      ctx.fill();
    });
  };

  const drawConnections = () => {
    const maxDistance = 120;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = "rgba(255, 255, 255, " + opacity + ")";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    drawGradient();
    drawParticles();
    drawConnections();
    animationId = requestAnimationFrame(animate);
  };

  resize();
  window.addEventListener("resize", resize);
  animate();

  document.addEventListener("pjax:unload", () => {
    window.removeEventListener("resize", resize);
    cancelAnimationFrame(animationId);
  }, { once: true });
});
`;

AnimatedBackground.afterDOMLoaded = script;
AnimatedBackground.css = `
#animated-background-canvas {
  position: fixed !important;
  inset: 0 !important;
  z-index: -10 !important;
  pointer-events: none !important;
}
`;

export default (() => AnimatedBackground) satisfies QuartzComponentConstructor;
