// The datasets-algorithms folder contains the page for uploading datasets
// and algorithms, with a dynamic route [id] for individual dataset/algorithm
// pages.

import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusIcon } from "lucide-react";

export default function DataAlgoSubmit() {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="fixed bottom-4 right-4" variant="outline">
            <PlusIcon className="w-4 h-4 mr-2" />
            Submit to Data Lake
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-7xl">
            <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <Tabs className="w-full" defaultValue="project">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="project">
                    Submit Project Request
                  </TabsTrigger>
                  <TabsTrigger value="dataset">Upload Dataset</TabsTrigger>
                  <TabsTrigger value="algorithm">Upload Algorithm</TabsTrigger>
                </TabsList>
                <TabsContent value="project">
                  <Card>
                    <CardHeader>
                      <CardTitle>Submit Project Request</CardTitle>
                      <CardDescription>
                        Post a new project or problem statement for the DAO
                        community.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="project-title">Project Title</Label>
                        <Input
                          id="project-title"
                          placeholder="Enter a descriptive title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="project-description">
                          Project Description
                        </Label>
                        <Textarea
                          className="min-h-[150px]"
                          id="project-description"
                          placeholder="Provide a detailed description of the project or problem statement"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="project-data">
                          Type of Data or Analysis Required
                        </Label>
                        <div id="project-data">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="geospatial">
                                Geospatial Data
                              </SelectItem>
                              <SelectItem value="timeseries">
                                Time Series Data
                              </SelectItem>
                              <SelectItem value="tabular">
                                Tabular Data
                              </SelectItem>
                              <SelectItem value="nlp">
                                Natural Language Processing
                              </SelectItem>
                              <SelectItem value="vision">
                                Computer Vision
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="project-bounty">Bounty Options</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="project-bounty-usdt">
                              USDT/USDC
                            </Label>
                            <Input
                              id="project-bounty-usdt"
                              placeholder="Amount"
                              type="number"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="project-bounty-carbon">
                              Carbon Credits
                            </Label>
                            <Input
                              id="project-bounty-carbon"
                              placeholder="Amount"
                              type="number"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="project-bounty-royalty">
                              Royalty Split
                            </Label>
                            <Input
                              id="project-bounty-royalty"
                              placeholder="Percentage"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="project-files">Attach Files</Label>
                        <Input id="project-files" multiple type="file" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto">Submit Request</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="dataset">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Dataset</CardTitle>
                      <CardDescription>
                        Share your research data with the scientific community.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="dataset-title">Title</Label>
                        <Input
                          id="dataset-title"
                          placeholder="Enter dataset title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="dataset-description">Description</Label>
                        <Textarea
                          className="min-h-[150px]"
                          id="dataset-description"
                          placeholder="Describe your dataset"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="dataset-file">GIS File</Label>
                        <Input id="dataset-file" type="file" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="dataset-tags">Metadata Tags</Label>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto">Upload Dataset</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="algorithm">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Algorithm</CardTitle>
                      <CardDescription>
                        Share your AI/ML algorithms with the research community.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="algorithm-name">Algorithm Name</Label>
                        <Input
                          id="algorithm-name"
                          placeholder="Enter algorithm name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="algorithm-description">
                          Description
                        </Label>
                        <Textarea
                          className="min-h-[150px]"
                          id="algorithm-description"
                          placeholder="Describe your algorithm"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="algorithm-repo">Code Repository</Label>
                        <Input
                          id="algorithm-repo"
                          placeholder="Enter code repository link"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="algorithm-docs">Documentation</Label>
                        <Input
                          id="algorithm-docs"
                          placeholder="Enter documentation link"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="algorithm-visibility">Visibility</Label>
                        <div id="algorithm-visibility">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="project">
                                Project-specific
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="algorithm-collaboration">
                          Collaboration
                        </Label>
                        <Input
                          id="algorithm-collaboration"
                          placeholder="Enter collaborator emails"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="algorithm-nft">NFT Access</Label>
                        <Input
                          id="algorithm-nft"
                          placeholder="Enter NFT contract address"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto">Upload Algorithm</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
