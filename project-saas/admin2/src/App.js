import * as React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

export default function App() {
  return (
    <Admin dataProvider={simpleRestProvider('http://localhost:4000/api')}>
      <Resource name="services" list={ListGuesser} />
      <Resource name="subscriptions" list={ListGuesser} />
      <Resource name="users" list={ListGuesser} />
    </Admin>
  );
}
