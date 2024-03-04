import { object, string, number, optional } from 'zod';

export const createSellOrderSchema = object({
  assetId: string().min(1, "Asset ID is required."),
  units: number().min(1, "Units must be greater than zero."),
  pricePerUnit: number().min(1, "Price per unit must be greater than zero."),
});

export const cancelSellOrderSchema = object({
  orderId: string().min(1, "Order ID is required."),
});

export const buyOrderSchema = object({
  orderId: string().min(1, "Order ID is required."),
  assetId: string().min(1, "Asset ID is required."),
  units: number().min(1, "Units must be greater than zero."),
  maxFee: optional(number().min(1, "Max fee must be greater than zero.")),
});
