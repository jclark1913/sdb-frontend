import React, { useState, useEffect } from 'react';
import SDBApi from './api/api';
import Nav from './Nav';
import './App.css';
import CollectionCard from './CollectionCard';
import CollectionList from './CollectionList';
import RoutesList from './RoutesList';

function App() {

  return (
    <div className="App">
      <Nav />
      <RoutesList />
    </div>
  );
}

export default App;
