import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Terminal, X } from "lucide-react";
import { PlaceholderComponent } from "../ProjectManagement/empty-placeholder";
import { PlaceholderType } from "@/components/dashboard/ProjectManagement/placeholder-types";
import CarbonRetirementToast from "../CarbonTrading/carbonRetirementToast";
import useRetirementStore from "@/hooks/context/retirementStore";
import useDownloadLink from "@/pages/api/ipfs-download-link";

export function RetirementModal() {
  const {
    retirementStatus,
    isRetiring,
    retirementError,
    certificateLink,
    cid,
    setRetirementStatus,
    setIsRetiring,
    setRetirementError,
    setCertificateLink,
  } = useRetirementStore();

  const [modalOpen, setModalOpen] = useState(false);
  const { downloadLink, isLoading, error } = useDownloadLink(cid);

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
      case "Transaction extrinsic finalized successfully.":
        setProgress(94);
        break;
      default:
        setProgress(0);
    }
  }, [retirementStatus]);


  useEffect(() => {
    if (downloadLink) {
      console.log('Setting certificate link:', downloadLink);
      setCertificateLink(downloadLink);
    }
  }, [downloadLink, setCertificateLink]);
  
  useEffect(() => {
    console.log('Current retirement status:', retirementStatus);
    console.log('Current certificate link:', certificateLink);
  }, [retirementStatus, certificateLink]);
  

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
  console.log("Current retirment status", retirementStatus);
  console.log("Current CID status", cid);
  console.log("Current download link:", downloadLink );


  return (
    <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
      <AlertDialogContent>
        <div className="relative">
          <Progress
            value={progress}
            className="fixed top-0 left-0 right-0 z-40"
          />
          {(retirementStatus === "Transaction extrinsic finalized successfully." ||
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
        {retirementStatus === "Transaction extrinsic finalized successfully." ? (
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
