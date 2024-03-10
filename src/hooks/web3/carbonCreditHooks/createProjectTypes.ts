export enum ApprovalStatus {
  Pending = "Pending",
  Rejected = "Rejected",
  Approved = "Approved",
}

export enum projectType {
  AGRICULTURE_FORESTRY_AND_OTHER_LAND_USE = "Agriculture, Forestry, and Other Land Use",
  CHEMICAL_INDUSTRY = "Chemical Industry",
  ENERGY_DEMAND = "Energy Demand",
  ENERGY_DISTRIBUTION = "Energy Distribution",
  ENERGY_INDUSTRIES = "Energy Industries",
  FUGITIVE_EMISSIONS_FROM_FUELS = "Fugitive Emissions from Fuels",
  FUGITIVE_EMISSIONS_FROM_CARBONS = "Fugitive Emissions from Carbons",
  LIVESTOCK = "Livestock",
  MANUFACTURING_INDUSTRIES = "Manufacturing Industries",
  METAL_PRODUCTION = "Metal Production",
  MINING_MINERAL_PRODUCTION = "Mining and Mineral Production",
  TRANSPORT = "Transport",
  WASTE_HANDLING = "Waste Handling",
}

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
