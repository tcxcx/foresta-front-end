import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogContentMint,
  DialogTrigger,
} from "@/components/ui/dialog";
import StepFinal from "./mint-credit-steps/StepFinal";
import StepOne from "./mint-credit-steps/StepOne";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { FormProvider, useForm } from "react-hook-form";
import { mintCarbonCredits } from "@/hooks/web3/carbonCreditHooks/mintProjectCreditsExtrinsics";
import { useAuth } from "@/hooks/context/account";

interface MintProjectDialogProps {
  project: any;
  projectName: any;
  projectId?: number;
  projectIdIndex: number;
  groupId: number;
  totalSupply: number;
  minted: number;
}

const MintProjectDialog: React.FC<MintProjectDialogProps> = ({
  groupId,
  project,
  projectName,
  projectIdIndex,
  totalSupply,
  minted,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(
    null
  );

  const { account } = useAuth();
  const senderAddress = account?.address || "";
  const setLoading = (isLoading: boolean) => {
    // Define your loading state handling logic here
  };

  const onMintCredits = async (data: any) => {
    try {
      // Pass projectId and groupId to the onMintCredits function
      await mintCarbonCredits(senderAddress, data, setLoading);
      setSubmissionSuccess(true);
    } catch (error) {
      setSubmissionSuccess(false);
    }
  };
  
  const onSubmit = async (data: any) => {
    setLoading(true);
    await onMintCredits(data); 
  };

  const formMethods = useForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Mint Project
        </Button>
      </DialogTrigger>
      <DialogContentMint>
        <FormProvider {...formMethods}>
          <StepOne
            project={project}
            projectId={projectIdIndex}
            projectName={projectName}
            groupId={groupId}
            totalSupply={totalSupply}
            minted={minted}
            setCurrentStep={setCurrentStep}
            onMintCredits={onMintCredits}
          />
        </FormProvider>
      </DialogContentMint>
      {currentStep === 2 && <StepFinal isSuccess={submissionSuccess} />}
    </Dialog>
  );
};

export default MintProjectDialog;
