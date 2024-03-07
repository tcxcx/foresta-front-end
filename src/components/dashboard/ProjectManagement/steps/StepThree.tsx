import React from "react";
import { Control, useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "./FormTextInput";
import { z } from "zod";
import { createProjectFormSchema } from "@/hooks/web3/schemas/carbon-credit-zod-validation-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface StepProps {
  form: UseFormReturn<ProjectFormData>;
  setCurrentStep: (step: number) => void;
}
type ProjectFormData = z.infer<typeof createProjectFormSchema>;

const StepThree: React.FC<StepProps> = ({ form, setCurrentStep }) => {
  return (
    <div>
      {/* <FormTextInput
        control={form.control}
        name="name"
        label="Project Name"
        placeholder="Enter project name"
      /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "20px",
        }}
      >
        <Button type="button" variant={"ghost"} onClick={() => setCurrentStep(2)}>
          <ChevronLeft />
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
