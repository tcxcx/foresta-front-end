import { object, string, array, number, optional } from 'zod';

// Enhanced schema for creating a pool form validation on the frontend
export const createPoolFormSchema = object({
    id: string().min(1, "Pool ID is required."),
    admin: string().min(1, "Admin account is required."),
    config: object({
      registryList: array(string()).optional().refine( data => data ? data.every(item => item.length > 0) : true, {
        message: "Each registry name must be non-empty.",
      }),
      projectIdList: array(string()).optional().refine(data => data ? data.every(item => item.length > 0) : true, {
        message: "Each project ID must be non-empty.",
      }),
    }),
    maxLimit: optional(number().min(1, "Max limit must be at least 1.").max(10000, "Max limit too high.")),
    assetSymbol: string().min(1, "Asset symbol is required."),
  });
  
  // Schema for deposit form validation
  export const depositFormSchema = object({
    poolId: string().min(1, "Pool ID is required."),
    assetId: string().min(1, "Asset ID is required."),
    amount: number().min(0.01, "Amount must be greater than zero."),
  });
  
  // Schema for retire form validation
  export const retireFormSchema = object({
    poolId: string().min(1, "Pool ID is required."),
    amount: number().min(0.01, "Amount must be greater than zero."),
  });
  