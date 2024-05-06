'use client';

import { useMemo, useRef, useState, useEffect, ReactNode } from "react"
import { useMouse } from "react-use"
import { useSpring } from "framer-motion"

interface GroupProps {
  children: (tokens: string[]) => ReactNode;
  className?: string;
  body: string;
  as: React.ElementType;
}

function Group({ children, className, body, as: Component = "div", ...props }: GroupProps): JSX.Element {
  const tokens = useMemo(() => body.split(""), [body]);

  return (
    <Component className={className} {...props}>
      {children(tokens)}
    </Component>
  );
}

interface TokenProps {
  min?: number;
  max?: number;
  threshold?: number;
  body: string;
  className?: string;
  as: React.ElementType;
}

function Token({ min = 100, max = 900, threshold = 300, body, className, as: Component = "span", ...props }: TokenProps): JSX.Element {
  const container = useRef<HTMLSpanElement>(null);

  const { elX, elY, elW, elH } = useMouse(container);

  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), [elX]);

  const [previous, setPrevious] = useState(min);
  const [transitioning, setTransitioning] = useState(false);

  const fontWeight = useSpring(min, {
    duration: 100,
  });

  function animate(value: number) {
    setTransitioning(true);

    fontWeight.set(value);

    setTimeout(() => setTransitioning(false), 100);
  }

  useEffect(() => {
    let targetValue = min;

    if (!ready || !container.current || elY < 0 || elY > elH) {
      targetValue = min;
    } else {
      const lambda = Math.abs(elX - elW / 2);
      const value = (threshold - lambda) / threshold;
      targetValue = Math.round(Math.min(Math.max(value * max, min), max));
    }

    if (previous === min && targetValue > min) {
      animate(targetValue);
    } else if (previous > min && targetValue === min) {
      animate(targetValue);
    } else if (!transitioning) {
      fontWeight.jump(targetValue);
    }

    setPrevious(targetValue);
  }, [elX, elY, elW, elH, max, min, threshold, fontWeight, previous, transitioning]);

  return (
    <Component ref={container} className={className} style={{ fontWeight: fontWeight.get() }} {...props}>
      {body}
    </Component>
  );
}

export const MagneticText = Object.assign(Group, { Token });
