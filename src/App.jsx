import React, { useState, useEffect } from 'react';
import Nav from 'src/components/navigation/Nav';
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
