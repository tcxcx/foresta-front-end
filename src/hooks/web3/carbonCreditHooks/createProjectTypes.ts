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
  NoPoverty = "No Poverty",
  ZeroHunger = "Zero Hunger",
  GoodHealthAndWellBeing = "Good Health And WellBeing",
  QualityEducation = "Quality Education",
  GenderEquality = "Gender Equality",
  CleanWaterAndSanitation = "Clean Water And Sanitation",
  AffordableAndCleanEnergy = "Affordable And Clean Energy",
  DecentWorkAndEconomicGrowth = "Decent Work And Economic Growth",
  IndustryInnovationAndInfrastructure = "Industry Innovation And Infrastructure",
  ReducedInequalities = "Reduced Inequalities",
  SustainableCitiesAndCommunities = "Sustainable Cities And Communities",
  ResponsibleConsumptionAndProduction = "Responsible Consumption And Production",
  ClimateAction = "Climate Action",
  LifeBelowWater = "Life Below Water",
  LifeOnLand = "Life On Land",
  PeaceJusticeAndStrongInstitutions = "Peace Justice And Strong Institutions",
  PartnershipsForTheGoals = "Partnerships For The Goals",
}

export interface SDGDetails {
  sdgType: SdgDetails;
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
