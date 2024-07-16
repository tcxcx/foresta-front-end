import SideMenuSkeleton from "@/components/dashboard/Skeleton/SideMenuSkeleton";

export default function Loading() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-background">
      <SideMenuSkeleton />
    </div>
  );
}
