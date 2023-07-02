import { useEffect, useRef } from 'react';
import { CITY, MAP_MAPKER, MAP_MAPKER_SECOND, PLACES } from '../../constants';
import { BaseIconOptions, Icon, Marker } from 'leaflet';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

function createIcon(icon: string): BaseIconOptions {
  return {
    iconUrl: icon,
    iconSize: [30, 30],
    iconAnchor: [30, 30],
  };
}

const fabrick = new Icon(createIcon(MAP_MAPKER_SECOND));
const shop = new Icon(createIcon(MAP_MAPKER));

type MapScreenProps = {
  activeLink: number | null;
}

function MapPicture({ activeLink }: MapScreenProps): JSX.Element {
  const mapRef = useRef(null);
  const city = CITY;
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers = leaflet.layerGroup();
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      PLACES.forEach((place) => {
        const marker = new Marker({
          lat: place.location.latitude,
          lng: place.location.longitude,
        });
        marker
          .setIcon(
            (place.id === 2) ? fabrick : shop);
        if (place.id === activeLink) {
          marker.addTo(markers);
        }

      });
      markers.addTo(map);
    }
    return (() => {
      markers.clearLayers();
    });
  }, [map, city, activeLink]);

  return (
    <div className="map__wrapper" ref={mapRef} />
  );
}

export default MapPicture;
