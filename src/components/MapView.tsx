import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ChangingStation } from "@/data/stations";

interface MapViewProps {
  stations: ChangingStation[];
  onStationSelect: (station: ChangingStation) => void;
}

const customIcon = new Icon({
  iconUrl: "https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/baby-face-outline.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapView = ({ stations, onStationSelect }: MapViewProps) => {
  const center: [number, number] = [40.7580, -73.9855];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-card">
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => onStationSelect(station),
            }}
          >
            <Popup>
              <div className="font-body text-sm">
                <strong>{station.name}</strong>
                <br />
                ⭐ {station.rating} ({station.reviewCount})
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
