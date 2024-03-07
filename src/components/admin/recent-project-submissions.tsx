import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ProjectReviewDialog } from "./review-project-submission";


export function RecentProjectSubmissions() {
  return (
    <div className="space-y-4">
      {/* Column titles */}
      <div className="flex justify-between text-left text-sm font-medium">
        <div className="pl-12">Project Submitter</div>
        <div>Hectares of Land</div>
        <div>Credits Issuance Request</div>
        <div>Actions</div>
      </div>
      {/* Entries */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Olivia Martin</p>
              <p className="text-sm text-muted-foreground">
                olivia.martin@email.com
              </p>
            </div>
          </div>
          <div className="font-medium">10 ha</div>
          <div className="font-medium">1,999.00</div>
          <ProjectReviewDialog />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Jackson Lee</p>
              <p className="text-sm text-muted-foreground">
                jackson.lee@email.com
              </p>
            </div>
          </div>
          <div className="font-medium">5 ha</div>
          <div className="font-medium">49.00</div>
          <ProjectReviewDialog />
        </div>
      </div>
    </div>
  );
}
