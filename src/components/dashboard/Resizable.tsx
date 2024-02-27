'use client';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ContainerTableView } from "@/components/dashboard/ContainerTableView";
import MapGlobe from "../map";

export function Resizable() {
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
      <ResizablePanel defaultSize={250} className="flex-1 overflow-hidden">
        <ContainerTableView />
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
          <ResizablePanel defaultSize={100} className="overflow-hidden">
            {/* Content for "Three" */}
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
