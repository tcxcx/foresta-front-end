import Image from "next/image";

import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import truncateMiddle from "truncate-middle";
import Identicon from "@polkadot/react-identicon";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import { Collective } from "@/lib/data/projects";
import { SDG } from "@/lib/data/SDGs";

interface CollectivesArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  collective: any;
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

  const joinCollective = () => {
    console.log("Joining collective", collective.collectivesMap?.name);
  };

  const managerAccountLink =
    collective.managers && collective.managers.length > 0
      ? `https://polkadot.subscan.io/account/${collective.managers[0]}`
      : "#";

  const managerDisplay =
    collective.managers && collective.managers.length > 0
      ? collective.managers[0]
      : "N/A";

  const collectiveName =
    collective.collectivesMap?.name ?? "Unknown Collective";
  const membersCount = collective.membersCount ?? "Unknown";
  const status =
    collective.approvedProjects && collective.approvedProjects.length > 0
      ? "Live"
      : "Upcoming";


      const dummyImageUrl = "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1682&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="cursor-pointer">
      <HoverCard >
        <HoverCardTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={collective.cover || dummyImageUrl}
              alt={collective.title}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-full">
          <div className="flex justify-between space-x-4">
            <Identicon value={managerDisplay} size={32} theme="polkadot" />
            <div className="space-y-1 text-sm">
              Manager:
              <Button className="text-primary" variant="link">
                <p>
                  <a
                    href={managerAccountLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {truncateMiddle(managerDisplay, 5, 5, "...")}
                  </a>
                </p>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">Created: 2021</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-xs text-muted-foreground">
              <div>Members Count: {membersCount}</div>
            </span>
          </div>
          <div className="flex items-center justify-start">
            <Button variant="link">View Details</Button>
            <span className="h-px flex-1 bg-black dark:bg-white"></span>
          </div>
          <div className="flex items-center justify-start">
            <span className="h-px flex-1 bg-black dark:bg-white"></span>

            <Button onClick={joinCollective} className="mt-2 w-full">
              Join Collective
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{collectiveName}</h3>
        <p className="text-xs text-muted-foreground">{status}</p>
      </div>
    </div>
    </div>
  );
}
