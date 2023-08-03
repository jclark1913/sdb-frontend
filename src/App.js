import React, { useState, useEffect } from 'react';
import SDBApi from './api/api';
import Nav from './Nav';
import './App.css';
import CollectionCard from './CollectionCard';
import CollectionList from './CollectionList';

function App() {

  return (
    <div className="App">
      <h1>App rendered</h1>
      <CollectionList />
    </div>
  );
}

export default App;
