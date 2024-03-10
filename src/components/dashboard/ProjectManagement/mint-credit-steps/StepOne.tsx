import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
const mintCreditSchema = z.object({
  projectId: z.number(),
  groupId: z.number(),
  amountToMint: z.number().min(1, "You must mint at least one credit"),
  listToMarketplace: z.boolean(),
});

type MintCreditFormData = z.infer<typeof mintCreditSchema>;

interface StepOneProps {
  onMintCredits: (data: MintCreditFormData) => void;
  projectId?: number;
  projectName: any;
  project: any;
  groupId: number;
  totalSupply: number;
  minted: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepOne: React.FC<StepOneProps> = ({
  onMintCredits,
  projectId,
  projectName,
  project,
  groupId,
  totalSupply,
  minted,
  setCurrentStep,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MintCreditFormData>({
    resolver: zodResolver(mintCreditSchema),
    defaultValues: {
      projectId: projectId,
      groupId: groupId,
      amountToMint: 1,
      listToMarketplace: false,
    },
  });

  const maxMintable = totalSupply - minted;

  const handleMax = () => {
    setValue("amountToMint", maxMintable);
  };

  const handleToggleChange = (value: boolean) => {
    setValue("listToMarketplace", value);
  };

  const onSubmit = (data: MintCreditFormData) => {
    onMintCredits(data);
  };

  return (
    <Card className="max-w-lg mx-auto mt-5 shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="p-5">
        <div className="py-2">
          <h1 className="uppercase font-clash py-2">
            {" "}
            <span className="text-primary">Mint Credits</span> for the{" "}
            <span className="text-primary"> {projectName} </span>
            Project
          </h1>
          <p className="font-clash uppercase">
            Available to mint:{" "}
            <span className="text-primary">{maxMintable}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 relative">
            <Controller
              control={control}
              name="amountToMint"
              render={({ field }) => (
                <>
                  <Label
                    htmlFor="amountToMint"
                    className="font-clash uppercase"
                  >
                    Amount to Mint
                  </Label>
                  <Label
                    onClick={handleMax}
                    className="text-right font-clash uppercase text-primary cursor-pointer hover:underline"
                    style={{ position: "absolute", top: "0", right: "0" }}
                  >
                    Max
                  </Label>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Input
                        id="amountToMint"
                        type="number"
                        placeholder="Enter amount"
                        className={`mt-1 ${
                          errors.amountToMint ? "border-red-500" : ""
                        }`}
                        {...field}
                      />

                      {errors.amountToMint && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.amountToMint.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            />
          </div>

          <Controller
            control={control}
            name="listToMarketplace"
            render={({ field }) => (
              <div className="mt-3">
                <Label htmlFor={`toggle-listToMarketplace`}>
                  List to Marketplace?
                </Label>
                <div className="mt-2">
                  <Switch
                    id={`toggle-listToMarketplace`}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </div>
            )}
          />
        </div>

        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default StepOne;
