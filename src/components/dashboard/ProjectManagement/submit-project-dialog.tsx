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
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectFormSchema } from "@/hooks/web3/schemas/carbon-credit-zod-validation-form";
import { sdgs } from "@/lib/data/SDGs";
import { z } from "zod";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFinal from "./steps/StepFinal";

type ProjectFormData = z.infer<typeof createProjectFormSchema>;

export default function SubmitProjectDialog() {
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
      royalties: {
        recipient: "",
        percentage: 0,
      },
      batchGroups: [],
      projectType: "",
    },
  });
  interface RegistryDetail {
    id: string;
    registry: string;
    details: string;
  }
  const {
    fields: registryDetailsFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "registryDetails",
  });

  interface batchGroupCarbonDetail {
    name: string;
    totalSupply: number;
    details: string;
  }
  interface batchCarbonDetail {
    name: string;
    totalSupply: number;
    minted: number;
    retired: number;
    issuanceYear: number;
  }

  const {
    fields: batchGroupFields,
    append: appendBatchGroup,
    remove: removeBatchGroup,
  } = useFieldArray({
    control: form.control,
    name: "batchGroups",
  });

  const [currentStep, setCurrentStep] = React.useState(1);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne form={form} setCurrentStep={setCurrentStep} />;
      case 2:
        return <StepTwo form={form} setCurrentStep={setCurrentStep} />;
      case 3:
        return <StepThree form={form} setCurrentStep={setCurrentStep} />;
      case 4:
        return <StepFinal isSuccess={submissionSuccess} />;
      default:
        return null;
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    console.log("Form data submitted:", data);
    setSubmissionSuccess(true);
    setCurrentStep(4);
    // Reset form to step 1 after a delay of 3 seconds
    setTimeout(() => {
      form.reset();
      setCurrentStep(1);
      setSubmissionSuccess(null);
      setIsOpen(false); // Close the dialog
    }, 3000);
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
            className="space-y-8"
          >
            <DialogHeader>
              <DialogTitle>Submit Your Conservation Project</DialogTitle>
              <DialogDescription>
                Provide project details for review and approval.
              </DialogDescription>
            </DialogHeader>
            {renderStep()}
            <DialogFooter>
              {currentStep === 3 && <Button type="submit">Submit</Button>}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
