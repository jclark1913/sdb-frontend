import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Nav } from "./components/navigation/Nav";
import RoutesList from "./RoutesList";
import { ContentArea } from "./components/ContentArea";
import { Footer } from "./components/footer/Footer";

const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      <Nav />
      <ContentArea key={location.pathname}>
        <RoutesList />
      </ContentArea>
      <Footer />
    </div>
  );
};

export default App;
