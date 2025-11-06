import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

interface MapPickerProps {
  onSelect: (lat: number, lng: number) => void;
  initialPosition: [number, number]; // tambahkan prop optional
}

const SearchField = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl: any = new (GeoSearchControl as any)({
      provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      marker: {
        icon: L.icon({
          iconUrl: '/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
      },
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: 'Cari lokasi...',
      keepResult: true,
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

const MapPicker = ({ onSelect, initialPosition }: MapPickerProps) => {
  const [position, setPosition] = useState<[number, number] | null>(
    initialPosition || null
  );

  // update marker kalau posisi awal berubah (misalnya dari data edit)
  useEffect(() => {
    if (initialPosition) setPosition(initialPosition);
  }, [initialPosition]);

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        onSelect(e.latlng.lat, e.latlng.lng);
      },
    });

    // update map view ketika posisi berubah
    useEffect(() => {
      if (position) {
        map.setView(position, 15)
      }
    }, [map]);

    return position ? (
      <Marker
        position={position}
        icon={L.divIcon({
          html: `<div style="color: blue; font-size: 24px;">📍</div>`,
          className: '',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })}
      />
    ) : null;
  };

  return (
    <MapContainer
      center={initialPosition || [-6.2, 106.816666]} // Jakarta default
      zoom={13}
      style={{ height: '400px', width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchField />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapPicker;
