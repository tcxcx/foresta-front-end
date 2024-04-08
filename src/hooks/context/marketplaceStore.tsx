import { create } from 'zustand';

export interface CollectiveInfo {
  collectiveId: number;
  name: string;
  status: string;
  liveProjects: boolean;
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
  selectCollective: (id: number) =>
    set({ selectedCollectiveId: id }),
  loadLiveCollectives: (collectives: CollectiveInfo[]) =>
    set({ liveCollectives: collectives }),
}));

export default useMarketplaceStore;
