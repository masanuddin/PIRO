import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Particles
        init={particlesInit}
        options={{
          background: {
            color: "#ffffff",
          },
          particles: {
            number: {
              value: 70,
              density: { enable: true, area: 900 },
            },
            color: {
              value: "#0f172a",
            },
            links: {
              enable: true,
              color: "#334155",
              distance: 150,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.8,
            },
            size: {
              value: { min: 1, max: 2 },
            },
            opacity: {
              value: 0.6,
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
            },
            modes: {
              grab: {
                distance: 180,
                links: {
                  opacity: 0.5,
                },
              },
            },
          },
        }}
      />
    </div>
  );
}