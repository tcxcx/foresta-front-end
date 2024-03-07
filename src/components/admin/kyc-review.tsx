import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface KycReviewDialogProps {
  applicantId?: string;
}

export function KycReviewDialog({ applicantId }: KycReviewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-7xl w-full">
        <DialogHeader>
          <DialogTitle>Review User Submission</DialogTitle>
          <DialogDescription>
            Review and update project submission details.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          {/* Project Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="projectName" className="text-right">
              User Name
            </Label>
            <Input id="projectName" defaultValue="" className="col-span-3" />
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input id="description" defaultValue="" className="col-span-3" />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit">Accept User KYC</Button>
          <Button variant={"destructive"} type="submit">
            Reject User KYC
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
