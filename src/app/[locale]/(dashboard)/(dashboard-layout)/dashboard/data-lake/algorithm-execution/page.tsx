"use client";

import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ResponsiveLine } from "@nivo/line";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import DataGallery from "@/components/data-lake/data-nft-gallery";
import { useState, useEffect } from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export default function JobScheduler() {
  const [algorithmType, setAlgorithmType] = useState("free");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [selectedDataset, setSelectedDataset] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [algorithmParams, setAlgorithmParams] = useState<AlgorithmParams>({});
  const [isRunning, setIsRunning] = useState(false);
  const [runResults, setRunResults] = useState<RunResults | null>(null);

  interface AlgorithmParams {
    [key: string]: string;
  }

  interface RunResults {
    score: number;
    output: string;
  }

  useEffect(() => {
    // Simulate run completion after 5 seconds
    if (isRunning) {
      const timer = setTimeout(() => {
        setIsRunning(false);
        setRunResults({
          score: 92,
          output: "Sample output result",
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isRunning]);

  const handleRunAlgorithm = () => {
    // Perform algorithm run logic here
    setIsRunning(true);
    setRunResults(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-muted dark:bg-background">
        <div className="container mx-auto py-8">
          <div className="inline-flex justify-between w-full mb-4">
          <h2 className="text-2xl font-bold font-clash justify-start uppercase">
            Algorithm Execution
          </h2>
          <h3 className="text-2xl font-bold font-clash justify-end text-primary text-pretty">ZkML Engine</h3>
          </div>
      
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold mb-2">
                    Select Algorithm
                  </h3>
                  <div className="justify-end text-center">
                    <Drawer>
                      <DrawerTrigger>
                        <Button variant={"link"}> Check your Data NFTs</Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerTitle>Data NFTs</DrawerTitle>
                        <DrawerDescription>
                          You can only run jobs using NFTs you own and have
                          granted &lsquo;NFT Run Access&lsquo; to.
                        </DrawerDescription>
                        <DataGallery />
                      </DrawerContent>
                    </Drawer>{" "}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <RadioGroup
                  value={algorithmType}
                  onValueChange={setAlgorithmType}
                >
                  <div className="flex items-center mb-2">
                    <RadioGroupItem value="free" id="free" />
                    <Label htmlFor="free" className="ml-2">
                      Free Algorithms
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="nft" id="nft" />
                    <Label htmlFor="nft" className="ml-2">
                      NFT Algorithms
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="mb-4">
                <Select
                  value={selectedAlgorithm}
                  onValueChange={setSelectedAlgorithm}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    {algorithmType === "free" ? (
                      <>
                        <SelectItem value="algo1">Free Algorithm 1</SelectItem>
                        <SelectItem value="algo2">Free Algorithm 2</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="nftalgo1">
                          NFT Algorithm 1
                        </SelectItem>
                        <SelectItem value="nftalgo2">
                          NFT Algorithm 2
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Configure Parameters
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedAlgorithm === "algo1" && (
                  <>
                    <Input
                      placeholder="Parameter 1"
                      value={algorithmParams.param1 || ""}
                      onChange={(e) =>
                        setAlgorithmParams({
                          ...algorithmParams,
                          param1: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Parameter 2"
                      value={algorithmParams.param2 || ""}
                      onChange={(e) =>
                        setAlgorithmParams({
                          ...algorithmParams,
                          param2: e.target.value,
                        })
                      }
                    />
                  </>
                )}
                {selectedAlgorithm === "algo2" && (
                  <>
                    <Input
                      placeholder="Parameter 3"
                      value={algorithmParams.param3 || ""}
                      onChange={(e) =>
                        setAlgorithmParams({
                          ...algorithmParams,
                          param3: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Parameter 4"
                      value={algorithmParams.param4 || ""}
                      onChange={(e) =>
                        setAlgorithmParams({
                          ...algorithmParams,
                          param4: e.target.value,
                        })
                      }
                    />
                  </>
                )}
              </div>
              <div className="mt-4">
                <Select
                  value={selectedDataset}
                  onValueChange={setSelectedDataset}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a dataset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Owned Datasets</SelectLabel>
                      <SelectItem value="dataset1">Dataset 1 (NFT)</SelectItem>
                      <SelectItem value="dataset2">Dataset 2 (NFT)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Public Datasets</SelectLabel>
                      <SelectItem value="dataset3">Dataset 3</SelectItem>
                      <SelectItem value="dataset4">Dataset 4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4">
                <Select
                  value={selectedProject}
                  onValueChange={setSelectedProject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project1">Project 1</SelectItem>
                    <SelectItem value="project2">Project 2</SelectItem>
                    <SelectItem value="project3">Project 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4">
                <Button
                  className="w-full uppercase font-clash hover:bg-primary/80 hover:animate-pulse"
                  onClick={handleRunAlgorithm}
                  disabled={isRunning}
                >
                  {isRunning ? "Running..." : "Run Algorithm"}
                </Button>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                Compute Environment
              </h3>
              <div className="mb-4">
                <RadioGroup defaultValue="cloud">
                  <div className="flex items-center mb-2">
                    <RadioGroupItem id="cloud" value="cloud" />
                    <Label className="ml-2" htmlFor="cloud">
                      Cloud
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem id="onpremise" value="onpremise" />
                    <Label className="ml-2" htmlFor="onpremise">
                      On-Premise
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Resource Allocation
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="CPU Cores" />
                  <Input placeholder="Memory (GB)" />
                  <Input placeholder="GPU Units" />
                  <Input placeholder="Storage (TB)" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Execution Status</h3>
              <div className="mb-4">
                <Progress
                  className="h-4"
                  value={isRunning ? 30 : runResults ? 100 : 0}
                />
              </div>
              <div className="flex justify-between mb-4">
                <span>Status:</span>
                <span>
                  {isRunning
                    ? "Running"
                    : runResults
                    ? "Completed"
                    : "Not Started"}
                </span>
              </div>
              {runResults ? (
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Elapsed Time:</span>
                    <span>5s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Score:</span>
                    <span>{runResults.score}%</span>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Estimated Time:</span>
                    <span>-</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Score:</span>
                    <span>-</span>
                  </div>
                </div>
              )}
              <p className="w-full">{isRunning ? "Running" : ""}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                ZK-Proof Machine Learning Environment
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                After running your job, you will obtain a ZK-proof with a score
                and output result OF your selected algorithm and datasets.
              </p>
              {runResults ? (
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Score:</span>
                      <span>{runResults.score}%</span>
                    </div>
                    <div>
                      <span>Output:</span>
                      <pre className="mt-2 p-4 bg-muted dark:bg-background rounded">
                        {runResults.output}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Algorithm Performance
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-md font-semibold mb-2">
                          Output Visualization
                        </h4>
                        <TimeseriesChart className="w-full aspect-video" />
                      </div>
                      <div>
                        <h4 className="text-md font-semibold mb-2">
                          Performance Metrics
                        </h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Metric</TableHead>
                              <TableHead>Value</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Accuracy</TableCell>
                              <TableCell>92.5%</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Precision</TableCell>
                              <TableCell>88.7%</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Recall</TableCell>
                              <TableCell>94.2%</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>F1-Score</TableCell>
                              <TableCell>91.3%</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-lg">No run results available.</p>
                  <p className="mt-2 text-gray-500">
                    Please select an algorithm, configure parameters, and run
                    the job to see the results.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TimeseriesChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "2018-01-01", y: 7 },
              { x: "2018-01-02", y: 5 },
              { x: "2018-01-03", y: 11 },
              { x: "2018-01-04", y: 9 },
              { x: "2018-01-05", y: 12 },
              { x: "2018-01-06", y: 16 },
              { x: "2018-01-07", y: 13 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "2018-01-01", y: 9 },
              { x: "2018-01-02", y: 8 },
              { x: "2018-01-03", y: 13 },
              { x: "2018-01-04", y: 6 },
              { x: "2018-01-05", y: 8 },
              { x: "2018-01-06", y: 14 },
              { x: "2018-01-07", y: 11 },
            ],
          },
        ]}
        margin={{ top: 10, right: 20, bottom: 40, left: 40 }}
        xScale={{
          type: "time",
          format: "%Y-%m-%d",
          useUTC: false,
          precision: "day",
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
          format: "%d",
          tickValues: "every 1 day",
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
