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
import wiredInvestmentAnimation from "@/lib/foresta-icons/wired-outline-947-investment.json";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export function TokensEmptyPlaceholder() {
  const playerRef = useRef<Player>(null);
  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <Player ref={playerRef} icon={wiredInvestmentAnimation} onComplete={() => playerRef.current?.playFromBeginning()} size={100}/>
        <h3 className="mt-4 text-lg font-semibold">Mint New Tokens</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          Ready to convert your project contributions into tokens? Start here.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="relative">
              Mint Tokens
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mint Tokens</DialogTitle>
              <DialogDescription>
                Enter the amount of carbon credits to mint as tokens.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="credits">Carbon Credits</Label>
                <Input id="url" placeholder="https://example.com/feed.xml" />
              </div>
            </div>
            <DialogFooter>
              <Button>Mint Tokens</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
