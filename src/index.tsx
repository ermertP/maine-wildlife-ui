import React from 'react';
import ReactDOM from 'react-dom/client';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import { Dashboard } from './Dashboard';
import { authProvider } from './authProvider';
import customDataProvider from './dataProvider';
import SpeciesMap from './components/Maps/SpeciesMap';  // Your SpeciesMap component
import { Route } from 'react-router-dom';
import Species from './components/Species';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Admin
      dataProvider={customDataProvider}
      dashboard={Dashboard}
      authProvider={authProvider}
    >
      <CustomRoutes>
        <Route path="./components/Map/SpeciesMap" element={<SpeciesMap/>}></Route>

      </CustomRoutes>
          <Resource name="Locations" list={SpeciesMap} />
      <Resource
        name="Species"
        list={Species.List}
      />
    </Admin>
  </React.StrictMode>
);
