import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import Image from "next/image";

export default function NodeComputeSettings() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Node Settings</h1>
        </div>
        <div className="grid gap-6 max-w-6xl w-full mx-auto">
          <div className="border rounded-lg overflow-hidden grid gap-4 lg:gap-px lg:bg-gray-100 dark:bg-gray-950">
            <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950">
              <div className="p-2 grid gap-1 flex-1">
                <div className="font-medium">Resource Allocation</div>
                <div className="text-gray-500 dark:text-gray-400">
                  Specify how much of your node&apos;s resources to allocate for
                  processing tasks.
                </div>
              </div>
              <Separator className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-start gap-2">
                  <span className="inline-flex w-3 h-3 bg-green-400 rounded-full translate-y-1" />
                  <div>
                    <div className="font-medium">75%</div>
                    <div className="text-gray-500 dark:text-gray-400">
                      Current Allocation
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-center gap-2">
                  <SlidersIcon className="w-4 h-4" />
                  <span>Adjust Allocation</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950">
              <div className="p-2 grid gap-1 flex-1">
                <div className="font-medium">Availability</div>
                <div className="text-gray-500 dark:text-gray-400">
                  Set your node&apos;s availability for processing tasks.
                </div>
              </div>
              <Separator className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-start gap-2">
                  <span className="inline-flex w-3 h-3 bg-yellow-400 rounded-full translate-y-1" />
                  <div>
                    <div className="font-medium">Partial</div>
                    <div className="text-gray-500 dark:text-gray-400">
                      Current Availability
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  <span>Set Schedule</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950">
              <div className="p-2 grid gap-1 flex-1">
                <div className="font-medium">Performance Thresholds</div>
                <div className="text-gray-500 dark:text-gray-400">
                  Configure the performance thresholds for your node.
                </div>
              </div>
              <Separator className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-start gap-2">
                  <span className="inline-flex w-3 h-3 bg-green-400 rounded-full translate-y-1" />
                  <div>
                    <div className="font-medium">High</div>
                    <div className="text-gray-500 dark:text-gray-400">
                      Current Threshold
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-center gap-2">
                  <GaugeIcon className="w-4 h-4" />
                  <span>Adjust Thresholds</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <Button className="flex-1" size="lg">
              <ToggleRightIcon className="w-4 h-4 mr-2" />
              Participate in Network
            </Button>
            <Button className="flex-1" size="lg" variant="outline">
              <LightbulbOffIcon className="w-4 h-4 mr-2" />
              Stop Participating
            </Button>
          </div>
          <div>
            <Card className="p-0 overflow-hidden">
              <CardHeader>
                <CardDescription className="text-sm font-medium">
                  Node Performance
                </CardDescription>
                <CardTitle className="text-2xl">Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart className="aspect-[9/4]" />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Real-Time Statistics</CardTitle>
                <CardDescription>
                  View real-time statistics and metrics related to your
                  node&apos;s performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CpuIcon className="w-4 h-4" />
                      <span>Computing Power</span>
                    </div>
                    <span className="font-medium">3.2 GHz</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ActivityIcon className="w-4 h-4" />
                      <span>Tasks Processed</span>
                    </div>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <NetworkIcon className="w-4 h-4" />
                      <span>Network Health</span>
                    </div>
                    <span className="font-medium">Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Node Activity</CardTitle>
                <CardDescription>
                  Monitor your node&apos;s activity, view historical data, and
                  generate reports.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label
                      className="text-base"
                      htmlFor="activity-period-select"
                    >
                      Activity Period
                    </Label>
                    <div id="activity-period-select">
                      <Select defaultValue="last-week">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last-day">
                            Last 24 Hours
                          </SelectItem>
                          <SelectItem value="last-week">Last 7 Days</SelectItem>
                          <SelectItem value="last-month">
                            Last 30 Days
                          </SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button>Generate Report</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Incentives and Rewards</CardTitle>
              <CardDescription>
                Track your earned tokens or credits based on your node&apos;s
                participation and contribution to the network.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CoinsIcon className="w-4 h-4" />
                    <span>Total Earned</span>
                  </div>
                  <span className="font-medium">2,345 ACN</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>Last Reward</span>
                  </div>
                  <span className="font-medium">3 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon className="w-4 h-4" />
                    <span>Estimated Earnings</span>
                  </div>
                  <span className="font-medium">150 ACN/day</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Withdraw Earnings</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function CircleDotIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CoinsIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

function CpuIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  );
}

function GaugeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function LightbulbOffIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5" />
      <path d="m2 2 20 20" />
      <path d="M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function LineChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
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
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </svg>
  );
}

function NetworkIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  );
}

function SlidersIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="2" x2="6" y1="14" y2="14" />
      <line x1="10" x2="14" y1="8" y2="8" />
      <line x1="18" x2="22" y1="16" y2="16" />
    </svg>
  );
}

function ToggleRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="12" x="2" y="6" rx="6" ry="6" />
      <circle cx="16" cy="12" r="2" />
    </svg>
  );
}

function TreesIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
      <path d="M7 16v6" />
      <path d="M13 19v3" />
      <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />
    </svg>
  );
}

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
