"use client";

import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import SubmitProjectDialog from "@/components/dashboard/ProjectManagement/submit-project-dialog";
import CraneLight from "@/lib/foresta-icons/wired-outline-1128-crane-bird.json";
import CraneDark from "@/lib/foresta-dark/wired-gradient-1128-crane-bird.json";
import { LordIcon } from "@/lib/lordicon/lord-icon";

import { useTheme } from "next-themes";

export function CollectivesEmptyPlaceholder() {
  const { theme } = useTheme();
  const Crane = theme === "dark" ? CraneDark : CraneLight;

  const craneDataUri = `data:application/json;base64,${Buffer.from(
    JSON.stringify(Crane)
  ).toString("base64")}`;

  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <LordIcon
          src={craneDataUri}
          trigger="loop-on-hover"
          colors={{ primary: "#303f9f" }}
          size={100}
        />
        <h3 className="mt-4 text-lg font-semibold">No Collectives Found</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You are currently not a part of any given collective. See upcoming
          collectives to see if you have been whitelisted to join a Conservation
          DAO.
        </p>
      </div>
    </div>
  );
}

