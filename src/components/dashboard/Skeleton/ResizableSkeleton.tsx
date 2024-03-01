import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ContainerTableViewSkeleton } from "@/components/dashboard/Skeleton/ContainerTableViewSkeleton ";
import MapGlobeSkeleton from "@/components/dashboard/Skeleton/MapGlobeSkeleton";
import GovernanceOverviewSkeleton from "@/components/dashboard/Skeleton/GovernanceOverviewSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function ResizableSkeleton() {
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-full p-4">
      <ResizablePanel defaultSize={250} className="flex-1 overflow-hidden">
        <span className="flex items-center p-2">
          <span className="pr-6 uppercase font-violet text-primary p-0 pb-0 text-xl">
            <Skeleton className="h-6 rounded-xl w-64" />
          </span>
          <span className="h-px flex-1 bg-black dark:bg-white"></span>
        </span>
        <ContainerTableViewSkeleton />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={400} className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={400} className="overflow-hidden">
            <MapGlobeSkeleton />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={100} className="overflow-hidden">
            <span className="flex items-center p-2">
              <span className="h-px flex-1 bg-black dark:bg-white"></span>
              <span className="pl-6 uppercase font-violet text-primary text-xl">
                <Skeleton className="h-6 rounded-xl w-64" />
              </span>
            </span>
            <GovernanceOverviewSkeleton />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
