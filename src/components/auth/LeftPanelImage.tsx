"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/context/account";
import PassHolder from "../r3f/BandCardAnimationJs";
import { SparklesCore } from "@/components/ui/sparkles";
import { gsap } from "gsap";

const LeftPanelImage = () => {
  const { account } = useAuth();
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (account && imageRef.current && containerRef.current) {
      gsap.to(imageRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(imageRef.current, { display: "none" });
          gsap.set(containerRef.current, { display: "block" });
          gsap.from(containerRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          });
        },
      });
    }
  }, [account]);

  return (
    <div className="hidden lg:block relative w-full lg:w-1/2">
      <div ref={containerRef} className="absolute inset-0 hidden">
        <PassHolder />
        <div className="absolute -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#7876c566] after:bg-zinc-900">
          <SparklesCore
            particleDensity={900}
            className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          />
        </div>
      </div>
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          layout="fill"
          objectFit="cover"
          alt="Authentication"
          priority={true}
          className="block dark:hidden"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-green-300/80 via-transparent to-purple-600/40 dark:from-green-300/30 dark:via-blue-500/20 dark:to-purple-600/20"></div>
        <Image
          src="https://images.unsplash.com/photo-1518889735218-3e3a03fd3128?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          layout="fill"
          objectFit="cover"
          priority={true}
          alt="Authentication"
          className="hidden dark:block"
        />
        <div className="absolute inset-0 bg-black/50 z-10 flex flex-col p-10">
          <div className="flex items-center mb-4">
            <Image
              src="/images/logo-icon.png"
              alt="Foresta Logo"
              width={50}
              height={50}
              objectFit="contain"
            />
            <h1 className="z-20 text-4xl text-white font-bold uppercase font-clash">
              Foresta
            </h1>
          </div>
          <blockquote className="mt-auto text-white">
            <p className="text-2xl">
              &quot;This is the assembly of life that took a billion years to
              evolve. It holds the world steady.&quot;
            </p>
            <footer className="text-base">- Edward O. Wilson</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default LeftPanelImage;