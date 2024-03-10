import React from "react";
import { UseFormReturn, useFormContext } from "react-hook-form";
import { FormTextInput } from "./FormTextInput";
import { z } from "zod";
import { createProjectFormSchema } from "@/hooks/web3/schemas/carbon-credit-zod-validation-form";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectType as projectTypeEnum } from "@/hooks/web3/carbonCreditHooks/createProjectTypes";

interface StepProps {
  form: UseFormReturn<ProjectFormData>;
  setCurrentStep: (step: number) => void;
}
type ProjectFormData = z.infer<typeof createProjectFormSchema>;

const projectTypes = Object.values(projectTypeEnum);

const StepOne: React.FC<StepProps> = ({ form, setCurrentStep }) => {
  const { control, setValue } = useFormContext();
  const handleSelectProjectType = (value: string) => {
    setValue("projectType", value);
  };

  return (
    <div className="py-2">
      <h1 className="uppercase font-clash py-2">
        {" "}
        Step 1: <span className="text-primary">General Information</span>
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Column 1 */}
        <div className="space-y-2">
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
        </div>

        {/* Column 2 */}

        <div className="space-y-2">
          <FormTextInput
            control={control}
            name="images"
            label="Image Links"
            placeholder="Add image URLs, separated by commas"
            
          />

          <FormTextInput
            control={control}
            name="videos"
            label="Video Links"
            placeholder="Add video URLs, separated by commas"
          />
          <FormTextInput
            control={control}
            name="documents"
            label="Document Links"
            placeholder="Add document URLs, separated by commas"
          />
        </div>
        <div>
          <Select onValueChange={handleSelectProjectType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Project Types</SelectLabel>
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2 flex justify-end mt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setCurrentStep(2)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default StepOne;
