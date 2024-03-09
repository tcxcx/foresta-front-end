import React from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "./FormTextInput"; // Assuming this component exists
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProjectFormSchema } from "@/hooks/web3/schemas/carbon-credit-zod-validation-form";
import { projectType as projectTypeEnum } from "@/hooks/web3/carbonCreditHooks/createProjectTypes";

interface StepProps {
  form: UseFormReturn<ProjectFormData>;
  setCurrentStep: (step: number) => void;
}
type ProjectFormData = z.infer<typeof createProjectFormSchema>;

const projectTypes = Object.values(projectTypeEnum);

const StepTwo: React.FC<StepProps> = ({ setCurrentStep }) => {
  const { control, setValue } = useFormContext();

  // React Hook Form's setValue is used to manually update the value of 'projectType'
  const handleSelectProjectType = (value: string) => {
    setValue("projectType", value);
  };

  return (
    <div>
      <Select onValueChange={handleSelectProjectType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a project type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Project Types</SelectLabel>
            {projectTypes.map((type) => (
              <SelectItem key={type} value={type}>{type.replace(/_/g, ' ')}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormTextInput
        control={control}
        name="royalties.recipient"
        label="Royalty Recipient Address"
        placeholder="Recipient's wallet address"
      />
      <FormTextInput
        control={control}
        name="royalties.percentage"
        label="Royalty Percentage"
        placeholder="0 - 100"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button type="button" variant="ghost" onClick={() => setCurrentStep(1)}><ChevronLeft /></Button>
        <Button type="button" variant="ghost" onClick={() => setCurrentStep(3)}><ChevronRight /></Button>
      </div>
    </div>
  );
};

export default StepTwo;
