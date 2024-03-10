import React, { useState } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "./FormTextInput"; // Assuming this component exists
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
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
import { RegNameList } from "@/hooks/web3/carbonCreditHooks/createProjectTypes";
import {
  SDGDetails,
  SdgDetails,
} from "@/hooks/web3/carbonCreditHooks/createProjectTypes";

interface StepProps {
  form: UseFormReturn<ProjectFormData>;
  setCurrentStep: (step: number) => void;
}

type ProjectFormData = z.infer<typeof createProjectFormSchema>;

const registryType = Object.values(RegNameList);

const StepTwo: React.FC<StepProps> = ({ setCurrentStep }) => {
  const { control, setValue, getValues } = useFormContext();
  const [numSdgDetails, setNumSdgDetails] = useState(1);

  const handleSelectProjectType = (value: string) => {
    setValue("registryType", value);
  };

  const addSdgDetail = () => {
    if (numSdgDetails < 5) {
      setNumSdgDetails(numSdgDetails + 1);
    }
  };

  const removeSdgDetail = (index: number) => {
    const sdgDetails = getValues("sdgDetails");
    sdgDetails.splice(index, 1);
    setValue("sdgDetails", sdgDetails);
    setNumSdgDetails(numSdgDetails - 1);
  };
  return (
    <div className="py-2">
      <h1 className="uppercase font-clash py-2">
        Step 2:{" "}
        <span className="text-primary">
          {" "}
          Registry Certification Information
        </span>
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Column 1 */}
        <div className="space-y-2 pt-1">
          <Select onValueChange={handleSelectProjectType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Credits Registry" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Registries</SelectLabel>
                {registryType.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormTextInput
            control={control}
            name="registryDetails.name"
            label="Project Registry Name"
            placeholder="Enter project name within the registry"
          />
          <FormTextInput
            control={control}
            name="registryDetails.id"
            label="Project Registry Id"
            placeholder="Enter project id in registry"
          />
          <FormTextInput
            control={control}
            name="registryDetails.summary"
            label="Registry Summary"
            placeholder="Enter a summary of your certification experience"
          />
        </div>

        {/* Column 2 */}

        {/* Column 2 */}
        <div className="space-y-2 flex-1">
          <div className="flex flex-col space-y-2 -inset-1">
            {[...Array(numSdgDetails)].map((_, index) => {
              return (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-grow">
                    <Select
                      onValueChange={(value) =>
                        setValue(`sdgDetails[${index}].sdgType`, value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select SDG Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>SDG Types</SelectLabel>
                          {Object.values(SdgDetails).map((sdg) => (
                            <SelectItem key={sdg} value={sdg}>
                              {sdg}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormTextInput
                    control={control}
                    name={`sdgDetails[${index}].description`}
                    label=""
                    placeholder="Enter SDG description"
                  />
                  <FormTextInput
                    control={control}
                    name={`sdgDetails[${index}].references`}
                    label=""
                    placeholder="Enter references"
                  />
                
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center">
            {numSdgDetails < 5 && (
              <div className="flex space-x-2">
                <Button type="button" variant="ghost" onClick={addSdgDetail}>
                  <Plus />
                </Button>
                {numSdgDetails > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeSdgDetail(numSdgDetails - 1)}
                  >
                    <Minus />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2 flex justify-between mt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setCurrentStep(1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setCurrentStep(3)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
