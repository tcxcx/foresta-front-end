// The decentralized-compute folder contains the page for connecting to the decentralized compute 
// network.
'use client';

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResponsiveLine } from "@nivo/line"
import { ResponsivePie } from "@nivo/pie"
import Image from "next/image"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function DeComputeHub() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Your Node</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Machine</CardTitle>
            <CardDescription>Configure your device to contribute computing resources to the network.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>To get started, follow these simple steps:</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Download the node software:</span>
                    <Image
                      alt="Download icon"
                      className="shrink-0"
                      height="32"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "32/32",
                        objectFit: "cover",
                      }}
                      width="32"
                    />
                  </div>
                  <p className="ml-6">
                    Visit our downloads page and select the appropriate package for your operating system.
                  </p>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Install and run the software:</span>
                    <Image
                      alt="Install icon"
                      className="shrink-0"
                      height="32"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "32/32",
                        objectFit: "cover",
                      }}
                      width="32"
                    />
                  </div>
                  <p className="ml-6">
                    Follow the on-screen instructions to install and launch the node software on your machine.
                  </p>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Configure your preferences:</span>
                    <Image
                      alt="Settings icon"
                      className="shrink-0"
                      height="32"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "32/32",
                        objectFit: "cover",
                      }}
                      width="32"
                    />
                  </div>
                  <p className="ml-6">
                    Adjust your resource contribution settings, such as CPU and GPU usage, storage allocation, and
                    network bandwidth.
                  </p>
                </li>
              </ol>
              <Button>Download Node Software</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Climate Science Subnet</CardTitle>
            <CardDescription>Contribute your computing power to climate research.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Your node is currently participating in the Climate Science Subnet, helping researchers model and
                understand the impacts of climate change.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Node Performance</h3>
                  <LineChart className="w-full aspect-[4/3]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contribution Metrics</h3>
                  <PieChart className="w-full aspect-[4/3]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Node Management</h2>
          <Card>
            <CardHeader>
              <CardTitle>Connect Your Node</CardTitle>
              <CardDescription>Manage your node&apos;s participation in the network.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div>
                  <Label className="mb-2 block" htmlFor="nodeId">
                    Node ID
                  </Label>
                  <Input className="w-full" id="nodeId" placeholder="Enter your node ID" />
                </div>
                <div>
                  <Label className="mb-2 block" htmlFor="resources">
                    Computing Resources
                  </Label>
                  <Input className="w-full" id="resources" placeholder="e.g. 4 CPU, 8 GB RAM" />
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline">Connect Node</Button>
                  <Button>Disconnect Node</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Subnets</h2>
          <Card>
            <CardHeader>
              <CardTitle>Climate Science Subnet</CardTitle>
              <CardDescription>Provide compute power and contribute to climate research and earn rewards.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Node Performance</p>
                  <p className="font-semibold">92% Uptime</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rewards Earned</p>
                  <p className="font-semibold">1,234 FRST</p>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                Leave Subnet
              </Button>
            </CardContent>
          </Card>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Network Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Nodes</CardTitle>
                <CardDescription>123,456</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Computing Power</CardTitle>
                <CardDescription>9.8 PetaFLOPS</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Contributor</CardTitle>
                <CardDescription>
                  Node 0x9876543210fedcba
                  <br />
                  124,567 FRST Earned
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
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
  )
}


function PieChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props}>
      <ResponsivePie
        data={[
          { id: "Jan", value: 111 },
          { id: "Feb", value: 157 },
          { id: "Mar", value: 129 },
          { id: "Apr", value: 150 },
          { id: "May", value: 119 },
          { id: "Jun", value: 72 },
        ]}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={0}
        padAngle={0}
        borderWidth={1}
        borderColor={"#ffffff"}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={"#ffffff"}
        arcLabelsRadiusOffset={0.65}
        colors={["#2563eb"]}
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
    </svg>
  )
}
