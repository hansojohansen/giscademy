import React from 'react';
import { Editor } from '@monaco-editor/react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * The main application component.
 *
 * This skeleton displays two panes: a Monaco editor on the left for typing Python/SQL
 * and a Leaflet map on the right that can display GeoJSON layers.
 * You can extend this component by integrating API calls to the backend
 * defined in backend/main.py. For example, send the code from the editor
 * to the backend's /run/python endpoint and draw the result on the map.
 */
function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'row' }}>
      {/* Code editor panel */}
      <div style={{ flex: 1, borderRight: '1px solid #ccc' }}>
        <Editor
          height="100%"
          defaultLanguage="python"
          defaultValue={"# Skriv Python-kode eller SQL her\n" +
            "# Eksempel: SELECT * FROM places WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint(5.33, 60.39), 4326), 1000);"}
        />
      </div>
      {/* Map panel */}
      <div style={{ flex: 1 }}>
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[60.39, 5.33]}
          zoom={8}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;