"use client";
import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import useMarketplaceStore from "@/hooks/context/marketplaceStore";
import {
  useFetchProposalsForCollective,
  useFetchVoteDetails,
} from "@/hooks/web3/forestaCollectivesHooks/useCollectives";
import { useAccount } from "@/hooks/context/account";
import { decodeHexString } from "@/lib/hexDecode";

export default function ProposalsTable() {
  const { selectedCollectiveId } = useMarketplaceStore();
  const account = useAccount();
  const accountAddress = account?.address || "";
  console.log("selectedCollectiveId in ProposalsTable:", selectedCollectiveId);

  const {
    proposals,
    loading: loadingProposals,
    error: errorProposals,
  } = useFetchProposalsForCollective(selectedCollectiveId || 0);

  const {
    voteDetails,
    loading: loadingVoteDetails,
    error: errorVoteDetails,
  } = useFetchVoteDetails(selectedCollectiveId || 0, accountAddress);

  if (loadingProposals || loadingVoteDetails) {
    return <div>Loading...</div>;
  }

  if (errorProposals || errorVoteDetails) {
    return (
      <div>Error: {errorProposals?.message || errorVoteDetails?.message}</div>
    );
  }

  console.log("proposals:", proposals);
  console.log("voteDetails:", voteDetails);

  const transformedData = proposals.map((proposal) => {
    const voteDetail = voteDetails?.details;
    return {
      id: proposal.voteId,
      title: decodeHexString(proposal.title),
      status: voteDetail?.status || "Deciding",
      priority: voteDetail?.priority || "Low",
    };
  });

  console.log("transformedData:", transformedData);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {selectedCollectiveId !== null && selectedCollectiveId !== undefined ? (
        <DataTable data={transformedData} columns={columns} />
      ) : (
        <div>Select a collective to view its proposals</div>
      )}
    </div>
  );
}