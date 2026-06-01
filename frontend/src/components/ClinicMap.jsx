import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ClinicMap.css';

// Fix default marker icons for bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const CLINICS = [
  { name: 'HealthHub — Delhi', address: 'Connaught Place, New Delhi', phone: '+91 11-2345-6789', lat: 28.6315, lng: 77.2167 },
  { name: 'HealthHub — Mumbai', address: 'Andheri West, Mumbai', phone: '+91 22-3456-7890', lat: 19.1364, lng: 72.8296 },
  { name: 'HealthHub — Bengaluru', address: 'Koramangala, Bengaluru', phone: '+91 80-4567-8901', lat: 12.9352, lng: 77.6245 },
  { name: 'HealthHub — Chennai', address: 'T. Nagar, Chennai', phone: '+91 44-5678-9012', lat: 13.0418, lng: 80.2341 },
  { name: 'HealthHub — Kolkata', address: 'Park Street, Kolkata', phone: '+91 33-6789-0123', lat: 22.5553, lng: 88.3517 },
];

function ClinicMap() {
  return (
    <div className="clinic-map-container">
      <MapContainer center={[22.5, 78.5]} zoom={5} className="clinic-map" scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {CLINICS.map((clinic) => (
          <Marker key={clinic.name} position={[clinic.lat, clinic.lng]}>
            <Popup>
              <strong>{clinic.name}</strong>
              <br />
              {clinic.address}
              <br />
              📞 {clinic.phone}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default ClinicMap;
