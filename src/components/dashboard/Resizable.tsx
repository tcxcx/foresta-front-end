import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ContainerTableView } from '@/components/dashboard/ContainerTableView'; 

export function Resizable() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-full"
    >
      <ResizablePanel defaultSize={300} className="flex-1 overflow-hidden">
        <ContainerTableView />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={300} className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={150} className="overflow-hidden">
            {/* Content for "Two" */}
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={150} className="overflow-hidden">
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
