import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { KycReviewDialog } from "./kyc-review";

export function RecentUserKycSubmissions() {
  return (
    <div className="space-y-4">
      {/* Column titles */}
      <div className="flex justify-between text-left text-sm font-medium">
        <div className="pl-12">KYC Submitter</div>
        <div>Clearance Request</div>
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
          <div className="font-medium">1</div>
          <KycReviewDialog />
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
          <div className="font-medium">Level 1</div>
          <KycReviewDialog />
        </div>
      </div>
    </div>
  );
}
