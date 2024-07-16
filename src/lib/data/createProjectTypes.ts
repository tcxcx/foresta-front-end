
export enum ApprovalStatus {
  Pending = "Pending",
  Rejected = "Rejected",
  Approved = "Approved",
}

export enum projectType {
  AGRICULTURE_FORESTRY_AND_OTHER_LAND_USE = "AGRICULTURE_FORESTRY_AND_OTHER_LAND_USE",
  CHEMICAL_INDUSTRY = "CHEMICAL_INDUSTRY",
  ENERGY_DEMAND = "ENERGY_DEMAND",
  ENERGY_DISTRIBUTION = "ENERGY_DISTRIBUTION",
  ENERGY_INDUSTRIES = "ENERGY_INDUSTRIES",
  FUGITIVE_EMISSIONS_FROM_FUELS = "FUGITIVE_EMISSIONS_FROM_FUELS",
  FUGITIVE_EMISSIONS_FROM_CARBONS = "FUGITIVE_EMISSIONS_FROM_CARBONS",
  LIVESTOCK = "LIVESTOCK",
  MANUFACTURING_INDUSTRIES = "MANUFACTURING_INDUSTRIES",
  METAL_PRODUCTION = "METAL_PRODUCTION",
  MINING_MINERAL_PRODUCTION = "MINING_MINERAL_PRODUCTION",
  TRANSPORT = "TRANSPORT",
  WASTE_HANDLING = "WASTE_HANDLING",
}

export const projectTypeNames: Record<projectType, string> = {
  [projectType.AGRICULTURE_FORESTRY_AND_OTHER_LAND_USE]: 'Agriculture, Forestry, and Other Land Use',
  [projectType.CHEMICAL_INDUSTRY]: 'Chemical Industry',
  [projectType.ENERGY_DEMAND]: 'Energy Demand',
  [projectType.ENERGY_DISTRIBUTION]: 'Energy Distribution',
  [projectType.ENERGY_INDUSTRIES]: 'Energy Industries',
  [projectType.FUGITIVE_EMISSIONS_FROM_FUELS]: 'Fugitive Emissions from Fuels',
  [projectType.FUGITIVE_EMISSIONS_FROM_CARBONS]: 'Fugitive Emissions from Carbons',
  [projectType.LIVESTOCK]: 'Livestock',
  [projectType.MANUFACTURING_INDUSTRIES]: 'Manufacturing Industries',
  [projectType.METAL_PRODUCTION]: 'Metal Production',
  [projectType.MINING_MINERAL_PRODUCTION]: 'Mining and Mineral Production',
  [projectType.TRANSPORT]: 'Transport',
  [projectType.WASTE_HANDLING]: 'Waste Handling',
};

export enum RegNameList {
  Verra = 'Verra',
  GoldStandard = 'Gold Standard',
  AmericanCarbonRegistry = 'American Carbon Registry',
  BioCarbon = 'BioCarbon',
  ClimateActionReserve = 'Climate Action Reserve'
}

export interface RegistryDetail {
  regName: string;
  name: string;
  id: string;
  summary: string;
}

export enum SdgDetails {
  NoPoverty = "NoPoverty",
  ZeroHunger = "ZeroHunger",
  GoodHealthAndWellBeing = "GoodHealthAndWellBeing",
  QualityEducation = "QualityEducation",
  GenderEquality = "GenderEquality",
  CleanWaterAndSanitation = "CleanWaterAndSanitation",
  AffordableAndCleanEnergy = "AffordableAndCleanEnergy",
  DecentWorkAndEconomicGrowth = "DecentWorkAndEconomicGrowth",
  IndustryInnovationAndInfrastructure = "IndustryInnovationAndInfrastructure",
  ReducedInequalities = "ReducedInequalities",
  SustainableCitiesAndCommunities = "SustainableCitiesAndCommunities",
  ResponsibleConsumptionAndProduction = "ResponsibleConsumptionAndProduction",
  ClimateAction = "ClimateAction",
  LifeBelowWater = "LifeBelowWater",
  LifeOnLand = "LifeOnLand",
  PeaceJusticeAndStrongInstitutions = "PeaceJusticeAndStrongInstitutions",
  PartnershipsForTheGoals = "PartnershipsForTheGoals",
}

export interface SDGDetails {
  sdgType: SdgDetails | '';
  description: string;
  references: string[];
}

export interface ProjectDetail {
  collectiveId: number;
  originator: string;
  name: string;
  description: string;
  location: string;
  images: string[];
  videos: string[];
  documents: string[];
  registryDetails: RegistryDetail[];
  sdgDetails: SDGDetails[];
  royalties: any;
  batchGroups: any[];
  projectType: projectType;
  created: number;
  updated: number | null;
  approved: ApprovalStatus;
}

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
