export interface Batch {
    name: string;
    uuid: string;
    issuanceYear: number;
    startDate: number;
    endDate: number;
    totalSupply: bigint;
    minted?: bigint;
    retired?: bigint;
  }
  
  export interface BatchGroup {
    name: string;
    uuid: string;
    assetId?: number;
    totalSupply: bigint;
    minted?: bigint;
    retired?: bigint;
    batches: Batch[];
  }
  
  export interface SDGDetail {
    sdgType: string;
    description: string;
    references: string[];
  }
  
  export interface Royalty {
    recipient: string;
    percentage: string | number;
  }
  
  export interface ProjectFormData {
    name: string;
    description: string;
    location: string;
    images?: string[];
    videos?: string[];
    documents?: string[];
    registryDetails?: { registry: string; details: string; }[];
    sdgDetails?: SDGDetail[];
    royalties?: Royalty[];
    batchGroups: BatchGroup[];
    projectType?: string;
    created?: number;
    updated?: number | null;
}
  