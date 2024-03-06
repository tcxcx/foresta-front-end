
"use client";

import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import SubmitProjectDialog from "@/components/dashboard/ProjectManagement/submit-project-dialog";
import wiredEnvironemnt from "@/lib/foresta-icons/wired-outline-945-dividends.json";

export function ProjectEmptyPlaceholder() {
  const playerRef = useRef<Player>(null);
  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
      <Player
          ref={playerRef}
          icon={wiredEnvironemnt}
          state="loop-cycle"
          onComplete={() => playerRef.current?.playFromBeginning()}
          size={100}
        />
        <h3 className="mt-4 text-lg font-semibold">Submit a New Project</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          Have a conservation project? Share the details with us to get started.
        </p>
        <SubmitProjectDialog />
      </div>
    </div>
  );
}
