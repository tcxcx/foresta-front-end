import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function CarbonDrawer() {
    const [purchaseAmount, setPurchaseAmount] = React.useState(10);

    function adjustPurchaseAmount(adjustment: number) {
      setPurchaseAmount(purchaseAmount + adjustment);
    }
  
    const data = [
      { name: "CO2 Sequestered", mTon: purchaseAmount },
    ];
  

      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="default">Purchase Credits</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Purchase Carbon Credits</DrawerTitle>
                <DrawerDescription>Select the amount of carbon credits to purchase and retire.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => adjustPurchaseAmount(-1)}
                    disabled={purchaseAmount <= 1}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease amount</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter">
                      {purchaseAmount}
                    </div>
                    <div className="text-[0.70rem] uppercase text-muted-foreground">
                      Credits
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => adjustPurchaseAmount(1)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase amount</span>
                  </Button>
                </div>
              </div>
              
              <DrawerFooter>
                <Button>Confirm Purchase</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      );
    }