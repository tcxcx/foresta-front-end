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
import { transformProjectFormData } from "@/lib/data/transformProjectFormData";

type ProjectFormData = z.infer<typeof createProjectFormSchema>;

export default function SubmitProjectDialog() {
  const { account } = useAuth();
  const [error, setError] = useState<string | null>(null);

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
        <StepFinal isSuccess={submissionSuccess} error={error} />;
      default:
        return null;
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    const transformedData = transformProjectFormData(data);
    try {
      await createProject(account?.address || "", transformedData);
      console.log("Project submitted successfully");
      setSubmissionSuccess(true);
      setError(null);
    } catch (error) {
      console.error("Failed to submit the project:", error);
      setSubmissionSuccess(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
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
