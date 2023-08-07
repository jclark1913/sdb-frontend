import React, { useState, useEffect } from 'react';
import Nav from 'src/components/navigation/Nav';
import RoutesList from './RoutesList';
import ContentArea from 'src/components/ContentArea';

function App() {

  return (
    <div className="App">
      <Nav />
      <ContentArea>
        <RoutesList />
      </ContentArea>
    </div>
  );
}

export default App;
