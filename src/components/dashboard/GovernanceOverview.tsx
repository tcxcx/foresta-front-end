import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProposalsTable from "@/components/dashboard/Table/index";

export default function GovernanceOverview() {
  return (
    // Adjusted the container to use flex-start instead of centering items vertically
    <div className="flex flex-col h-full w-full items-start justify-start px-4 bg-[url('/images/topography.svg')] bg-cover">
      <Tabs defaultValue="proposals" className="w-full">
        <TabsList className="mb-2 justify-start">
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="community">Community Members</TabsTrigger>
          <TabsTrigger value="environment">Environmental Data</TabsTrigger>
          <TabsTrigger value="treasury">Treasury</TabsTrigger>
        </TabsList>

        {/* Gradient box that contains the TabsContent */}
          <TabsContent value="proposals">
            <ProposalsTable />
          </TabsContent>
          <TabsContent value="community">
            View community member data here.
          </TabsContent>
          <TabsContent value="environment">
            View environmental data here.
          </TabsContent>
          <TabsContent value="treasury">Treasury information here.</TabsContent>
      </Tabs>
    </div>
  );
}
