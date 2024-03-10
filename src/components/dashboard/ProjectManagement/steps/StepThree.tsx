import React, { useState } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "./FormTextInput";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { createProjectFormSchema } from "@/hooks/web3/schemas/carbon-credit-zod-validation-form";
import { z } from "zod";

interface StepProps {
  form: UseFormReturn<ProjectFormData>;
  setCurrentStep: (step: number) => void;
}

type ProjectFormData = z.infer<typeof createProjectFormSchema>;

const StepThree: React.FC<StepProps> = ({ setCurrentStep }) => {
  const { control, setValue, getValues } = useFormContext();
  const [numBatchGroups, setNumBatchGroups] = useState(1);

  const handleSelectRegistry = (value: string) => {
    setValue("registryType", value);
  };

  const addBatchGroup = () => {
    if (numBatchGroups < 5) {
      setNumBatchGroups(numBatchGroups + 1);
    }
  };

  const removeBatchGroup = (index: number) => {
    const batchGroups = getValues("batchGroups");
    batchGroups.splice(index, 1);
    setValue("batchGroups", batchGroups);
    setNumBatchGroups(numBatchGroups - 1);
  };

  return (
    <div className="py-2">
      <div className="pb-4">
        <h1 className="uppercase font-clash py-2">
          Step 3:{" "}
          <span className="text-primary">Carbon Credit Issuance Batches</span>
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          When issuing your carbon credits, start by defining each Group Batch
          with a unique name, detailing the total supply, minted, and retired
          carbon credits within. This organization helps streamline the tracking
          and management of your credits across different issuance phases and
          projects.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* Column 1 */}
        <div className="space-y-2">
          <FormTextInput
            control={control}
            name="carbonCreditBach.name"
            label="Total Carbon Credit Registry Name"
            placeholder="Enter the total batch name within the registry"
          />
          <FormTextInput
            control={control}
            name="carbonCreditBach.id"
            label="Batch ID"
            placeholder="Enter batch ID"
          />
          <FormTextInput
            control={control}
            name="carbonCreditBatch.supply"
            label="Total Supply"
            placeholder="Enter total supply issued"
          />
          <FormTextInput
            control={control}
            name="carbonCreditBach.mint"
            label="Total Minted Summary"
            placeholder="Enter what part of this supply has been minted as a blockchain-based carbon credit"
          />
          <FormTextInput
            control={control}
            name="carbonCreditBatch.retire"
            label="Total Retired Summary"
            placeholder="Enter what part of this supply has been retired as a carbon credit"
          />
        </div>

        {/* Column 2 */}
        <div className="space-y-2 flex-1">
          <div className="flex flex-col space-y-2">
            {[...Array(numBatchGroups)].map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <FormTextInput
                  control={control}
                  name={`batchGroups[${index}].name`}
                  label={`Batch #${index + 1} Name`}
                  placeholder="Enter batch name"
                />
                <FormTextInput
                  control={control}
                  name={`batchGroups[${index}].totalSupply`}
                  label="Total Supply"
                  placeholder="Enter amount"
                />
                <FormTextInput
                  control={control}
                  name={`batchGroups[${index}].mintedSummary`}
                  label="# Minted Credits"
                  placeholder="Enter amount"
                />
                <FormTextInput
                  control={control}
                  name={`batchGroups[${index}].retiredSummary`}
                  label="# Retired Credits"
                  placeholder="Enter amount"
                />
              </div>
            ))}

            <div className="flex justify-between items-center">
              {numBatchGroups < 5 && (
                <div className="flex space-x-2">
                  <Button type="button" variant="ghost" onClick={addBatchGroup}>
                    <Plus />
                  </Button>
                  {numBatchGroups > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeBatchGroup(numBatchGroups - 1)}
                    >
                      <Minus />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex justify-between mt-4">
        <Button type="button" variant="ghost" onClick={() => setCurrentStep(2)}>
          <ChevronLeft />
        </Button>
        <Button type="button" variant="ghost" onClick={() => setCurrentStep(4)}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
