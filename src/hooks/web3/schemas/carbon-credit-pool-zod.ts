import { object, string, number, optional, array } from 'zod';

// Schema for creating a new CarbonCredits pool
export const createPoolSchema = object({
  id: string(),
  admin: string(),
  config: object({
    registryList: array(string()).optional(),
    projectIdList: array(string()).optional(),
  }),
  maxLimit: optional(number()),
  assetSymbol: string(),
});

// Schema for depositing CarbonCredits into a pool
export const depositSchema = object({
  poolId: string(),
  assetId: string(),
  amount: number(),
});

// Schema for retiring pool tokens
export const retireSchema = object({
  poolId: string(),
  amount: number(),
});
