"use client";

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
import { v4 as uuid } from "uuid";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectFormSchema } from "@/hooks/web3/schemas/carbon-credit-zod-validation-form";
import { z } from "zod";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import StepOne from "./submit-project-steps/StepOne";
import StepTwo from "./submit-project-steps/StepTwo";
import StepThree from "./submit-project-steps/StepThree";
import StepFour from "./submit-project-steps/StepFour";
import StepFinal from "./submit-project-steps/StepFinal";
import { createProject } from "@/hooks/web3/sendTx-extrinsics";
import { useAuth } from "@/hooks/context/account";
import { Progress } from "@/components/ui/progress";
import { projectType as projectTypeEnum } from "@/hooks/web3/carbonCreditHooks/createProjectTypes";

type ProjectFormData = z.infer<typeof createProjectFormSchema>;

export default function SubmitProjectDialog() {
  const { account } = useAuth();
  const currentUserAddress = account?.address || "";

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      images: [],
      videos: [],
      documents: [],
      registryDetails: [],
      sdgDetails: [],
      royalties: [{ recipient: "0x", percentage: 0 }],
      batchGroups: [],
    },
  });

  const [currentStep, setCurrentStep] = React.useState(1);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(
    null
  );

  const totalSteps = 5;
  const progressValue = (currentStep / totalSteps) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne form={form} setCurrentStep={setCurrentStep} />;
      case 2:
        return <StepTwo form={form} setCurrentStep={setCurrentStep} />;
      case 3:
        return <StepThree form={form} setCurrentStep={setCurrentStep} />;
      case 4:
        return <StepFour form={form} setCurrentStep={setCurrentStep} />;
      case 5:
        return <StepFinal isSuccess={submissionSuccess} />;
      default:
        return null;
    }
  };
  const onSubmit = async (data: ProjectFormData) => {
    const timestamp = Date.now();
    const projectTypeKey = data.projectType as projectTypeEnum;

    const sdgDetails = Array.isArray(data.sdgDetails)
      ? data.sdgDetails.map((item) => ({
          ...item,
          references: Array.isArray(item.references) ? item.references : [],
        }))
      : [];

    const safeConvertToStringArray = (
      input: string | string[] | undefined
    ): string[] => {
      if (Array.isArray(input)) {
        return input;
      } else if (typeof input === "string") {
        return input.split(",").map((s) => s.trim());
      } else {
        return [];
      }
    };

    const images = safeConvertToStringArray(data.images);
    const videos = safeConvertToStringArray(data.videos);
    const documents = safeConvertToStringArray(data.documents);

    let batchGroups: {
      uuid: string;
      assetId: number;
      totalSupply: bigint;
      minted: bigint;
      retired: bigint;
      batches: any[];
    }[] = [];
    if (Array.isArray(data.batchGroups)) {
      batchGroups = data.batchGroups.map((group) => ({
        ...group,
        uuid: uuid(),
        assetId: 0,
        totalSupply: BigInt(group.totalSupply),
        minted: group.minted ? BigInt(group.minted) : BigInt(0),
        retired: group.retired ? BigInt(group.retired) : BigInt(0),
        batches: Array.isArray(group.batches)
          ? group.batches.map((batch) => ({
              ...batch,
              totalSupply: BigInt(batch.totalSupply),
              minted: batch.minted ? BigInt(batch.minted) : BigInt(0),
              retired: batch.retired ? BigInt(batch.retired) : BigInt(0),
            }))
          : [],
      }));
    }

    const updatedData = {
      ...data,
      projectType: projectTypeKey,
      created: timestamp,
      updated: timestamp,
      images,
      videos,
      documents,
      sdgDetails,
      batchGroups,
      royalties: Array.isArray(data.royalties) ? data.royalties.map(royalty => ({
        recipient: royalty.recipient.trim(),
        percentage: parseFloat(royalty.percentage.toString()),
      })) : [],
      
    };
    
    console.log("Refactored form data for submission:", updatedData);

    try {
      await createProject(currentUserAddress, updatedData);
      console.log("Project submitted successfully");
      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Failed to submit the project:", error);
      setSubmissionSuccess(false);
    }

    setCurrentStep(5);
    setTimeout(() => {
      form.reset();
      setCurrentStep(1);
      setSubmissionSuccess(null);
    }, 20000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Submit Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = form.getValues();
              onSubmit(data);
            }}
            className="space-y-2"
          >
            <DialogHeader>
              <DialogTitle>Submit Your Conservation Project</DialogTitle>
              <DialogDescription>
                Provide project details for review and approval.
              </DialogDescription>
              <Progress value={progressValue} />
            </DialogHeader>

            {renderStep()}

            <DialogFooter>
              {currentStep === 4 && <Button type="submit">Submit</Button>}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
