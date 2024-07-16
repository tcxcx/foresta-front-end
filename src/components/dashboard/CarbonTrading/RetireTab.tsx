import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchUserAssets } from "@/hooks/web3/assetHooks/useFetchUserAssets";
import { useAuth } from "@/hooks/context/account";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRetireFromPool } from "@/hooks/web3/dexHooks/retireFromPoolExtrinsic";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import useRetirementStore from "@/hooks/context/retirementStore";
import { RetirementModal } from "@/components/dashboard/CarbonRetirements/RetirementModal";

export default function RetireTab() {
  const { account } = useAuth();
  const accountId = account?.address || "";
  const [selectedPool, setSelectedPool] = useState("");
  const { toast } = useToast();

  const { userAssets, loading: loadingAssets } = useFetchUserAssets(
    selectedPool,
    accountId
  );
  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      amount: "",
      reason: "",
      pool: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const amount = watch("amount");
  const reason = watch("reason");
  const retireFromPool = useRetireFromPool();

  const { retirementStatus } = useRetirementStore.getState();

  useEffect(() => {
    if (retirementStatus === "Transaction extrinsic finalized successfully.") {
      toast({
        title: "Carbon Credits retired successfully",
        description: "Your carbon credit certificate NFT has been added to your account",
      });
    }
  }, [retirementStatus, toast]);


  useEffect(() => {
    if (userAssets) {
      setValue("amount", userAssets.balance.toString());
    }
  }, [userAssets, setValue]);

  const handleRetireClick = async () => {
    if (!selectedPool || amount === "") {
      toast({
        description: "Please select a pool and enter an amount.",
      });
      return;
    }
    const { setIsRetiring, setRetirementStatus, setRetirementError } =
      useRetirementStore.getState();

    setIsRetiring(true);
    setRetirementStatus("Initiating retirement...");

    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await retireFromPool({
        senderAddress: accountId,
        poolId: selectedPool,
        amount,
        reason,
        setLoading
      });
      setRetirementStatus("Retirement successful. Please wait as we retrieve your certificate.");
    } catch (error: any) {
      console.error("Failed to retire:", error);
      toast({
        variant: "destructive",
        title: "Retirement Failed",
        description:
          "Your retirement action could not be completed. Please try again.",
      });
      setRetirementError(error.message || "An unknown error occurred");
    } finally {
      setIsRetiring(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <RetirementModal />

      <Tabs defaultValue="RetireFromPool " className="w-full max-w-xl">
        <TabsList className="flex divide-x divide-gray-200 rounded-lg bg-gray-100 p-1">
          <TabsTrigger value="RetireFromPool " className="flex-1 uppercase">
            MINT NFT CERTIFICATE
          </TabsTrigger>
        </TabsList>
        <TabsContent value="RetireFromPool ">
          <Card>
            <CardHeader>
              <CardTitle>Retire Carbon Credits</CardTitle>
              <CardDescription>
                Enter the amount of carbon credits you want to retire as CO2
                emissions to get your NFT certificate.
              </CardDescription>
              <p>Your Balance: {userAssets?.balance ?? 0}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <Select onValueChange={setSelectedPool}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a pool" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10002">Bio Carbon</SelectItem>
                  {/* Add more pools as needed */}
                </SelectContent>
              </Select>
              <Label htmlFor="retireAmount">Amount</Label>
              <Input
                id="retireAmount"
                type="number"
                value={amount}
                onChange={(e) => setValue("amount", e.target.value)}
                min="0"
              />
              <Label htmlFor="retireReason">Reason for Retirement</Label>
              <div className="grid w-full gap-2">
                <Textarea
                  id="retireReason"
                  value={reason}
                  onChange={(e) => setValue("reason", e.target.value)}
                  placeholder="Type your retirement message here."
                />
                <Button
                  onClick={handleRetireClick}
                  className="font-clash uppercase"
                >
                  Retire
                </Button>{" "}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
