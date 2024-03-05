"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const createProjectFormSchema = z.object({
  projectName: z.string().min(1, "Please enter a project name."),
  description: z
    .string()
    .min(1, "Please provide a description for the project."),
  location: z.string().min(1, "Project location is required."),
  // Add other fields as necessary
});

interface ProjectManager {
  id: string;
  name: string;
  email: string;
}

export function ProjectReviewDialog() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProjectFormSchema),
  });

  const [projectManagers, setProjectManagers] = useState<ProjectManager[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedManager, setSelectedManager] = useState<string>("");

  useEffect(() => {
    const fetchProjectManagers = async (): Promise<ProjectManager[]> => {
      return [
        { id: "1", name: "Manager One", email: "manager1@example.com" },
        { id: "2", name: "Manager Two", email: "manager2@example.com" },
      ];
    };

    fetchProjectManagers().then(setProjectManagers);
  }, []);

  useEffect(() => {
    const filtered = projectManagers.filter(
      (manager) =>
        manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manager.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!filtered.some((manager) => manager.id === selectedManager)) {
      setSelectedManager("");
    }
  }, [searchTerm, projectManagers, selectedManager]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-7xl w-full">
        <DialogHeader>
          <DialogTitle>Review Project Submission</DialogTitle>
          <DialogDescription>
            Assign a project manager and approve or reject the project.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <Input
              type="search"
              placeholder="Search project managers..."
              className="col-span-4 mb-4"
              value={searchTerm}
              onChange={handleSearchChange}
            />

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectManager" className="text-right">
                Project Manager
              </Label>
              <Select
                onValueChange={setSelectedManager}
                value={selectedManager}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a manager" />
                </SelectTrigger>
                <SelectContent>
                  {projectManagers
                    .filter(
                      (manager) =>
                        manager.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        manager.email
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                    .map((manager) => (
                      <SelectItem key={manager.id} value={manager.id}>
                        {manager.name} ({manager.email})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </form>

          {/* Project Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="projectName" className="text-right">
              Project Name
            </Label>
            <Input id="projectName" defaultValue="" className="col-span-3" />
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input id="description" defaultValue="" className="col-span-3" />
          </div>

          {/* Location */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input id="location" defaultValue="" className="col-span-3" />
          </div>

          {/* Royalties Recipient (Example for royalties, adjust as needed) */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="royaltiesRecipient" className="text-right">
              Royalties Recipient
            </Label>
            <Input
              id="royaltiesRecipient"
              defaultValue=""
              className="col-span-3"
            />
          </div>

          {/* Royalties Percentage */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="royaltiesPercentage" className="text-right">
              Royalties Percentage
            </Label>
            <Input
              id="royaltiesPercentage"
              type="number"
              defaultValue=""
              className="col-span-3"
            />
          </div>

          {/* SDG Details (Simplified as a single input for demonstration) */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sdgDetails" className="text-right">
              SDG Details
            </Label>
            <Input id="sdgDetails" defaultValue="" className="col-span-3" />
          </div>

          {/* Project Type */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="projectType" className="text-right">
              Project Type
            </Label>
            <Input id="projectType" defaultValue="" className="col-span-3" />
          </div>

          {/* Images, Videos, Documents (Simplified as single inputs for demonstration) */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images" className="text-right">
              Images (IPFS URL)
            </Label>
            <Input id="images" defaultValue="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="videos" className="text-right">
              Videos (IPFS URL)
            </Label>
            <Input id="videos" defaultValue="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="documents" className="text-right">
              Documents (IPFS URL)
            </Label>
            <Input id="documents" defaultValue="" className="col-span-3" />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit">Update Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
