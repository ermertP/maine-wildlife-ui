import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from 'react-leaflet';
import type {
  Map as LeafletMap,
  LatLngExpression,
  Marker as LeafletMarker,
} from 'leaflet';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import 'leaflet/dist/leaflet.css';

//might need to change interface later
interface Location {
  lat?: number;
  lng?: number;
  coordinates?: { lat: number; lng: number };
  place_name: string;
  county: string;
}

interface Species {
  id: string;
  name: string;
  description: string;
  image_url: string;
  type: string;
  locations: Location[];
  current_status: 'Endangered' | 'Threatened';
}

// Helper to capture the Leaflet map instance
const CaptureMap: React.FC<{ onMapReady: (map: LeafletMap) => void }> = ({ onMapReady }) => {
  const map = useMap();
  useEffect(() => onMapReady(map), [map, onMapReady]);
  return null;
};

const SpeciesMap: React.FC = () => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [filter, setFilter] = useState<'Endangered' | 'Threatened'>('Endangered');
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [selectedId, setSelectedId] = useState<string>('');
  const markerRefs = useRef<Record<string, LeafletMarker>>({});

  // Fetch species payload
  useEffect(() => {
    axios.get<Species[]>('http://localhost:5000/species')
      .then(({ data }) => {
        const filtered = data.filter(s => s.current_status === filter);
        setSpecies(filtered);
        setSelectedId('');
      })
      .catch(console.error);
  }, [filter]);

  const toggleFilter = () => setFilter(prev => prev === 'Endangered' ? 'Threatened' : 'Endangered');

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const id = event.target.value;
    setSelectedId(id);
    const animal = species.find(s => s.id === id);
    if (animal && map && animal.locations.length) {
      const loc = animal.locations[0];
      const lat = loc.lat ?? loc.coordinates?.lat;
      const lng = loc.lng ?? loc.coordinates?.lng;
      if (lat != null && lng != null) {
        map.setView([lat, lng], map.getZoom());
        const marker = markerRefs.current[id];
        if (marker) marker.openPopup();
      }
    }
  };

  // Which species to show
  const displaySpecies = selectedId
    ? species.filter(s => s.id === selectedId)
    : species;

    const sortedSpecies = [...species].sort((a, b) =>
  a.name.localeCompare(b.name)
);

  return (
    <div>
      {/* Base Selections At Top View */}
      <div style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="contained" color="primary" onClick={toggleFilter}>
          Show {filter === 'Endangered' ? 'Threatened' : 'Endangered'} Species
        </Button>
        <span style={{ fontWeight: 500 }}>Currently viewing: {filter} Species</span>
        <FormControl variant="outlined" size="small" style={{ minWidth: 180 }}>
          <InputLabel id="species-select-label">Select Animal</InputLabel>
          <Select
            labelId="species-select-label"
            value={selectedId}
            label="Select Animal"
            onChange={handleSelectChange}
          >
            {sortedSpecies.map(s => (
              <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Map start */}
      <MapContainer center={[44.5, -69.2]} zoom={7} style={{ height: '100vh', width: '100%' }}>
        <CaptureMap onMapReady={setMap} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {displaySpecies.map(specie =>
          specie.locations.map((loc, idx) => {

            const lat = loc.lat ?? loc.coordinates?.lat;
            const lng = loc.lng ?? loc.coordinates?.lng;
            if (lat == null || lng == null) return null;
            const pos = [lat, lng] as LatLngExpression;

            return (
              <React.Fragment key={`${specie.id}-${idx}`}> 

                <Circle
                  center={pos}
                  radius={5000}
                  pathOptions={{ color: 'red', fillOpacity: 0.2, weight: 1 }}
                />

                {/* Pop up window in map selection */}
                <Marker
                  position={pos}
                  ref={ref => { if (ref) markerRefs.current[specie.id] = ref; }}
                >
                  <Popup>
                    <h3>{specie.name}</h3>
                    <p><strong>Type Of Animal:</strong> {specie.type}</p>
                    <p><strong>Status:</strong> {specie.current_status}</p>
                    <p><strong>Description:</strong> {specie.description}</p>
                    <p><strong>Location:</strong> {loc.place_name}</p>
                    <p><strong>County:</strong> {loc.county}</p>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })
        )}
      </MapContainer>
    </div>
  );
};

export default SpeciesMap;
