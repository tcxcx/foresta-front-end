"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import Map, {
  NavigationControl,
  GeolocateControl,
  ViewStateChangeEvent,
  FullscreenControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapStore } from "@/hooks/context/useGeoLocation";
import Spinner from "@/components/ui/spinner";

const MapGlobe: FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: "100%", height: "100%" });
  const [isLoading, setIsLoading] = useState(true);
  const { viewport, setViewport } = useMapStore();
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const onViewportChange = useCallback((event: ViewStateChangeEvent) => {
    const viewState = event.viewState || event;
    setViewport({
      ...viewport,
      latitude: viewState.latitude,
      longitude: viewState.longitude,
      zoom: viewState.zoom,
    });
  }, [viewport, setViewport]);

  useEffect(() => {
    const currentRef = mapContainerRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width: `${width}px`, height: `${height}px` });
      }
    });

    if (currentRef) {
      resizeObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
    };
  }, []);

  if (!mapboxToken) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Spinner />
        <div className="mt-4 text-center text-xs text-clash">
          Connect Mapbox API Token to display the map.
        </div>
      </div>
    );
  }

  return (
    <div ref={mapContainerRef} className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={size}
        {...viewport}
        onMove={onViewportChange}
        onZoom={onViewportChange}
        maxZoom={20}
        minZoom={3}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      >
        <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
        <NavigationControl position="bottom-right" />
        <FullscreenControl />
      </Map>
    </div>
  );
};

export default MapGlobe;
