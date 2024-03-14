import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchUserAssets } from "@/hooks/web3/assetHooks/useFetchUserAssets";
import { useAuth } from "@/hooks/context/account";
import { depositToPool } from "@/hooks/web3/dexHooks/depositToPoolExtrinsic";
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

export default function PoolTab() {
  const { account } = useAuth();
  const accountId = account?.address || "";
  const [selectedPool, setSelectedPool] = useState("");

  const poolId =
    // selectedPool === "10003" ? "0" : selectedPool === "10002" ? "0" : "";
    selectedPool === "10002" ? "1" : "";

  const { userAssets, loading: loadingAssets } = useFetchUserAssets(
    poolId,
    accountId
  ); // Use the dynamic poolId

  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      amount: "",
      pool: "",
    },
  });
  const amount = watch("amount");
  const setAmount = setValue; // Define setAmount properly

  useEffect(() => {
    if (userAssets) {
      setValue("amount", userAssets.balance.toString());
    }
  }, [userAssets, setValue]);

  const handleMaxClick = () => {
    setValue("amount", userAssets?.balance.toString() || "0");
  };
  const handleDeposit = async () => {
    if (!selectedPool || amount === "") {
      alert("Please select a pool and enter an amount.");
      return;
    }

    // set assetId here for extrinsics
    try {
      await depositToPool(accountId, selectedPool, "0", amount, () => {});
      alert("Deposit successful!");
    } catch (error) {
      console.error("Failed to deposit:", error);
      alert("Deposit failed.");
    }
  };

  const handleWithdraw = async () => {
    if (!selectedPool || amount === "") {
      alert("Please select a pool and enter an amount.");
      return;
    }
    try {
      await retireFromPool(accountId, selectedPool, amount, () => {});
      alert("Withdrawal successful!");
    } catch (error) {
      console.error("Failed to withdraw:", error);
      alert("Withdrawal failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Tabs defaultValue="addToPool" className="w-full max-w-xl">
        <TabsList className="flex divide-x divide-gray-200 rounded-lg bg-gray-100 p-1">
          <TabsTrigger value="addToPool" className="flex-1 uppercase">
            Add to Pool
          </TabsTrigger>
          <TabsTrigger value="retireFromPool" className="flex-1 uppercase">
            Withdraw from Pool
          </TabsTrigger>
        </TabsList>

        <TabsContent value="addToPool">
          <Card>
            <CardHeader>
              <CardTitle>Add to Pool</CardTitle>
              <CardDescription>
                Enter the amount of carbon credits you want to add to the pool
                for sale.
              </CardDescription>
              <>
                {loadingAssets ? (
                  <p>Loading assets...</p>
                ) : (
                  <p>Your Balance: {userAssets?.balance ?? 0}</p>
                )}
              </>
            </CardHeader>
            <CardContent className="space-y-2">
              <Select onValueChange={setSelectedPool}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a pool" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10002">Gold Standard</SelectItem>
                  {/* <SelectItem value="10002">Verra</SelectItem> */}
                </SelectContent>
              </Select>

              <label htmlFor="depositAmount">Amount to Deposit</label>
              <Input
                id="depositAmount"
                type="number"
                value={amount}
                onChange={(e) => setAmount("amount", e.target.value)} // Use setAmount correctly
                min="0"
              />
            </CardContent>
            <CardFooter>
              <Button onClick={handleDeposit} className="font-clash uppercase">
                Add to Pool
              </Button>
              <Button type="button" onClick={handleMaxClick}>
                Max
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="retireFromPool">
          <Card>
            <CardHeader>
              <CardTitle>Withdraw Carbon Credits</CardTitle>
              <CardDescription>
                Enter the amount of carbon credits you want to withdraw from the
                pool.
              </CardDescription>
              <p>Your Balance: {userAssets?.balance ?? 0}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <Select onValueChange={setSelectedPool}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a pool" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10002">Gold Standard</SelectItem>
                  {/* <SelectItem value="10002">Verra</SelectItem> */}
                </SelectContent>
              </Select>
              <Label htmlFor="withdrawAmount">Amount</Label>

              <Input
                id="withdrawAmount"
                type="number"
                value={amount}
                onChange={(e) => setAmount("amount", e.target.value)} // Use setAmount correctly
                min="0"
              />
            </CardContent>
            <CardFooter>
              <Button onClick={handleWithdraw} className="font-clash uppercase">
                Withdraw
              </Button>
              <Button type="button" onClick={handleMaxClick}>
                Max
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
