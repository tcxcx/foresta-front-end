"use client";

import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import wiredInvestmentAnimationLight from "@/lib/foresta-icons/wired-outline-947-investment.json";
import wiredInvestmentAnimationDark from "@/lib/foresta-dark/wired-gradient-947-investment.json";
import { LordIcon } from "@/lib/lordicon/lord-icon";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MintProjectDialog from "./mint-project-dialog";

export function TokensEmptyPlaceholder() {
  const { theme } = useTheme();
  const wiredEnvironemnt = theme === "dark" ? wiredInvestmentAnimationDark : wiredInvestmentAnimationLight;

    const ecoIconDataUri = `data:application/json;base64,${Buffer.from(JSON.stringify(wiredEnvironemnt)).toString("base64")}`;


  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
      <LordIcon
          src={ecoIconDataUri}
          trigger="loop-on-hover"
          colors={{ primary: "#303f9f" }}
          size={100}
        />        <h3 className="mt-4 text-lg font-semibold">Mint New Tokens</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          Ready to convert your project contributions into tokens? Start here.
        </p>
          <MintProjectDialog/>
          
      </div>
    </div>
  );
}
