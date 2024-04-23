import React from "react";
import { PlaceholderType, placeholderProps } from "./placeholder-types";
import { useTheme } from "next-themes";
import { LordIcon } from "@/lib/lordicon/lord-icon";
import MintProjectDialog from "./mint-project-dialog";
import SubmitProjectDialog from "./submit-project-dialog";
import Spinner from "@/components/ui/spinner";
import CarbonRetirementToast from "../CarbonTrading/carbonRetirementToast";

interface PlaceholderComponentProps {
  type: PlaceholderType;
}

export const PlaceholderComponent: React.FC<PlaceholderComponentProps> = ({
  type,
}) => {
  const { theme } = useTheme();
  const { light, dark, title, description } = placeholderProps[type];
  const icon = theme === "dark" ? dark : light;

  const iconDataUri = `data:application/json;base64,${Buffer.from(
    JSON.stringify(icon)
  ).toString("base64")}`;

  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <LordIcon
          src={iconDataUri}
          trigger="loop-on-hover"
          colors={{ primary: "#303f9f" }}
          size={100}
        />
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>
        {type === PlaceholderType.Tokens && (
          <MintProjectDialog
            project={{}}
            projectName="Placeholder Project Name"
            projectIdIndex={0}
            groupId={0}
            totalSupply={1000}
            minted={0}
          />
        )}
        {type === PlaceholderType.Project && <SubmitProjectDialog />}
        {type === PlaceholderType.sendTx && <Spinner />}
      </div>
    </div>
  );
};

export * from "./placeholder-types";
