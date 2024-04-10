'use client';

import React from "react";
import { useAuth } from "@/hooks/context/account";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ButtonOffsetProps {
  onClick: () => void;
  buttonText: string;
}

const ButtonOffset: React.FC<ButtonOffsetProps> = ({ onClick, buttonText }) => {
  const { account } = useAuth();

  // Determine if the button is disabled based on the account's presence
  const isDisabled = !account;

  return (
    <TooltipProvider>
      <div className="inline-block">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onClick}
              disabled={isDisabled}
              className={`shadow-[inset_0_0_0_2px_#616467] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent transition duration-200 ${
                account
                  ? "hover:bg-[#616467] hover:text-white dark:text-neutral-200"
                  : "opacity-50 cursor-not-allowed dark:text-neutral-200"
              }`}
            >
              {buttonText}
            </button>
          </TooltipTrigger>
          {isDisabled && (
            <TooltipContent side="top" className="font-violet">
              Please login to your account first
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default ButtonOffset;
