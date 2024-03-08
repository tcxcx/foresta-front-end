import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Collective } from "@/lib/data/projects";
import { SDG } from "@/lib/data/SDGs";

interface CollectivesArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  collective: Collective;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function CollectivesArtwork({
  collective,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: CollectivesArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={collective.cover}
              alt={collective.title}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
         <ContextMenuContent className="w-40">
          <ContextMenuItem>View Collective Details</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Edit Collective</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Update Collective Status</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Share Collective Story</ContextMenuItem>
          <ContextMenuSeparator />
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{collective.title}</h3>
        <p className="text-xs text-muted-foreground">{collective.status}</p>
      </div>
    </div>
  );
}