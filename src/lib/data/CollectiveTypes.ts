import { ApprovalStatus, RegistryDetail, SDGDetails, projectType } from "./createProjectTypes";

export interface CollectiveInfo {
    collectiveId: number;
    name: string;
    status: string;
    liveProjects: boolean;
  }

  export interface CollectiveName {
    name: string;
    hash_: string;
  }
  

  export interface ProjectDetail {
    approved: ApprovalStatus;
    batchGroups: any;
    collectiveId: number;
    created: number;
    description: string;
    documents: string[];
    images: string[];
    location: string;
    name: string;
    originator: string;
    projectType: projectType;
    registryDetails: RegistryDetail[];
    royalties: any;
    sdgDetails: SDGDetails[];
    updated: number | null;
    videos: string[];
  }