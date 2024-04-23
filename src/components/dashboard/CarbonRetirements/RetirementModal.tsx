import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import useRetirementStore from "@/hooks/context/retirementStore";
import { Button } from "@/components/ui/button";
import { Terminal, X } from "lucide-react";
import { PlaceholderComponent } from "../ProjectManagement/empty-placeholder";
import { PlaceholderType } from "@/components/dashboard/ProjectManagement/placeholder-types";
import CarbonRetirementToast from "../CarbonTrading/carbonRetirementToast";

export function RetirementModal() {
  const {
    retirementStatus,
    isRetiring,
    retirementError,
    certificateLink,
    setRetirementStatus,
    setIsRetiring,
    setRetirementError,
    setCertificateLink,
  } = useRetirementStore();

  const [modalOpen, setModalOpen] = useState(false);

  // Calculate the progress based on the current status
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    switch (retirementStatus) {
      case "Loading...":
        setProgress(5);
        break;

      case "Getting signer.":
        setProgress(15);
        break;

      case "We are generating your CO2 retirement certificate. Please wait...":
        setProgress(30);
        break;

      case "Uploading certificate to IPFS...":
        setProgress(45);
        break;
      case "Please sign the transaction to proceed.":
        setProgress(55);
        break;
      case "Transaction submitted to the blockchain...":
        setProgress(65);
        break;
      case "Retirement successful. Please wait as we retrieve your certificate.":
        setProgress(85);
        break;
      case "Transaction finalized.":
        setProgress(94);
        break;
      default:
        setProgress(0);
    }
  }, [retirementStatus]);

  useEffect(() => {
    if (isRetiring) {
      setModalOpen(true);
    }
  }, [isRetiring]);

  useEffect(() => {
    return () => {
      setRetirementStatus("");
      setRetirementError("");
      setCertificateLink("");
      setIsRetiring(false);
    };
  }, [
    setRetirementStatus,
    setIsRetiring,
    setRetirementError,
    setCertificateLink,
  ]);

  if (!modalOpen) return null;

  return (
    <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
      <AlertDialogContent>
        <div className="relative">
          <Progress
            value={progress}
            className="fixed top-0 left-0 right-0 z-40"
          />
          {(retirementStatus === "Transaction finalized." ||
            retirementError) && (
            <Button
              variant={"default"}
              onClick={() => {
                setModalOpen(false);
                setIsRetiring(false);
                setRetirementStatus("");
                setRetirementError("");
                setCertificateLink("");
              }}
              className="absolute -top-5 -right-12 z-50 rounded-full text-sm -translate-y-1/2"
            >
              <X />
            </Button>
          )}
        </div>
        {retirementStatus === "Transaction finalized." ? (
          <>
            <AlertDialogHeader>
              <div className="flex items-start space-x-2">
                <Terminal className="h-10 w-10 mt-1 flex-shrink-0" />
                <div>
                  <AlertDialogTitle>
                    {retirementError ? "Error" : "Transaction Status"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {retirementError || retirementStatus}
                    <div className="pt-4">
                      <CarbonRetirementToast />
                    </div>
                  </AlertDialogDescription>
                </div>
              </div>
            </AlertDialogHeader>
          </>
        ) : (
          <>
            <AlertDialogHeader>
              <div className="flex items-start space-x-2">
                <Terminal className="h-10 w-10 mt-1 flex-shrink-0" />
                <div>
                  <AlertDialogTitle>
                    {retirementError ? "Error" : "Transaction Status"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {retirementError || retirementStatus}
                    {(isRetiring ||
                      retirementStatus ===
                        "Retirement successful. Please wait as we retrieve your certificate.") && (
                      <PlaceholderComponent type={PlaceholderType.sendTx} />
                    )}
                  </AlertDialogDescription>
                </div>
              </div>
            </AlertDialogHeader>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
