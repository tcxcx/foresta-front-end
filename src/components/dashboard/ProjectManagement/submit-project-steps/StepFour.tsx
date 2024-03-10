import React, { useState } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "./FormTextInput";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Minus } from "lucide-react";
import { z } from "zod";
import { createProjectFormSchema } from "@/hooks/web3/schemas/carbon-credit-zod-validation-form";

interface StepProps {
  form: UseFormReturn<ProjectFormData>;
  setCurrentStep: (step: number) => void;
}

type ProjectFormData = z.infer<typeof createProjectFormSchema>;

const StepFour: React.FC<StepProps> = ({ setCurrentStep }) => {
  const { control } = useFormContext<ProjectFormData>();
  const [royaltyEntries, setRoyaltyEntries] = useState([
    { recipient: "", percentage: 0 },
  ]);

  const handleAddRoyaltyEntry = () => {
    setRoyaltyEntries([...royaltyEntries, { recipient: "", percentage: 0 }]);
  };

  const handleRemoveRoyaltyEntry = (index: number) => {
    const updatedEntries = [...royaltyEntries];
    updatedEntries.splice(index, 1);
    setRoyaltyEntries(updatedEntries);
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <h1 className="uppercase font-clash py-2">
        Step 4:{" "}
        <span className="text-primary">Carbon Credit Sale Royalties</span>
      </h1>
      <p className="text-sm text-stone-500 dark:text-stone-400">
        Define the wallet addresses and their respective share percentages for
        receiving royalties from carbon credit sales.
      </p>
      <div className="flex-1 flex flex-col gap-4">
        {royaltyEntries.map((_, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-1">
              <FormTextInput
                control={control}
                name={`royalties[${index}].recipient`}
                label="Wallet Address"
                placeholder="Enter recipient's wallet address"
              />
            </div>
            <div className="flex-1">
              <FormTextInput
                control={control}
                name={`royalties[${index}].percentage`}
                label="Percentage"
                placeholder="Share percentage"
              />
            </div>
          </div>
        ))}
      </div>
      {royaltyEntries.length > 1 && (
        <Button
          variant="ghost"
          type="button"
          onClick={() => handleRemoveRoyaltyEntry(royaltyEntries.length - 1)}
        >
          <Minus /> Remove
        </Button>
      )}
      <Button
        variant="ghost"
        onClick={handleAddRoyaltyEntry}
        className="self-start"
        type="button"
      >
        <Plus /> Add
      </Button>

      <div className="mt-6">
        <Button variant="ghost" onClick={() => setCurrentStep(3)}>
          <ChevronLeft /> Back
        </Button>
      </div>
    </div>
  );
};

export default StepFour;
