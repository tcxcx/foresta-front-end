"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";

import { useAccount } from "@/hooks/context/account";
import { useCreateProposal } from "@/hooks/web3/forestaCollectivesHooks/useCreateProposal";
import { PlusCircledIcon } from "@radix-ui/react-icons";

// Define the schema using zod for validation
const proposalCategoryEnum = z.enum([
  "LandManagementAndRehabilitation",
  "WildlifeProtection",
  "CommunityDevelopment",
  "ResearchAndMonitoring",
  "CarbonCreditProjects",
  "ResourceAllocation",
  "PolicyAndGovernance",
  "TechnologyAndInnovation",
  "CommunityEngagement",
  "SustainablePractices",
  "PartnershipsAndCollaborations",
  "LegalAndRights",
]);

const priorityEnum = z.enum(["Low", "Medium", "High"]);

const createProposalSchema = z.object({
  collectiveId: z.number(),
  title: z.string().min(1, "Title is required"),
  proposalHash: z.string().min(1, "Proposal hash is required"),
  category: proposalCategoryEnum,
  priority: priorityEnum,
});

interface SubmitProposalForm {
  collectiveId: number;
  title: string;
  proposalHash: string;
  category: typeof proposalCategoryEnum._type;
  priority: typeof priorityEnum._type;
}

interface SubmitProposalDialogProps {
  collectiveId: number;
}

export default function SubmitProposalDialog({
  collectiveId,
}: SubmitProposalDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "LandManagementAndRehabilitation"
  );
  const [selectedPriority, setSelectedPriority] = useState<string>("Low");

  const account = useAccount();
  const { createProposal, loading, error } = useCreateProposal();
  const { register, handleSubmit, reset } = useForm<SubmitProposalForm>({
    resolver: zodResolver(createProposalSchema),
    defaultValues: {
      collectiveId,
      title: "",
      proposalHash: "",
      category: "LandManagementAndRehabilitation",
      priority: "Low",
    },
  });

  const onSubmit = async (data: SubmitProposalForm) => {
    data.category = selectedCategory as typeof proposalCategoryEnum._type;
    data.priority = selectedPriority as typeof priorityEnum._type;

    if (!account) {
      alert("No account found. Please connect your wallet.");
      return;
    }

    try {
      await createProposal(
        data.collectiveId,
        data.title,
        data.proposalHash,
        data.category,
        data.priority,
        account.address
      );
      alert("Proposal submitted successfully!");
      reset();
    } catch (error) {
      alert(
        `Failed to submit proposal: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={loading}>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Create Proposal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create New Proposal</DialogTitle>
        <DialogDescription>
          Fill in the details to submit a new proposal to the collective.
        </DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Column 1 */}

            <div className="space-y-2">
              <Label htmlFor="title">Proposal Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter the title of the proposal"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposalHash">Proposal Hash</Label>
              <Input
                id="proposalHash"
                {...register("proposalHash")}
                placeholder="Unique hash for the proposal"
                disabled={loading}
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={setSelectedCategory}
                value={selectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(proposalCategoryEnum.options).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                onValueChange={setSelectedPriority}
                value={selectedPriority}
              >
                {" "}
                <SelectTrigger>
                  <SelectValue placeholder="Select a priority for the vote" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(priorityEnum.options).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>{" "}
          </div>

          <div className="col-span-2 flex justify-end space-x-4">
            <DialogClose>Cancel</DialogClose>

            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Proposal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
