import { create } from 'zustand';

export interface CollectiveInfo {
  collectiveId: number;
  name: string;
  status: string;
  liveProjects: boolean;
}

export interface ProjectDetail {
  collectiveId: number;
  name: string;
  approved: string;
}

export interface MarketplaceState {
  selectedCollectiveId: number | null;
  liveCollectives: CollectiveInfo[];
  selectCollective: (id: number) => void;
  loadLiveCollectives: (collectives: CollectiveInfo[]) => void;
}
const useMarketplaceStore = create<MarketplaceState>((set) => ({
  selectedCollectiveId: null,
  liveCollectives: [],
  selectCollective: (collectiveId: number) =>
    set((state) => ({ ...state, selectedCollectiveId: collectiveId })),
  loadLiveCollectives: (collectives: CollectiveInfo[]) =>
    set((state) => ({ ...state, liveCollectives: collectives })),
}));


export default useMarketplaceStore;
