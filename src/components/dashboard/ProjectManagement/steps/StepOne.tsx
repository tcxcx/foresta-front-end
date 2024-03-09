import React from "react";
import { Control, useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "./FormTextInput";
import { z } from "zod";
import { createProjectFormSchema } from "@/hooks/web3/schemas/carbon-credit-zod-validation-form";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface StepProps {
  form: UseFormReturn<ProjectFormData>;
  setCurrentStep: (step: number) => void;
}
type ProjectFormData = z.infer<typeof createProjectFormSchema>;

const StepOne: React.FC<StepProps> = ({ form, setCurrentStep }) => {
  return (
    <div>
      <FormTextInput
        control={form.control}
        name="name"
        label="Project Name"
        placeholder="Enter the project name"
      />
      <FormTextInput
        control={form.control}
        name="description"
        label="Description"
        placeholder="Provide a description for the project"
      />
      <FormTextInput
        control={form.control}
        name="location"
        label="Location"
        placeholder="Project location"
      />{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => setCurrentStep(2)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default StepOne;
