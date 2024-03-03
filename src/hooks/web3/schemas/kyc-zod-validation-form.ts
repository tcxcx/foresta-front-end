import { object, string, number, array } from 'zod';

// Schema for creating a sell order
export const createSellOrderSchema = object({
  assetId: string().min(1, "Asset ID is required."),
  units: number().min(1, "At least one unit must be sold."),
  pricePerUnit: number().min(0.01, "Price per unit must be greater than zero."),
});

// Schema for creating a buy order
export const createBuyOrderSchema = object({
  orderId: string().min(1, "Order ID is required."),
  assetId: string().min(1, "Asset ID is required."),
  units: number().min(1, "At least one unit must be purchased."),
  maxFee: number().min(0, "Maximum fee cannot be negative."),
});

// Schema for canceling a sell order
export const cancelSellOrderSchema = object({
  orderId: string().min(1, "Order ID is required."),
});

// Schema for creating a pool
export const createPoolSchema = object({
  name: string().min(1, "Pool name is required."),
  description: string().optional(),
  assetIds: array(string()).min(1, "At least one asset ID is required."),
  targetPoolSize: number().min(1, "Target pool size must be positive.").optional(),
});

// Schema for adding credits to a pool
export const addCreditsToPoolSchema = object({
  poolId: string().min(1, "Pool ID is required."),
  assetId: string().min(1, "Asset ID is required."),
  units: number().min(1, "At least one unit must be contributed."),
});
