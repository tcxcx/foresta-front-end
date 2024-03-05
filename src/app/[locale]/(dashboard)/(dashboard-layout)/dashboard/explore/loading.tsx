import { ResizableSkeleton } from "@/components/dashboard/Skeleton/ResizableSkeleton";

export default function Loading() {
  return (
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <ResizableSkeleton />
        </main>
      </div>
  );
}
