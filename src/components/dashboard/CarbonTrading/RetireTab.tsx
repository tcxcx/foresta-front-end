import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFetchUserAssets } from "@/hooks/web3/assetHooks/useFetchUserAssets";
import { useAuth } from "@/hooks/context/account";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { retireFromPool } from "@/hooks/web3/dexHooks/retireFromPoolExtrinsic";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";

export default function RetireTab() {
  const { account } = useAuth();
  const accountId = account?.address || "";
  const [selectedPool, setSelectedPool] = useState("");
  const { toast } = useToast();

  const { userAssets, loading: loadingAssets } = useFetchUserAssets(
    selectedPool,
    accountId
  );

  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      amount: "",
      pool: "",
    },
  });
  const amount = watch("amount");

  useEffect(() => {
    if (userAssets) {
      setValue("amount", userAssets.balance.toString());
    }
  }, [userAssets, setValue]);

  const handleRetire = async () => {
    if (!selectedPool || amount === "") {
      toast({
        description: "Please select a pool, enter an amount.",
      });
      return;
    }
    try {
      await retireFromPool(accountId, selectedPool, amount, () => {});
      toast({
        title: "Retirement Successful!",
        description: "Your retirement action was successful.",
      });
    } catch (error) {
      console.error("Failed to retire:", error);
      toast({
        variant: "destructive",
        title: "Retirement Failed",
        description: "Your retirement action could not be completed. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Tabs defaultValue="retireFromPool" className="w-full max-w-xl">
        <TabsList className="flex divide-x divide-gray-200 rounded-lg bg-gray-100 p-1">
          <TabsTrigger value="retireFromPool" className="flex-1 uppercase">
            MINT NFT CERTIFICATE
          </TabsTrigger>
        </TabsList>
        <TabsContent value="retireFromPool">
          <Card>
            <CardHeader>
              <CardTitle>Retire Carbon Credits</CardTitle>
              <CardDescription>
                Enter the amount of carbon credits you want to retire as CO2 emissions to get your NFT certificate.
              </CardDescription>
              <p>Your Balance: {userAssets?.balance ?? 0}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <Select onValueChange={setSelectedPool}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a pool" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10001">Bio Carbon</SelectItem>
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
            </CardContent>
            <CardFooter>
              <Button onClick={handleRetire} className="font-clash uppercase">
                Retire
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}