// "use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ContainerTableView } from "@/components/dashboard/ContainerTableView";
import MapGlobe from "@/components/map/index";
import GovernanceOverview from "@/components/dashboard/GovernanceOverview";

interface ResizableProps {
  marketTitle: string;
  governanceTitle: string;
  buttonText: string;
  titleText: string;
  descriptionText: string;
  decreaseText: string;
  increaseText: string;
  confirmText: string;
  cancelText: string;
  creditsText: string;
}

export function Resizable(props: ResizableProps) {
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-full p-4">
      <ResizablePanel defaultSize={250} className="flex-1 overflow-hidden">
        <span className="flex items-center p-2">
          <span className="pr-6 uppercase font-violet text-primary p-0 pb-0 text-xl">
            {props.marketTitle}
          </span>
          <span className="h-px flex-1 bg-black dark:bg-white"></span>
        </span>
        <ContainerTableView {...props} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={400} className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={400} className="overflow-hidden">
            <div className="flex h-full w-full items-center justify-center">
              <MapGlobe />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <span className="flex items-center p-2">
            <span className="h-px flex-1 bg-black dark:bg-white"></span>
            <span className="pl-6 uppercase font-violet text-primary text-xl">
              {props.governanceTitle}
            </span>
          </span>
          <ResizablePanel defaultSize={100} className="overflow-hidden">
            <GovernanceOverview />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
