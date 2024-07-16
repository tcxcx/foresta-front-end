import { create } from 'zustand';

interface RetirementState {
  retirementStatus: string;
  setRetirementStatus: (status: string) => void;
  isRetiring: boolean;
  setIsRetiring: (isRetiring: boolean) => void;
  retirementError: string;
  setRetirementError: (error: string) => void;
  cid: string;
  setCid: (cid: string) => void;
  certificateLink: string;
  setCertificateLink: (link: string) => void;
  imageLink: string;
  setImageLink: (link: string) => void;
}

const useRetirementStore = create<RetirementState>((set) => ({
  retirementStatus: '',
  setRetirementStatus: (status) => set({ retirementStatus: status }),
  isRetiring: false,
  setIsRetiring: (isRetiring) => set({ isRetiring }),
  retirementError: '',
  setRetirementError: (error) => set({ retirementError: error }),
  cid: '',
  setCid: (cid) => set({ cid }),
  certificateLink: '',
  setCertificateLink: (link) => set({ certificateLink: link }),
  imageLink: '',
  setImageLink: (link) => set({ imageLink: link }),
}));

export default useRetirementStore;
