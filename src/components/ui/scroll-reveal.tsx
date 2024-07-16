/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, useMemo } from "react";
import { useWindowSize, useWindowScroll, useIntersection } from "react-use";

interface ScrollRevealProps {
    children: (isActive: boolean) => React.ReactNode;
    className?: string;
    once?: boolean;
    trigger?: 'visible' | 'top' | 'middle';
    offset?: number;
    as?: React.ElementType<any>;
}

export function ScrollReveal({
    children,
    className,
    once = false,
    trigger = "visible",
    offset = 0,
    as: Component = "div",
}: ScrollRevealProps) {

    const container = useRef<HTMLDivElement>(null);

  const { y: windowScroll } = useWindowScroll();
  const { height: windowHeight } = useWindowSize();
  
  const intersection = useIntersection(container, {
      threshold: 0,
  });
  
  const isIntersecting = useMemo(() => {
      if (container.current && intersection) {
          const y = container.current.getBoundingClientRect().top;
          const height = container.current.getBoundingClientRect().height;
  
          if (trigger === "top") {
              return intersection.isIntersecting && y <= 0;
          } else if (trigger === "middle") {
              return y > windowHeight / 2 - height && y <= windowHeight / 2;
          }
  
          return intersection.isIntersecting && y <= windowHeight - offset;
      }
  
      return false;
  }, [windowHeight, intersection, trigger, offset, windowScroll]);
  
  const [isActive, setActive] = useState(false);
  
  useEffect(() => {
      if (once && isIntersecting) {
          setActive(true);
      } else if (!once) {
          setActive(isIntersecting);
      }
  }, [isIntersecting, once]);
  
  const extraProps = {
      className,
      ref: container
  };
  
  return (
      <Component {...extraProps}>
          {children(isActive)}
      </Component>
  );
  
}
