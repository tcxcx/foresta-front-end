import { z } from "zod";
import { projectType, SdgDetails } from "../carbonCreditHooks/createProjectTypes";

export const RegistryDetailSchema = z.object({
  regName: z.string(),
  name: z.string(),
  id: z.string(),
  summary: z.string(),
});

export const SDGDetailSchema = z.object({
  sdgType: z.nativeEnum(SdgDetails),
  description: z.string(),
  references: z.array(z.string()),
});

export const BatchSchema = z.object({
  name: z.string(),
  uuid: z.string(),
  issuanceYear: z.number(),
  startDate: z.number(),
  endDate: z.number(),
  totalSupply: z.bigint(),
  minted: z.bigint(),
  retired: z.bigint(),
});

export const BatchGroupSchema = z.object({
  name: z.string(),
  uuid: z.string(),
  assetId: z.number(),
  totalSupply: z.bigint(),
  minted: z.bigint(),
  retired: z.bigint(),
  batches: z.array(BatchSchema),
});

const RoyaltyDetailSchema = z.object({
  recipient: z.string().min(1, "Royalty recipient address is required."),
  percentage: z.number().min(0, "Royalty percentage must be 0 or more.").max(100, "Royalty percentage cannot exceed 100."),
});

export const createProjectFormSchema = z.object({
  name: z.string().min(1, "Please enter a project name."),
  description: z.string().min(1, "Please provide a description for the project."),
  location: z.string().min(1, "Project location is required."),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  documents: z.array(z.string()).optional(),
  registryDetails: z.array(RegistryDetailSchema).optional(),
  sdgDetails: z.array(SDGDetailSchema).optional(),
  royalties: z.optional(z.array(RoyaltyDetailSchema)),
  batchGroups: z.array(BatchGroupSchema),
  projectType: z.nativeEnum(projectType),
  created: z.number(),
  updated: z.number().nullable(),
});
