"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Select, SelectItem, SelectContent } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectFormSchema } from "@/hooks/web3/schemas/carbon-credit-zod-validation-form";
import { sdgs } from "@/lib/data/SDGs";
import { z } from "zod";
import { PlusCircledIcon } from "@radix-ui/react-icons";

type ProjectFormData = z.infer<typeof createProjectFormSchema>;

export default function SubmitProjectDialog() {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      images: [],
      videos: [],
      documents: [],
      registryDetails: [],
      sdgDetails: [],
      royalties: {
        recipient: "",
        percentage: 0,
      },
      batchGroups: [],
      projectType: "",
    },
  });
  interface RegistryDetail {
    id: string;
    registry: string;
    details: string;
  }
  const {
    fields: registryDetailsFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "registryDetails",
  });

  
  interface batchGroupCarbonDetail {
    name: string;
    totalSupply: number;
    details: string;
  }
  interface batchCarbonDetail {
    name: string;
    totalSupply: number;
    minted: number;
    retired: number;
    issuanceYear: number;
  }

  const {
    fields: batchGroupFields,
    append: appendBatchGroup,
    remove: removeBatchGroup,
  } = useFieldArray({
    control: form.control,
    name: "batchGroups",
  });

  const onSubmit = (data: ProjectFormData) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Submit Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Submit Your Conservation Project</DialogTitle>
              <DialogDescription>
                Provide project details for review and approval.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Los Lobos Natural Reserve"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public project name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us what makes your project unique."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a description about your project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormDescription>
                        Where is your project based
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* to add */}

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Images</FormLabel>
                      <FormControl>
                        <Input placeholder="Images" {...field} />
                      </FormControl>
                      <FormDescription>
                        Upload some images of your project to be displayed in
                        the Marketplace.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="videos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video</FormLabel>
                      <FormControl>
                        <Input placeholder=".mp4" {...field} />
                      </FormControl>
                      <FormDescription>
                        Add a video to show your project to the world.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="documents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Documents</FormLabel>
                      <FormControl>
                        <Input placeholder="Legal Title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Send your legal titles, certifications, assesments and
                        any other legal documents.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {registryDetailsFields.map(
                  (item: RegistryDetail, index: number) => (
                    <React.Fragment key={item.id}>
                      <FormField
                        control={form.control}
                        name={`registryDetails.${index}.registry`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registry Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Registry Name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`registryDetails.${index}.details`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registry Details</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Details" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </React.Fragment>
                  )
                )}

                <FormField
                  control={form.control}
                  name="sdgDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SDGs</FormLabel>
                      <FormControl>
                        <Input placeholder="Add SDG's" {...field} />
                      </FormControl>
                      <FormDescription>
                        Show everyone your impact.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="royalties.recipient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Share Recipient</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Recipient Address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="royalties.percentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Share Percentage</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="Percentage"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {batchGroupFields.map((batchGroup, index) => (
                  <React.Fragment key={batchGroup.id}>
                    {/* Render fields for each batchGroup */}
                    <FormField
                      control={form.control}
                      name={`batchGroups.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Batch Group Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Batch Group Name" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`batchGroups.${index}.totalSupply`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Supply</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              placeholder="Total Supply"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Dynamically render nested batches for this batchGroup */}
                    <FormLabel>Batches</FormLabel>
                    {batchGroup.batches?.map((batch, batchIndex) => (
                      <div key={batch.name}>
                        <Input
                          {...form.register(
                            `batchGroups.${index}.batches.${batchIndex}.name`
                          )}
                          placeholder="Batch Name"
                        />
                        <Input
                          type="number"
                          {...form.register(
                            `batchGroups.${index}.batches.${batchIndex}.totalSupply`
                          )}
                          placeholder="Total Supply"
                        />
                        <Input
                          type="number"
                          {...form.register(
                            `batchGroups.${index}.batches.${batchIndex}.minted`
                          )}
                          placeholder="Minted"
                        />
                        <Input
                          type="number"
                          {...form.register(
                            `batchGroups.${index}.batches.${batchIndex}.retired`
                          )}
                          placeholder="Retired"
                        />
                        <Input
                          type="number"
                          {...form.register(
                            `batchGroups.${index}.batches.${batchIndex}.issuanceYear`
                          )}
                          placeholder="Issuance Year"
                        />
                        {/* Button to remove a batch from this batchGroup */}
                      </div>
                    ))}
                    {/* Button to add a new batch to this batchGroup */}
                  </React.Fragment>
                ))}

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormDescription>
                        Where is your project based
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
