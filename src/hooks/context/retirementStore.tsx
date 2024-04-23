import { create } from 'zustand';

interface RetirementState {
  retirementStatus: string;
  setRetirementStatus: (status: string) => void;
  isRetiring: boolean;
  setIsRetiring: (isRetiring: boolean) => void;
  retirementError: string;
  setRetirementError: (error: string) => void;
  certificateLink: string;
  setCertificateLink: (link: string) => void;
}

const useRetirementStore = create<RetirementState>((set) => ({
  retirementStatus: '',
  setRetirementStatus: (status) => set({ retirementStatus: status }),
  isRetiring: false,
  setIsRetiring: (isRetiring) => set({ isRetiring }),
  retirementError: '',
  setRetirementError: (error) => set({ retirementError: error }),
  certificateLink: '',
  setCertificateLink: (link) => set({ certificateLink: link }),
}));

export default useRetirementStore;
