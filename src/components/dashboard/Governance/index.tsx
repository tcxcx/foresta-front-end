import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { ResponsivePie } from "@nivo/pie";
import { Proposal, VoteDetail } from "@/components/dashboard/Table/data/schema";
import { Landmark } from "lucide-react";
import { statuses, priorities } from "../Table/data/data";
interface ProposalOverviewProps {
  proposal: Proposal;
}

interface DonutpieChartProps {
  data: { id: string; value: number }[];
  colors: string[];
  className?: string;
}

export default function ProposalOverview({ proposal }: ProposalOverviewProps) {
  const primaryColor = {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  };
  const secondaryColor = {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  };

  const pieData = [
    { id: "In Favor", value: 70 },
    { id: "Against", value: 30 },
  ];

  return (
    <div className="mx-auto max-w-7xl w-full p-4">
      <div className="flex flex-col gap-4">
        <div className="flex md:flex-row flex-col md:items-center items-start gap-4 justify-between">
          <div className="flex flex-col gap-1 text-left md:text-left">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Landmark className="w-6 h-6" />
                <h1 className="text-2xl font-semibold tracking-tight">
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
            {proposal.status === 'Deciding' ? (
              <div className="flex md:flex-row flex-col gap-4">
                <div>
                  Your current vote: <strong>In Favor</strong>
                </div>
                <div>
                  Vote in progress:
                  <strong>18h 35m left</strong>
                </div>
              </div>
            ) : (
              <div>
                {proposal.status === 'Passed' ? (

                  <div className="text-primary text-base lg:text-xl font-violet uppercase tracking-tight">Passed</div>
                ) : (
                  <div className="text-red-600 text-base lg:text-xl font-violet uppercase tracking-tight">Rejected</div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 w-full dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-2.5">Description</h2>
          <div className="text-sm font-medium leading-6 tracking-tight text-gray-500 dark:text-gray-400">
            The proposal is to upgrade the DAO to V2. This upgrade will
            introduce new features such as quadratic voting and delegation. It
            will also improve the overall security and performance of the DAO.
            The community is encouraged to review the proposal and vote
            accordingly.
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <div className="border border-gray-200 rounded-lg p-4 w-full overflow-y-scroll custom-scrollbar dark:border-gray-800 h-60">
              <h2 className="text-lg font-semibold">Chat</h2>
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
                      <div className="text-sm font-medium">0x7a2b1bBc</div>
                      <time
                        className="text-xs font-normal text-gray-400"
                        dateTime="2023-11-05T16:34:00Z"
                      >
                        November 5, 2023
                      </time>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                      <p className="text-sm font-medium leading-tight">
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
                      <p className="text-sm font-medium leading-tight">
                        What are your thoughts on this proposal? Should the DAO
                        approve the upgrade to V2?
                      </p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg dark:border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Vote Tally</h2>
              <div className="flex space-x-4">
                <HeartIcon className="fill-current text-green-500 md:fill-muted w-6 h-6" />
                <HeartIcon className="fill-current text-red-600 md:fill-muted w-6 h-6" />
              </div>
            </div>
            <DonutpieChart
              data={pieData}
              colors={[primaryColor.DEFAULT, secondaryColor.DEFAULT]}
              className="w-full aspect-[4/3] mx-auto"
            />
            <div className="mt-4 space-x-12 justify-start flex">
              <div className="flex space-x-2 items-center">
                <HeartIcon className="fill-current text-green-500 md:fill-muted w-5 h-5" />
                <div className="text-sm font-medium">In Favor - 70%</div>
              </div>
            </div>
            <div className="space-x-12 flex items-center">
              <HeartOffIcon className="fill-current text-red-600 md:fill-muted w-5 h-5" />
              <div className="text-sm font-medium">Against - 30%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DonutpieChart({
  data,
  colors,
  className,
  ...props
}: DonutpieChartProps) {
  return (
    <div {...props}>
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

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function HeartOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M16.5 16.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5a5.5 5.5 0 0 1 2.14-4.35" />
      <path d="M8.76 3.1c1.15.22 2.13.78 3.24 1.9 1.5-1.5 2.74-2 4.5-2A5.5 5.5 0 0 1 22 8.5c0 2.12-1.3 3.78-2.67 5.17" />
    </svg>
  );
}
