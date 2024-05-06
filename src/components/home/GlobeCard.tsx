import React from 'react';
import GlobeComponent  from "@/components/ui/globe-component";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const GlobeCard: React.FC = () => {
  return (
    <div className="flex h-screen w-screen items-center px-8">
      <div className="group relative mx-auto flex h-80 w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/5 bg-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(40%_128px_at_50%_0%,theme(backgroundColor.white/5%),transparent)]"></div>

        <div>
          <GlobeComponent />
        </div>

        <div className="pointer-events-none mt-auto px-6 pb-6">
          <div className="relative transition duration-300 group-hover:-translate-y-9">
            <div className="text-lg text-white transition-all duration-300 group-hover:text-base">
              Forest Communities Conservation Efforts
            </div>

            <p className="mt-2 text-sm font-light leading-relaxed text-white/75">
              A pioneering platform for carbon credit issuance, trading, and
              management, powered by blockchain technology and cutting-edge
              climate science.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobeCard;
