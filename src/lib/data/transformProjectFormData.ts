import { ProjectFormData } from "./projectFormtypes";
import { v4 as uuid } from "uuid";
import { projectType as projectTypeEnum } from "@/lib/data/createProjectTypes";

const safeConvertToStringArray = (
  input: string | string[] | undefined
): string[] => {
  if (Array.isArray(input)) {
    return input;
  } else if (typeof input === "string") {
    return input.split(",").map((s) => s.trim());
  } else {
    return [];
  }
};

export const transformProjectFormData = (data: ProjectFormData) => {
  const images = safeConvertToStringArray(data.images);
  const videos = safeConvertToStringArray(data.videos);
  const documents = safeConvertToStringArray(data.documents);
  const timestamp = Date.now();

  const batchGroups = (data.batchGroups ?? []).map((group) => ({
    ...group,
    uuid: group.uuid || uuid(),
    assetId: group.assetId ?? 0,
    totalSupply: BigInt(group.totalSupply),
    minted: BigInt(group.minted ?? "0"),
    retired: BigInt(group.retired ?? "0"),
    batches: (group.batches ?? []).map((batch) => ({
      ...batch,
      totalSupply: BigInt(batch.totalSupply),
      minted: BigInt(batch.minted ?? "0"),
      retired: BigInt(batch.retired ?? "0"),
    })),
  }));

  const sdgDetails = (data.sdgDetails ?? []).map((item) => ({
    ...item,
    references: Array.isArray(item.references) 
      ? item.references
      : [],
  }));


  const royalties = (data.royalties ?? []).map((royalty) => ({
    recipient: royalty.recipient.trim(),
    percentage: parseFloat(royalty.percentage.toString()),
  }));

  return {
    ...data,
    projectType: data.projectType as keyof typeof projectTypeEnum,
    created: timestamp,
    updated: timestamp,
    images,
    videos,
    documents,
    sdgDetails,
    batchGroups,
    royalties,
  };
};
