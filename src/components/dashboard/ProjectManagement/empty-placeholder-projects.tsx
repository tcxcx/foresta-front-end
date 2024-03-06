"use client";

import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import SubmitProjectDialog from "@/components/dashboard/ProjectManagement/submit-project-dialog";
import wiredEnvironemntLight from "@/lib/foresta-icons/wired-outline-945-dividends.json";
import wiredEnvironemntDark from "@/lib/foresta-dark/wired-gradient-437-environment-eco-care.json";
import { LordIcon } from "@/lib/lordicon/lord-icon";

import { useTheme } from "next-themes";

export function ProjectEmptyPlaceholder() {
  const { theme } = useTheme();
  const wiredEnvironemnt = theme === "dark" ? wiredEnvironemntDark : wiredEnvironemntLight;

    const ecoIconDataUri = `data:application/json;base64,${Buffer.from(JSON.stringify(wiredEnvironemnt)).toString("base64")}`;

  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <LordIcon
          src={ecoIconDataUri}
          trigger="loop-on-hover"
          colors={{ primary: "#303f9f" }}
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

// primary: 66ee78
// secondary: c69cf4