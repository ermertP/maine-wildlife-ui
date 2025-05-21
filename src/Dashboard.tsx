import { Card, CardContent, CardHeader } from '@mui/material';
import React from 'react';
import { Box } from '@mui/material';

export const Dashboard = () => (
  <Card>
    <CardHeader title="Endangered and Threatened Species of Maine" />
    <CardContent>
      <h2>Welcome to the Endangered and Threatened Species Tracker</h2>
      <p>
        This website visualizes the geolocations of endangered and threatened species in Maine using an OpenStreetMap by Leaflet. 
      </p>
      <p>
        The map is available under the "Locations" tab, where you can explore the distribution of these species 
        across Maine, and view information about their locations and conservation status.
      </p>
      <p>
        <strong>What is the difference between Endangered and Threatened?</strong>
      </p>
      <ul>
        <li><strong>Endangered:</strong> Species that are at risk of extinction in the near future. These species have a very low population and may face a high level of threat from factors such as habitat loss, climate change, or human activities.</li>
        <li><strong>Threatened:</strong> Species that are likely to become endangered in the near future. They may still have relatively healthy populations, but their status is at risk due to external pressures such as changing environmental conditions or human interference.</li>
      </ul>
      <p>
        This website provides an overview of part of Maine's biodiversity, focusing on those species that need immediate attention and conservation efforts.
      </p>
    </CardContent>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
    </Box>
  </Card>
);
