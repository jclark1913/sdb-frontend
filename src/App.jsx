import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from 'src/components/navigation/Nav';
import RoutesList from './RoutesList';
import ContentArea from 'src/components/ContentArea';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      <Nav />
      <ContentArea key={location.pathname}>
        <RoutesList />
      </ContentArea>
    </div>
  );
}

export default App;
