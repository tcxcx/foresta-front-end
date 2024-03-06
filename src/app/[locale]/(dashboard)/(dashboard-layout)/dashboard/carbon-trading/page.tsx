"use client";
import { useState } from "react";
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

export default function CarbonTrading() {
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
  const [sellAmount, setSellAmount] = useState<number>(0);
  const [retireAmount, setRetireAmount] = useState<number>(0);

  const handlePurchase = () => {
    // Logic for purchasing carbon credits
    console.log(`Purchasing ${purchaseAmount} carbon credits...`);
  };

  const handleSell = () => {
    // Logic for selling carbon credits
    console.log(`Selling ${sellAmount} carbon credits...`);
  };

  const handleRetire = () => {
    // Logic for retiring carbon credits
    console.log(`Retiring ${retireAmount} carbon credits...`);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Tabs defaultValue="purchase" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3 font-clash">
          <TabsTrigger value="purchase" className="uppercase">
            Purchase
          </TabsTrigger>
          <TabsTrigger value="sell" className="uppercase">
            Add to Pool
          </TabsTrigger>
          <TabsTrigger value="retire" className="uppercase">
            Retire
          </TabsTrigger>
        </TabsList>
        <TabsContent value="purchase">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Carbon Credits</CardTitle>
              <CardDescription>
                Enter the amount of carbon credits you want to purchase.
              </CardDescription>
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
        <TabsContent value="sell">
          <Card>
            <CardHeader>
              <CardTitle>Add to Carbon Credits Pool</CardTitle>
              <CardDescription>
                Enter the amount of carbon credits you want to add to the pool
                for sale.
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
            </CardContent>
            <CardFooter>
              <Button onClick={handleSell} className="font-clash uppercase">
                Add to Pool
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="retire">
          <Card>
            <CardHeader>
              <CardTitle>Retire Carbon Credits</CardTitle>
              <CardDescription>
                Enter the amount of carbon credits you want to retire.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="retireAmount">Amount</Label>
                <Input
                  id="retireAmount"
                  type="number"
                  value={retireAmount.toString()}
                  onChange={(e) =>
                    setRetireAmount(parseInt(e.target.value, 10))
                  }
                />
              </div>
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
