"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useSpring, animated } from "@react-spring/web";

const GlobeComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef<number>(0);
  const [{ phi }, api] = useSpring(() => ({
    phi: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let phiOffset = 0;
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 10,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.13, 0.55, 0.13],
      glowColor: [0.7, 0.7, 0.7],
      markers: [{ location: [-0.983, -77.817], size: 0.07 }],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiOffset += 0.005;
        }
        state.phi = phiOffset + phi.get();
      },
    });

    return () => globe.destroy();
  }, [phi]);

  return (
    <>
          <animated.canvas
            ref={canvasRef}
            onPointerDown={(e) => {
              pointerInteracting.current = e.clientX;
              document.body.style.cursor = "grabbing";
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              document.body.style.cursor = "default";
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              document.body.style.cursor = "default";
            }}
            onPointerMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                api.start({ phi: delta / 200 });
              }
            }}
            style={{
              width: 600,
              height: 600,
              maxWidth: "100%",
              aspectRatio: "1",
              cursor: "grab",
            }}
          />
    </>
  );
};

export default GlobeComponent;
