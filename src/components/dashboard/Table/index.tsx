"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import useMarketplaceStore from "@/hooks/context/marketplaceStore";
import {
  useFetchProposalsForCollective,
  useFetchVoteDetails,
} from "@/hooks/web3/forestaCollectivesHooks/useCollectives";
import { useAccount } from "@/hooks/context/account";
import { decodeHexString } from "@/lib/hexDecode";
import useCollectiveName from "@/hooks/web3/governanceHooks/useCollectivesName";
import { userInCollective } from "@/hooks/web3/queries";
import SubmitProposalDialog from "../Governance/create-proposal-dialog";

export default function ProposalsTable() {
  const { selectedCollectiveId, liveCollectives } = useMarketplaceStore();
  const account = useAccount();
  const accountAddress = account?.address || "";
  const collectiveName = useCollectiveName(selectedCollectiveId);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    if (accountAddress && selectedCollectiveId !== null) {
      userInCollective(selectedCollectiveId, accountAddress).then(setIsMember);
    }
  }, [accountAddress, selectedCollectiveId]);

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

  const transformedData = proposals.map((proposal, index) => {
    const voteDetail = voteDetails?.details[index];
    return {
      id: proposal.voteId,
      title: decodeHexString(proposal.title),
      status: voteDetail?.status || "Deciding",
      priority: voteDetail?.priority || "Low",
      voteDetail,
    };
  });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {selectedCollectiveId !== null ? (
        <>
          <div className="flex justify-between items-center">
            <p className="font-violet">
              Name:{" "}
              <span className="font-clash">
                {collectiveName || "Loading name..."}
              </span>
            </p>
            {isMember && (
              <SubmitProposalDialog collectiveId={selectedCollectiveId} />
            )}
          </div>

          <DataTable data={transformedData} columns={columns} />
        </>
      ) : (
        <p className="font-violet">Select a collective to view its proposals</p>
      )}
    </div>
  );
}
