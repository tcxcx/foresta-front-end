import React from "react";
import { Control, useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "./FormTextInput";
import { z } from "zod";
import { createProjectFormSchema } from "@/hooks/web3/schemas/carbon-credit-zod-validation-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepProps {
  form: UseFormReturn<ProjectFormData>;
  setCurrentStep: (step: number) => void;
}
type ProjectFormData = z.infer<typeof createProjectFormSchema>;

const StepTwo: React.FC<StepProps> = ({ form, setCurrentStep }) => {
  return (
    <div>
      {/* <FormTextInput control={form.control} name="name" label="Step 2 Name" placeholder="Step 2 name" /> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button type="button" variant={"ghost"} onClick={() => setCurrentStep(1)}><ChevronLeft /></Button>
        <Button type="button" variant={"ghost"} onClick={() => setCurrentStep(3)}><ChevronRight/></Button>
      </div>
    </div>
  );
};

export default StepTwo;
