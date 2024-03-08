import React, { useState } from "react";
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
import useApproveRejectKYC from "@/hooks/web3/kycHooks/ApproveRejectKYCExtrinsic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface KycReviewDialogProps {
  applicantId?: string;
}

export function KycReviewDialog({ applicantId }: KycReviewDialogProps) {
  const { approveKYC, rejectKYC, isLoading } = useApproveRejectKYC();
  const [selectedKycLevel, setSelectedKycLevel] = useState("");

  const handleApprove = () => {
    if (!applicantId) {
      console.error("Applicant ID is undefined");
      return;
    }
    approveKYC(applicantId, selectedKycLevel);
  };

  const handleReject = () => {
    if (!applicantId) {
      console.error("Applicant ID is undefined");
      return;
    }
    rejectKYC(applicantId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-7xl w-full">
        <DialogHeader>
          <DialogTitle>KYC Review</DialogTitle>
          <DialogDescription>
            Review and accept/reject user level request.
          </DialogDescription>
        </DialogHeader>

        <Select onValueChange={setSelectedKycLevel} value={selectedKycLevel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select KYC Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="KYCLevel1">KYC Level 1</SelectItem>
            <SelectItem value="KYCLevel2">KYC Level 2</SelectItem>
            <SelectItem value="KYCLevel3">KYC Level 3</SelectItem>
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button onClick={handleApprove}>Accept User KYC</Button>
          <Button onClick={handleReject} variant={"destructive"}>
            Reject User KYC
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
