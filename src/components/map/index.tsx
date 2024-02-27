import { FC, useCallback } from 'react';
import Map, { NavigationControl, GeolocateControl, ViewStateChangeEvent } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import classes from './index.module.css';
import { useMapStore } from '@/hooks/useGeoLocation';

const MapGlobe: FC = () => {
  const { viewport, setViewport } = useMapStore();
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const onViewportChange = useCallback((event: ViewStateChangeEvent) => {
    const viewState = event.viewState || event;
    if ('latitude' in viewState && 'longitude' in viewState && 'zoom' in viewState) {
      setViewport({
        latitude: viewState.latitude,
        longitude: viewState.longitude,
        zoom: viewState.zoom,
      });
    }
  }, [setViewport]);
  

  if (!mapboxToken) {
    return <div>Loading...</div>;
  }

  return (
    <main className={classes.mainStyle}>
      <div className={classes.mapContainer}>
        <Map
          mapboxAccessToken={mapboxToken}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          initialViewState={viewport}
          onMove={onViewportChange}
          onZoom={onViewportChange}
          maxZoom={20}
          minZoom={3}
        >
          <GeolocateControl positionOptions={{enableHighAccuracy: true}} trackUserLocation={true} />
          <NavigationControl />
        </Map>
      </div>
    </main>
  );
};

export default MapGlobe;
