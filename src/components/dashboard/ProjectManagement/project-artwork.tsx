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

import { Project } from "@/lib/data/projects";
import { SDG } from "@/lib/data/SDGs";

interface ProjectArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function ProjectArtwork({
  project,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ProjectArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={project.cover}
              alt={project.title}
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
          <ContextMenuItem>View Project Details</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Edit Project</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Update Project Status</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Share Project</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Remove from Dashboard</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{project.title}</h3>
        <p className="text-xs text-muted-foreground">{project.status}</p>
      </div>
    </div>
  );
}