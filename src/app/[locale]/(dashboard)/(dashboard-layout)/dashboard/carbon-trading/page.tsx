'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PoolTab from "@/components/dashboard/CarbonTrading/PoolTab";
import PurchaseTab from "@/components/dashboard/CarbonTrading/PurchaseTab";
import RetireTab from "@/components/dashboard/CarbonTrading/RetireTab";
export default function CarbonTrading() {

  return (
    <div className="flex justify-center items-center h-full">
      <Tabs defaultValue="purchase" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3 font-clash">
          <TabsTrigger value="purchase" className="uppercase">
            Purchase
          </TabsTrigger>
          <TabsTrigger value="pools" className="uppercase">
            Pools
          </TabsTrigger>
          <TabsTrigger value="retire" className="uppercase">
            Retire
          </TabsTrigger>
        </TabsList>
        <TabsContent value="purchase">
          <PurchaseTab />
        </TabsContent>
        <TabsContent value="pools">
          <PoolTab />
        </TabsContent>
        <TabsContent value="retire">
          <RetireTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
