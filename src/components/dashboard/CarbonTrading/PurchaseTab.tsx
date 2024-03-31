import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/context/account";
import { createBuyOrder } from "@/hooks/web3/dexHooks/useCreateBuyOrder";
import { createSellOrder } from "@/hooks/web3/dexHooks/useCreateSellOrder";
import { z } from "zod";
// import { useFetchTotalAvailableCredits } from '@/hooks/web3/assetHooks/useFetchTotalAvailableCredits'; 

function generateOrderId() {
  const timestamp = Date.now().toString();
  const randomString = Math.floor(Math.random() * 10000).toString();
  return `${timestamp}${randomString}`;
}

const SellOrderSchema = z.object({
  sellAmount: z.number().min(100, "Minimum sell amount is 100 units"),
  pricePerUnit: z.number().positive("Price per unit must be positive"),
});

export default function PurchaseTab() {
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
  const [sellAmount, setSellAmount] = useState<number>(0);
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const { account } = useAuth();
  const userAccountId = account?.address || "";

  // const { totalAvailableCredits, loading, error } = useFetchTotalAvailableCredits();


  const handleSell = async () => {
    try {
      SellOrderSchema.parse({ sellAmount, pricePerUnit });

      const assetId = 0;

      console.log("Asset ID:", assetId);
      console.log("Units:", sellAmount);
      console.log("Price Per Unit:", pricePerUnit);

      await createSellOrder(
        assetId,
        sellAmount,
        pricePerUnit,
        userAccountId,
        () => {}
      );
      alert("Sell order created successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.errors.map((err) => err.message).join("\n"));
      } else {
        console.error("Failed to create sell order:", error);
        alert("Sell order creation failed.");
      }
    }
  };

  const handlePurchase = async () => {
    if (purchaseAmount <= 0) {
      alert("Please enter a valid amount to purchase.");
      return;
    }
    try {
      // Generate unique order ID
      const orderId = generateOrderId();
      const assetId = 0;
      const units = purchaseAmount;
      const maxFee = 1;

      console.log("Order ID:", orderId);
      console.log("Asset ID:", assetId);
      console.log("Units:", units);
      console.log("Max Fee:", maxFee);

      await createBuyOrder(
        orderId,
        assetId,
        units,
        maxFee,
        userAccountId,
        () => {}
      );
      alert("Purchase successful!");
    } catch (error) {
      console.error("Failed to purchase:", error);
      alert("Purchase failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Tabs defaultValue="sell" className="w-[400px]">
        <TabsList className="flex divide-x divide-gray-200 rounded-lg bg-gray-100 p-1">
          <TabsTrigger value="sell" className="flex-1 uppercase">
            Sell Credits
          </TabsTrigger>
          <TabsTrigger value="purchase" className="flex-1 uppercase">
            Purchase Credits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sell">
          <Card>
            <CardHeader>
              <CardTitle>Sell Carbon Credits</CardTitle>
              <CardDescription>
                Enter the amount of carbon credits you want to sell and the
                price per unit.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="sellAmount">Amount</Label>
                <Input
                  id="sellAmount"
                  type="number"
                  value={sellAmount.toString()}
                  onChange={(e) => setSellAmount(parseInt(e.target.value, 10))}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="pricePerUnit">Price Per Unit</Label>
                <Input
                  id="pricePerUnit"
                  type="number"
                  value={pricePerUnit.toString()}
                  onChange={(e) =>
                    setPricePerUnit(parseInt(e.target.value, 10))
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSell} className="font-clash uppercase">
                Create Sell Order
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="purchase">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Carbon Credits</CardTitle>
              <CardDescription>
                Enter the amount of carbon credits you want to purchase.
              </CardDescription>
              <p>
                {/* Total Available Credits Across Pools: {totalAvailableCredits} */}
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="purchaseAmount">Amount</Label>
                <Input
                  id="purchaseAmount"
                  type="number"
                  value={purchaseAmount.toString()}
                  onChange={(e) =>
                    setPurchaseAmount(parseInt(e.target.value, 10))
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePurchase} className="font-clash uppercase">
                Purchase
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
