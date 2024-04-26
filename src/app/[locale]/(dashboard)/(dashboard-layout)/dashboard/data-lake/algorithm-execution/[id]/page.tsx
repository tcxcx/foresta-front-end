// The algorithm-execution folder contains a dynamic route [id] for individual algorithm execution
//  and scoring pages.

import { Link } from "next-view-transitions"
import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, SelectLabel, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ResponsiveLine } from "@nivo/line"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
        <div className="flex items-center">
          <CloudIcon className="w-6 h-6 mr-2" />
          <h1 className="text-xl font-bold">Climate AI Data Lake</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link className="hover:text-gray-300" href="#">
                Algorithms
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" href="#">
                Projects
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" href="#">
                Data
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Button size="sm" variant="secondary">
            Connect Wallet
          </Button>
        </div>
      </header>
      <main className="flex-1 bg-gray-100">
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold mb-4">Compute Job Submission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Select Algorithm</h3>
              <div className="mb-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Owned Algorithms</SelectLabel>
                      <SelectItem value="algorithm1">Algorithm 1 (NFT)</SelectItem>
                      <SelectItem value="algorithm2">Algorithm 2 (NFT)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Public Algorithms</SelectLabel>
                      <SelectItem value="algorithm3">Algorithm 3</SelectItem>
                      <SelectItem value="algorithm4">Algorithm 4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <h3 className="text-lg font-semibold mb-2">Configure Parameters</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Parameter 1" />
                <Input placeholder="Parameter 2" />
                <Input placeholder="Parameter 3" />
                <Input placeholder="Parameter 4" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Compute Environment</h3>
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
                <h3 className="text-lg font-semibold mb-2">Resource Allocation</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="CPU Cores" />
                  <Input placeholder="Memory (GB)" />
                  <Input placeholder="GPU Units" />
                  <Input placeholder="Storage (TB)" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Job Submission</h3>
              <div className="mb-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>My Projects</SelectLabel>
                      <SelectItem value="project1">Project 1</SelectItem>
                      <SelectItem value="project2">Project 2</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Public Projects</SelectLabel>
                      <SelectItem value="project3">Project 3</SelectItem>
                      <SelectItem value="project4">Project 4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a dataset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>My Datasets</SelectLabel>
                      <SelectItem value="dataset1">Dataset 1</SelectItem>
                      <SelectItem value="dataset2">Dataset 2</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Public Datasets</SelectLabel>
                      <SelectItem value="dataset3">Dataset 3</SelectItem>
                      <SelectItem value="dataset4">Dataset 4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Submit Job</Button>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Job Monitoring</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a job" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Running Jobs</SelectLabel>
                      <SelectItem value="job1">Job 1</SelectItem>
                      <SelectItem value="job2">Job 2</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Completed Jobs</SelectLabel>
                      <SelectItem value="job3">Job 3</SelectItem>
                      <SelectItem value="job4">Job 4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <Progress className="h-4" value={30} />
              </div>
              <div className="flex justify-between mb-4">
                <span>Elapsed Time:</span>
                <span>1h 23m</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Estimated Remaining:</span>
                <span>2h 47m</span>
              </div>
              <Button className="w-full" disabled>
                Job Running
              </Button>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Algorithm Performance</h3>
                <div className="flex items-center">
                  <span className="mr-2">Score:</span>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                    <span className="ml-1 text-lg font-bold">4.8</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-semibold mb-2">Output Visualization</h4>
                  <TimeseriesChart className="w-full aspect-video" />
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-2">Performance Metrics</h4>
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
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Algorithm Interpretation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-semibold mb-2">Algorithm Overview</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This algorithm is designed to analyze climate data and provide insights into various aspects of
                      climate change, such as temperature trends, precipitation patterns, and greenhouse gas emissions.
                      It utilizes advanced machine learning techniques and incorporates domain-specific knowledge to
                      ensure accurate and reliable results.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                      <li>Trend analysis for temperature, precipitation, and sea level rise</li>
                      <li>Greenhouse gas emission modeling and forecasting</li>
                      <li>Integration of satellite data and ground-based observations</li>
                      <li>Scenario analysis for climate change mitigation and adaptation strategies</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">dMRV Compliance</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-md font-semibold mb-2">dMRV Score</h4>
                    <div className="flex items-center">
                      <StarIcon className="w-6 h-6 fill-yellow-500" />
                      <StarIcon className="w-6 h-6 fill-yellow-500" />
                      <StarIcon className="w-6 h-6 fill-yellow-500" />
                      <StarIcon className="w-6 h-6 fill-yellow-500" />
                      <StarIcon className="w-6 h-6 fill-muted stroke-muted-foreground" />
                      <span className="ml-2 text-lg font-bold">4.2</span>
                    </div>
                  </div>
                  <div>
                    <Badge className="text-sm" variant="default">
                      dMRV Certified
                    </Badge>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  This algorithm has been evaluated and certified for compliance with the digital Monitoring, Reporting,
                  and Verification (dMRV) standards set by the Intergovernmental Panel on Climate Change (IPCC). The
                  dMRV score reflects the algorithm&apos;s ability to provide transparent, accurate, and verifiable results
                  for climate-related data and analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>© Climate AI Data Lake</p>
      </footer>
    </div>
  )
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
  )
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
  )
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
  )
}
