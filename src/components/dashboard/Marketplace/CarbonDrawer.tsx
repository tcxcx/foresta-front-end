'use client';
import React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface CarbonDrawerProps {
  buttonText: string;
  titleText: string;
  descriptionText: string;
  decreaseText: string;
  increaseText: string;
  confirmText: string;
  cancelText: string;
  creditsText: string;
}

export const CarbonDrawer = (props: CarbonDrawerProps) => {
  const [purchaseAmount, setPurchaseAmount] = React.useState(10);

  function adjustPurchaseAmount(adjustment: number) {
    setPurchaseAmount(purchaseAmount + adjustment);
  }

  const data = [{ name: "CO2 Sequestered", mTon: purchaseAmount }];

  return (
    <Drawer>
      <DrawerTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant="default">{props.buttonText}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{props.titleText}</DrawerTitle>
            <DrawerDescription>{props.descriptionText}</DrawerDescription>
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
                <span className="sr-only">{props.decreaseText}</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {purchaseAmount}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  {props.creditsText}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => adjustPurchaseAmount(1)}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">{props.increaseText}</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button>{props.confirmText}</Button>
            <DrawerClose asChild>
              <Button variant="outline">{props.cancelText}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};