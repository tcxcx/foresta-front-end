import { object, string, number, array } from 'zod';

export const createBuyOrderSchema = object({
  orderId: string().min(1, "Order ID is required."),
  assetId: string().min(1, "Asset ID is required."),
  units: number().min(1, "At least one unit must be purchased."),
  maxFee: number().min(0, "Maximum fee cannot be negative."),
});

export const cancelSellOrderSchema = object({
  orderId: string().min(1, "Order ID is required."),
});

export const createPoolSchema = object({
  name: string().min(1, "Pool name is required."),
  description: string().optional(),
  assetIds: array(string()).min(1, "At least one asset ID is required."),
  targetPoolSize: number().min(1, "Target pool size must be positive.").optional(),
});

export const addCreditsToPoolSchema = object({
  poolId: string().min(1, "Pool ID is required."),
  assetId: string().min(1, "Asset ID is required."),
  units: number().min(1, "At least one unit must be contributed."),
});
