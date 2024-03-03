import { object, string, array, number, boolean, optional } from 'zod';

// This schema will validate the input for creating a new project. Based on the provided Rust code for the create_project function, the required fields can include project name, description, location, images, videos, documents, registry details, SDG details, royalties, batch groups, and project type.

export const createProjectSchema = object({
  name: string().min(1, "Project name is required"),
  description: string().min(1, "Project description is required"),
  location: string().min(1, "Project location is required"),
  images: array(string()).optional(),
  videos: array(string()).optional(),
  documents: array(string()).optional(),
  registryDetails: array(object({
    registry: string(),
    details: string(),
  })).optional(),
  sdgDetails: array(string()).optional(),
  royalties: object({
    recipient: string(),
    percentage: number(),
  }).optional(),
  batchGroups: array(object({
    name: string(),
    totalSupply: number(),
    assetId: optional(string()),
    batches: array(object({
      name: string(),
      totalSupply: number(),
      minted: number(),
      retired: number(),
      issuanceYear: number(),
    })),
  })),
  projectType: optional(string()),
});


// This schema validates input for minting carbon credits for an approved project.

export const mintCarbonCreditsSchema = object({
    projectId: string(),
    groupId: string(),
    amountToMint: number(),
    listToMarketplace: boolean(),
  });
  

//   Retire Carbon Credits Schema
// This schema is for retiring carbon credits, which includes specifying the amount and reason for retirement.

export const retireCarbonCreditsSchema = object({
    projectId: string(),
    groupId: string(),
    amount: number(),
    reason: optional(string()),
  });
  