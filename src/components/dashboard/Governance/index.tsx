import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { ResponsivePie } from "@nivo/pie";
import { Proposal, VoteDetail } from "@/components/dashboard/Table/data/schema";
import { Frown, Landmark, Smile } from "lucide-react";
import { statuses, priorities } from "../Table/data/data";
import { castVote } from "@/hooks/web3/governanceHooks/castVote";
import { useAuth } from "@/hooks/context/account";
import { useState } from "react";
import { useVotePreference } from "@/hooks/web3/governanceHooks/getVotePreference";

interface ProposalOverviewProps {
  proposal: Proposal;
  voteDetail?: VoteDetail;
}

interface DonutpieChartProps {
  data: { id: string; value: number }[];
  colors: string[];
  className?: string;
}

export default function ProposalOverview({
  proposal,
  voteDetail,
}: ProposalOverviewProps) {
  const primaryColor = "#48BB78";
  const secondaryColor = "#F56565";

  const colors = [primaryColor, secondaryColor];

  const totalVotes = voteDetail
    ? Number(voteDetail.yesVotes) + Number(voteDetail.noVotes)
    : 0;
  const yesVotesPercentage =
    totalVotes > 0 && voteDetail
      ? (Number(voteDetail.yesVotes) / totalVotes) * 100
      : 0;
  const noVotesPercentage =
    totalVotes > 0 && voteDetail
      ? (Number(voteDetail.noVotes) / totalVotes) * 100
      : 0;
  const pieData = [
    { id: "In Favor", value: yesVotesPercentage },
    { id: "Against", value: noVotesPercentage },
  ];

  const { account } = useAuth();
  const accountId = account?.address || "";

  const [userVote, setUserVote] = useState();

  const { votePreference, loading, error } = useVotePreference(
    proposal.id,
    accountId,
    proposal.status 
  );

  console.log("This is the vote preference for the user:", votePreference);

  if (loading) {
    return <div>Loading vote preference...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleVote = (vote: boolean) => {
    if (votePreference === null) {
      castVote(accountId, proposal.id, vote);
    }
  };

  return (
    <div className="mx-auto max-w-7xl w-full p-4">
      <div className="flex flex-col gap-4">
        <div className="flex md:flex-row flex-col md:items-center items-start gap-4 justify-between">
          <div className="flex flex-col gap-1 text-left md:text-left">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Landmark className="w-6 h-6" />
                <h1 className="text-2xl font-clash tracking-tight">
                  {proposal.title}
                </h1>
              </div>
              <div className="flex tracking-wider items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {statuses.map((status) => {
                  if (status.value === proposal.status) {
                    const StatusIcon = status.icon;
                    return (
                      <div
                        key={status.value}
                        className="flex items-center gap-1"
                      >
                        <StatusIcon className="w-4 h-4 text-muted-foreground" />
                        <span>{status.label}</span>
                      </div>
                    );
                  }
                  return null;
                })}
                {priorities.map((priority) => {
                  if (priority.value === proposal.priority) {
                    const PriorityIcon = priority.icon;
                    return (
                      <div
                        key={priority.value}
                        className="flex items-center gap-1"
                      >
                        <PriorityIcon className="w-4 h-4 text-muted-foreground" />
                        <span>{priority.label}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Submitted by
              <span className="font-semibold ml-1">
                0x7a2b1bBc1a2bBc1a2b7A2B1
              </span>
              <span className="whitespace"> on </span>
              <time
                className="whitespace-nowrap"
                dateTime="2023-11-05T16:34:00Z"
              >
                November 5, 2023
              </time>
            </p>
          </div>
          <div className="text-right md:text-left">
            {proposal.status === "Deciding" ? (
              <div className="flex md:flex-row flex-col gap-4">
                <div>
                  Your current vote:
                  <strong className="font-clash">
                    {votePreference === true
                      ? " In Favor"
                      : votePreference === false
                      ? " Against"
                      : " Not voted"}
                  </strong>
                </div>
                <div>
                  Vote in progress:
                  <strong>18h 35m left</strong>
                </div>
              </div>
            ) : (
              <div>
                {proposal.status === "Passed" ? (
                  <div className="text-primary text-base lg:text-xl font-violet uppercase tracking-tight">
                    Passed
                  </div>
                ) : (
                  <div className="text-red-600 text-base lg:text-xl font-violet uppercase tracking-tight">
                    Rejected
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 w-full dark:border-gray-800">
          <h2 className="text-lg font-violet uppercase mb-2.5">Description</h2>
          <div className="text-sm font-violet leading-6 tracking-tight text-gray-500 dark:text-gray-400">
            The proposal is to upgrade the DAO to V2. This upgrade will
            introduce new features such as quadratic voting and delegation. It
            will also improve the overall security and performance of the DAO.
            The community is encouraged to review the proposal and vote
            accordingly.
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex-grow border border-gray-200 rounded-lg p-4 overflow-y-scroll custom-scrollbar dark:border-gray-800">
              <h2 className="text-lg font-violet uppercase">Chat</h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage
                      alt="Avatar"
                      className="rounded-full overflow-hidden ring-2 ring-white"
                      height="40"
                      src="/placeholder-avatar.jpg"
                      width="40"
                    />
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-clash">0x7a2b1bBc</div>
                      <time
                        className="text-xs font-violet text-gray-400"
                        dateTime="2023-11-05T16:34:00Z"
                      >
                        November 5, 2023
                      </time>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                      <p className="text-sm font-violet leading-tight">
                        I think this proposal is a great idea. The new features
                        will definitely improve the voting process and encourage
                        more participation from the community.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage
                      alt="Avatar"
                      className="rounded-full overflow-hidden ring-2 ring-white"
                      height="40"
                      src="/placeholder-avatar.jpg"
                      width="40"
                    />
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                      <p className="text-sm font-violet leading-tight">
                        What are your thoughts on this proposal? Should the DAO
                        approve the upgrade to V2?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 font-violet p-4 border border-gray-200 rounded-lg dark:border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-violet uppercase">Vote Tally</h2>
              <div className="flex space-x-4">
                {proposal.status === "Deciding" && votePreference === null && (
                  <>
                    <button
                      className="flex items-center p-2 gap-2 hover:bg-green-100"
                      onClick={() => handleVote(true)}
                    >
                      <Smile className="fill-current text-green-500 w-6 h-6" />
                      <span className="text-base font-clash tracking-tight">
                        Vote In Favor
                      </span>
                    </button>
                    <button
                      className="flex items-center p-2 gap-2 hover:bg-red-100"
                      onClick={() => handleVote(false)}
                    >
                      <Frown className="fill-current text-red-600 w-6 h-6" />
                      <span className="text-base font-clash tracking-tight">
                        Vote Against
                      </span>
                    </button>
                  </>
                )}
                {votePreference !== null && (
                  <>
                    <button
                      className={`flex items-center p-2 gap-2 ${
                        votePreference === true
                          ? "bg-green-100"
                          : "bg-gray-100 cursor-not-allowed"
                      }`}
                      disabled
                    >
                      <Smile
                        className="fill-current w-6 h-6"
                        style={{
                          color:
                            votePreference === true ? "#48BB78" : "#48BB78",
                        }}
                      />
                      <span className="text-base font-clash tracking-tight">
                        Vote In Favor
                      </span>
                    </button>
                    <button
                      className={`flex items-center p-2 gap-2 ${
                        votePreference === false
                          ? "bg-red-100"
                          : "bg-gray-100 cursor-not-allowed"
                      }`}
                      disabled
                    >
                      <Frown
                        className="fill-current w-6 h-6"
                        style={{
                          color:
                            votePreference === false ? "#F56565" : "#F56565",
                        }}
                      />
                      <span className="text-base font-clash tracking-tight">
                        Vote Against
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>
            {totalVotes > 0 ? (
              <DonutpieChart
                data={pieData}
                colors={colors}
                className="w-full aspect-square"
              />
            ) : (
              <div
                className="w-full flex justify-center items-center"
                style={{ height: "300px" }}
              >
                <p className="text-lg font-clash text-gray-600">
                  No votes tallied yet.
                </p>
              </div>
            )}
            <div className="mt-4 space-x-12 justify-start flex">
              <div className="flex space-x-2 items-center">
                <Smile className="fill-current text-green-500 md:fill-muted w-5 h-5" />
                <div className="text-sm font-medium">
                  In Favor - {yesVotesPercentage.toFixed(2)}%
                </div>
              </div>
            </div>
            <div className="space-x-2 flex items-center">
              <Frown className="fill-current text-red-600 md:fill-muted w-5 h-5" />
              <div className="text-sm font-medium">
                Against - {noVotesPercentage.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function DonutpieChart({ data, colors, className }: DonutpieChartProps) {
  return (
    <div className={className} style={{ height: "300px", width: "100%" }}>
      <ResponsivePie
        data={data}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={3}
        innerRadius={0.5}
        padAngle={0}
        borderWidth={1}
        borderColor={"#ffffff"}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={"#ffffff"}
        arcLabelsRadiusOffset={0.5}
        colors={colors}
        theme={{
          labels: {
            text: {
              fontSize: "18px",
            },
          },
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
