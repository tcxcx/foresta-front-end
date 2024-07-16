import { create } from 'zustand';

export interface RetirementData {
    account: string;
    retireData: {
      name: string;
      uuid: string;
      issuanceYear: number;
      count: number;
    }[];
    timestamp: number;
    count: number;
    reason: string;
    ipfsHash: string[];
    ipnsLink: string[];
    imageLink?: string[];
  }
  
  interface RetirementStoreState {
    selectedRetirement: RetirementData | null;
    setSelectedRetirement: (retirementData: RetirementData) => void;
  }
  
  const useRetirementStore = create<RetirementStoreState>((set) => ({
    selectedRetirement: null,
    setSelectedRetirement: (retirementData) => set({ selectedRetirement: retirementData })
  }));
  
  export default useRetirementStore;
