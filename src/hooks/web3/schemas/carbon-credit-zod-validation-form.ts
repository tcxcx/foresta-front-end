import { object, string, array, number, optional } from 'zod';
import { z } from "zod"

// Enhanced schema for frontend validation with corrections
export const createProjectFormSchema = z.object({
  name: z.string().min(1, "Please enter a project name."),
  description: z.string().min(1, "Please provide a description for the project."),
  location: z.string().min(1, "Project location is required."),
  images: z.array(string()).optional().refine(images => images ? images.every(image => image.startsWith('ipfs://')) : true, {
    message: "All images must be IPFS links starting with 'ipfs://'.",
  }),
  videos: z.array(string()).optional().refine(videos => videos ? videos.every(video => video.startsWith('ipfs://')) : true, {
    message: "All videos must be IPFS links starting with 'ipfs://'.",
  }),
  documents: z.array(string()).optional().refine(docs => docs ? docs.every(doc => doc.startsWith('ipfs://')) : true, {
    message: "All documents must be IPFS links starting with 'ipfs://'.",
  }),
  registryDetails: z.array(object({
    registry: z.string().min(1, "Registry name is required."),
    details: z.string().min(1, "Registry details are required."),
  })).optional(),
  sdgDetails: z.array(string()).optional(),
  royalties: z.optional(object({
    recipient: z.string().min(1, "Royalty recipient address is required."),
    percentage: z.number().min(0, "Royalty percentage must be 0 or more.").max(100, "Royalty percentage cannot exceed 100."),
  })),
  batchGroups: z.array(object({
    name: z.string().min(1, "Batch group name is required."),
    totalSupply: z.number().min(1, "Total supply must be greater than 0."),
    batches: z.array(object({
      name: z.string().min(1, "Batch name is required."),
      totalSupply: z.number().min(1, "Total supply must be greater than 0."),
      minted: z.number().min(0, "Minted amount cannot be negative."),
      retired: z.number().min(0, "Retired amount cannot be negative."),
      issuanceYear: z.number().min(1900, "Issuance year must be after 1900.").max(new Date().getFullYear(), "Issuance year cannot be in the future."),
    })),
  })),
  projectType: z.string().optional(),
});
