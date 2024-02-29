import { create } from "zustand";

interface MapState {
  selectedLocation: { lat: number; lng: number } | null;
  locationInfo: any;
  viewport: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  setSelectedLocation: (location: { lat: number; lng: number }) => void;
  setLocationInfo: (info: any) => void;
  setViewport: (viewport: {
    latitude: number;
    longitude: number;
    zoom: number;
  }) => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedLocation: null,
  locationInfo: null,
  viewport: {
    latitude: -0.983,
    longitude: -77.817,
    zoom: 10,
  },
  setSelectedLocation: (location) =>
    set(() => ({ selectedLocation: location })),
  setLocationInfo: (info) => set(() => ({ locationInfo: info })),
  setViewport: (viewport) => set(() => ({ viewport })),
}));
