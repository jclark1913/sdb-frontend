import React, { useState, useEffect } from 'react';
import Nav from 'components/navigation/Nav';
import './App.css';
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
