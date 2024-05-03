'use client';

import { useState } from "react";
import { Wallet } from "@/components/Web3/index";
import ApillonLogin from "@/components/Web3/ApillonLogin";
import { GridPattern } from "@/components/ui/GridPattern";
import { Button } from "@/components/ui/button";

export default function AuthenticationPage() {
  const [selectedOption, setSelectedOption] = useState<"substrate" | "apillon" | null>(null);

  const gridBlocks = [
    [2, 5],
    [3, 1],
    [4, 3],
  ];

  const handleOptionClick = (option: "substrate" | "apillon") => {
    setSelectedOption(option);
  };

  const handleGoBack = () => {
    setSelectedOption(null);
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      {selectedOption === "substrate" ? (
        <Wallet onGoBack={handleGoBack} />
      ) : selectedOption === "apillon" ? (
        <ApillonLogin  onGoBack={handleGoBack}/>
      ) : (
        <div className="w-full bg-zinc-900/10">
          <div className="border-stone-800/40 overflow-hidden relative bg-gradient-to-r from-green-300/20 via-cyan-200/20 to-indigo-600/20 dark:bg-gradient-to-r dark:from-stone-800/5 dark:via-stone-800/5 dark:to-stone-800/20 hover:border-primary/40 dark:hover:border-stone-800/90 border p-4 rounded-xl w-full min-h-[384px] sm:h-full flex flex-col flex-1 transition-colors duration-300 ease-in-out delay-50">
            <GridPattern
              size={75}
              offsetX={0}
              offsetY={0}
              className="absolute -top-1/2 right-0 h-[200%] w-1/3 skew-y-12 stroke-white/10 stroke-[2] [mask-image:linear-gradient(-85deg,black,transparent)]"
            >
              {gridBlocks.map(([row, column], index) => (
                <GridPattern.Block
                  key={index}
                  row={row}
                  column={column}
                  className="fill-white/2.5 transition duration-500 hover:fill-primary"
                />
              ))}
            </GridPattern>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 z-10">
              <Button onClick={() => handleOptionClick("substrate")} variant="secondary">
                Login with Substrate
              </Button>
              <Button onClick={() => handleOptionClick("apillon")} variant="secondary">
                Login with Email DID
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}