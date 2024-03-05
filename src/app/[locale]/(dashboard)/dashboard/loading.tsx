import { ResizableSkeleton } from "@/components/dashboard/Skeleton/ResizableSkeleton";
import SideMenuSkeleton from "@/components/dashboard/Skeleton/SideMenuSkeleton";

export default function Loading() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-background">
      <SideMenuSkeleton />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <ResizableSkeleton />
        </main>
      </div>
    </div>
  );
}
