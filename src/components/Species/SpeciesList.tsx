import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const SpeciesList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="scientific_name" />
      <TextField source="type" />
      <TextField source="sub_category" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
