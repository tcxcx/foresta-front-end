"use client";

import { useState } from "react";
import { Wallet } from "@/components/Web3/index";
import ApillonLogin from "@/components/Web3/ApillonLogin";
import { GridPattern } from "@/components/ui/GridPattern";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AuthenticationPage() {
  const [selectedOption, setSelectedOption] = useState<
    "substrate" | "apillon" | null
  >(null);

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
        <ApillonLogin onGoBack={handleGoBack} />
      ) : (
        <div className="w-full bg-zinc-900/10">
          <div className="border-stone-800/40 overflow-hidden relative bg-gradient-to-r from-green-300/20 via-cyan-200/20 to-indigo-600/20 dark:bg-gradient-to-r dark:from-stone-800/5 dark:via-stone-800/5 dark:to-stone-800/20 hover:border-primary/40 dark:hover:border-stone-800/90 border p-4 rounded-xl w-full min-h-[384px] sm:h-full flex flex-col flex-1 transition-colors duration-300 ease-in-out delay-50  items-center justify-center ">
            <GridPattern
              size={75}
              offsetX={0}
              offsetY={0}
              className="absolute -top-1/2 right-1 h-[200%] w-2/3 skew-y-12 stroke-white/10 stroke-[2] [mask-image:linear-gradient(-85deg,black,transparent)]"
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
            <div className="grid grid-cols-1 gap-4 z-10">
              <div className="text-center space-y-2">
                <p className="text-black dark:text-white text-lg font-clash uppercase">
                  Select Sign In Option
                </p>
                <p className="text-gray-900 dark:text-gray-500">
                  Select an account to sign in with.
                </p>
              </div>
              <Button
                onClick={() => handleOptionClick("substrate")}
                variant="default"
              >
                Login with Substrate
              </Button>
              <div className="flex items-center justify-center z-10">
                <Separator className="w-20" />
                <span className="px-2 text-sm">or</span>
                <Separator className="w-20" />
              </div>
              <Button
                onClick={() => handleOptionClick("apillon")}
                variant="secondary"
              >
                Login with Kilt DID
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
