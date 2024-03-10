import Image from "next/image";
import { hexToString } from "@polkadot/util";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import truncateMiddle from "truncate-middle";
import Identicon from "@polkadot/react-identicon";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import MintProjectDialog from "@/components/dashboard/ProjectManagement/mint-project-dialog";
import { useAuth } from "@/hooks/context/account";

interface BatchGroup {
  assetId: number;
  batches: any[];
  minted: number;
  name: string;
  retired: number;
  totalSupply: number;
}

export interface ProjectInfo {
  projectId?: string;
  approved: string;
  name: string;
  description: string;
  images: string[];
  originator: string;
  created: number;
  batchGroups: BatchGroup[];
}

interface ProjectArtworkProps {
  project: ProjectInfo;
  projectIdIndex: number;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  className?: string;
}

export const ProjectArtwork: React.FC<ProjectArtworkProps> = ({
  project,
  projectIdIndex,
  aspectRatio = "portrait",
  width,
  height,
  className,
}) => {
  const { account } = useAuth();
  const currentUserAddress = account?.address || "";

  const safelyParseHexString = (hexString: string): string => {
    try {
      return hexToString(hexString);
    } catch (error) {
      console.error("Error parsing hex string:", error);
      return hexString; // Return the original string on failure
    }
  };

  const dummyImageUrl =
    "https://images.unsplash.com/photo-1682686581663-179efad3cd2f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const convertIpfsUrlToHttpUrl = (ipfsUrl: string): string => {
    if (ipfsUrl.startsWith("ipfs://")) {
      return `https://ipfs.io/ipfs/${ipfsUrl.substring(7)}`;
    } else if (ipfsUrl.startsWith("0x")) {
      const parsedUrl = safelyParseHexString(ipfsUrl);
      if (parsedUrl.startsWith("ipfs://")) {
        return `https://ipfs.io/ipfs/${parsedUrl.substring(7)}`;
      }
      return parsedUrl;
    }
    return ipfsUrl;
  };

  const coverImage =
    // project.images.length > 0
    //   ? convertIpfsUrlToHttpUrl(project.images[0])
    //   :
    dummyImageUrl;

  const projectName = safelyParseHexString(project.name);
  const projectDescription = safelyParseHexString(project.description);
  const projectStatus = project.approved;
  const projectId = project.projectId;

  const assetId = Array.isArray(project.batchGroups)
    ? project.batchGroups.reduce(
        (acc: number, group: BatchGroup) => acc + group.assetId,
        0
      )
    : 0;

  const totalSupply = project.batchGroups[0].totalSupply || 0;
  const mintedSupply = project.batchGroups[0].minted || 0;

  const creationDate = new Date(project.created * 1000).toLocaleDateString();
  const isApprovedAndOwner =
    project.approved === "Approved" &&
    project.originator === currentUserAddress;

  return (
    <div className={cn("space-y-3", className)}>
      <HoverCard>
        <HoverCardTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={coverImage}
              alt={projectName}
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
            <Identicon value={project.originator} size={32} theme="polkadot" />
            <div className="space-y-1 text-sm">
              Project Creator:
              <Button className="text-primary" variant="link">
                <p>{truncateMiddle(project.originator, 6, 4, "...")}</p>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-xs text-muted-foreground">
              Created: {creationDate}
            </span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-xs text-muted-foreground">
              <div>Total Supply: {totalSupply}</div>
            </span>
          </div>
          <div className="flex items-center justify-start">
            <Button variant="link">View Details</Button>
            <span className="h-px flex-1 bg-black dark:bg-white"></span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <span className="h-px flex-1 bg-black dark:bg-white"></span>
            {isApprovedAndOwner && (
              <div className="mt-2 w-full text-center">
                <MintProjectDialog
                  project={project}
                  projectId={projectIdIndex}
                  projectIdIndex={projectIdIndex}
                  groupId={assetId}
                  projectName={projectName}
                  totalSupply={totalSupply}
                  minted={mintedSupply}
                />{" "}
              </div>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{projectName}</h3>
        <p className="text-xs text-muted-foreground">
          {truncateMiddle(projectDescription, 10, 10, "...")}
        </p>
        <p className="text-xs text-muted-foreground">Status: {projectStatus}</p>
      </div>
    </div>
  );
};
