import { object, string, array, number, optional } from 'zod';
import { z } from "zod"
import { projectType, RegNameList, SdgDetails } from '@/lib/data/createProjectTypes';
// Enhanced schema for frontend validation with corrections
const RegistryDetailSchema = z.object({
  regName: z.nativeEnum(RegNameList),
  name: z.string(),
  id: z.string(),
  summary: z.string(),
});

const RoyaltyDetailSchema = z.object({
  recipient: z.string().min(1, "Royalty recipient address is required."),
  percentage: z.number().min(0, "Royalty percentage must be 0 or more.").max(100, "Royalty percentage cannot exceed 100."),
});

const SDGDetailSchema = z.object({
  sdgType: z.nativeEnum(SdgDetails),
  description: z.string(),
  references: z.array(z.string()),
});

const BatchSchema = z.object({
  name: z.string(),
  uuid: z.string(),
  issuanceYear: z.number(),
  startDate: z.number(),
  endDate: z.number(),
  totalSupply: z.bigint(),
  minted: z.bigint(),
  retired: z.bigint(),
});


const BatchGroupSchema = z.object({
  name: z.string(),
  uuid: z.string(),
  assetId: z.number(),
  totalSupply: z.bigint(),
  minted: z.bigint(),
  retired: z.bigint(),
  batches: z.array(BatchSchema),
});


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
  sdgDetails: z.array(SDGDetailSchema).optional(),
  royalties: z.optional(z.array(RoyaltyDetailSchema)),
  batchGroups: z.array(BatchGroupSchema),
  projectType: z.nativeEnum(projectType).optional(),
  created: z.number(),
  updated: z.number().optional().nullable(),
});

export type ProjectFormData = z.infer<typeof createProjectFormSchema>;
