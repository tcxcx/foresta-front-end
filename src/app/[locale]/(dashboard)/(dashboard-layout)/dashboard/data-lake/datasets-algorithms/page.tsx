"use client";

import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToggleGroupItem, ToggleGroup } from "@/components/ui/toggle-group";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DataAlgoSubmit from "@/components/data-lake/submit-data-lake";
import { useState } from "react";
export default function DataMarketplace() {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="flex w-full">
      <aside className="fix w-auto h-auto flex-col border-r p-4 rounded-xl border border-stone-200 bg-white text-stone-950 shadow dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50">
        <div className="mb-4 text-lg font-semibold">Filters</div>
        <Accordion className="w-full" collapsible type="single">
          <AccordionItem value="metrics">
            <AccordionTrigger>Environmental Metrics</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="co2" />
                  CO2 Levels{"\n                            "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="forest" />
                  Forest Density{"\n                            "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="water" />
                  Water Quality{"\n                            "}
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="geography">
            <AccordionTrigger>Geographic Areas</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="africa" />
                  Africa{"\n                            "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="asia" />
                  Asia{"\n                            "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="europe" />
                  Europe{"\n                            "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="namerica" />
                  North America{"\n                            "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="samerica" />
                  South America{"\n                            "}
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="resources">
            <AccordionTrigger>Computational Resources</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="low" />
                  Low{"\n                            "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="medium" />
                  Medium{"\n                            "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="high" />
                  High{"\n                            "}
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="payment">
            <AccordionTrigger>
              Method of Payment for dMRV Verification
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="credit-card" />
                  Credit Card{"\n                            "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="bank-transfer" />
                  Bank Transfer{"\n                            "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="paypal" />
                  PayPal{"\n                            "}
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-auto flex gap-2">
          <Button className="flex-1">Apply Filters</Button>
          <Button className="flex-1" variant="outline">
            Clear Filters
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-clash uppercase">
            Datasets & Algorithms
          </div>
          <DataAlgoSubmit />
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) => setViewMode(value as string)}
          >
            <ToggleGroupItem className="flex items-center gap-2" value="grid">
              <LayoutGridIcon className="h-5 w-5" />
              Grid
            </ToggleGroupItem>
            <ToggleGroupItem className="flex items-center gap-2" value="list">
              <ListIcon className="h-5 w-5" />
              List
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="mt-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <TreesIcon className="h-6 w-6" />
                  <CardTitle>Forest Cover Dataset</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Global forest cover data from satellite imagery.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <Badge variant="outline">Forestry</Badge>
                    <Badge variant="outline">Remote Sensing</Badge>
                    <Badge variant="outline">Global</Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold">NFT Price:</span>
                    <span className="text-sm font-semibold">$5.99</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="text-sm font-semibold">
                      Input Requirements:
                    </div>
                    <ul className="list-disc pl-4 text-sm">
                      <li>Satellite imagery data</li>
                      <li>Geographic coordinates</li>
                      <li>Time period</li>
                    </ul>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Runs:</div>
                      <div className="text-sm">1,234</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Score:</div>
                      <div className="text-sm">4.7/5</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Purchase Run Access Rights</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <AtomIcon className="h-6 w-6" />
                  <CardTitle>CO2 Emissions Algorithm</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Estimate CO2 emissions from industrial activities.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <Badge variant="outline">Carbon</Badge>
                    <Badge variant="outline">Industry</Badge>
                    <Badge variant="outline">Modeling</Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold">NFT Price:</span>
                    <span className="text-sm font-semibold">$8.99</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="text-sm font-semibold">
                      Input Requirements:
                    </div>
                    <ul className="list-disc pl-4 text-sm">
                      <li>Industrial activity data</li>
                      <li>Emission factors</li>
                      <li>Geographic location</li>
                    </ul>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Runs:</div>
                      <div className="text-sm">2,567</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Score:</div>
                      <div className="text-sm">4.2/5</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Purchase Run Access Rights</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <DropletsIcon className="h-6 w-6" />
                  <CardTitle>Water Quality Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Assess water quality based on physical and chemical
                    parameters.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <Badge variant="outline">Water</Badge>
                    <Badge variant="outline">Quality</Badge>
                    <Badge variant="outline">Index</Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold">NFT Price:</span>
                    <span className="text-sm font-semibold">$7.49</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="text-sm font-semibold">
                      Input Requirements:
                    </div>
                    <ul className="list-disc pl-4 text-sm">
                      <li>Water sample data</li>
                      <li>Geographic location</li>
                      <li>Time period</li>
                    </ul>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Runs:</div>
                      <div className="text-sm">987</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Score:</div>
                      <div className="text-sm">4.5/5</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Purchase Run Access Rights</Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <ListView />
          )}
        </div>
      </main>
    </div>
  );
}

function ListView() {
  return (
    <div className="space-y-4">
      {/* List item 1 */}
      <Card>
        <div className="flex items-center gap-4 p-4">
          <div className="flex-shrink-0">
            <TreesIcon className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold">Forest Cover Dataset</div>
            <p className="text-sm text-muted-foreground">
              Global forest cover data from satellite imagery.
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              <Badge variant="outline">Forestry</Badge>
              <Badge variant="outline">Remote Sensing</Badge>
              <Badge variant="outline">Global</Badge>
            </div>
          </div>
          <div className="text-sm font-semibold">$5.99</div>
        </div>
        <CardFooter className="flex justify-end">
          <Button>Purchase Run Access Rights</Button>
        </CardFooter>
      </Card>
      {/* List item 2 */}
      <Card>
        <div className="flex items-center gap-4 p-4">
          <div className="flex-shrink-0">
            <AtomIcon className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold">CO2 Emissions Algorithm</div>
            <p className="text-sm text-muted-foreground">
              Estimate CO2 emissions from industrial activities.
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              <Badge variant="outline">Carbon</Badge>
              <Badge variant="outline">Industry</Badge>
              <Badge variant="outline">Modeling</Badge>
            </div>
          </div>
          <div className="text-sm font-semibold">$8.99</div>
        </div>
        <CardFooter className="flex justify-end">
          <Button>Purchase Run Access Rights</Button>
        </CardFooter>
      </Card>
      {/* List item 3 */}
      <Card>
        <div className="flex items-center gap-4 p-4">
          <div className="flex-shrink-0">
            <DropletsIcon className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold">Water Quality Index</div>
            <p className="text-sm text-muted-foreground">
              Assess water quality based on physical and chemical parameters.
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              <Badge variant="outline">Water</Badge>
              <Badge variant="outline">Quality</Badge>
              <Badge variant="outline">Index</Badge>
            </div>
          </div>
          <div className="text-sm font-semibold">$7.49</div>
        </div>
        <CardFooter className="flex justify-end">
          <Button>Purchase Run Access Rights</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function AtomIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="1" />
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
    </svg>
  );
}

function DropletsIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
    </svg>
  );
}

function LayoutGridIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function ListIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
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
