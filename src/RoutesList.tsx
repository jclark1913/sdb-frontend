import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CollectionDetail from "./components/collections/CollectionDetail";
import CollectionList from "./components/collections/CollectionList";
import Homepage from "./components/homepage/Homepage";
import EntryDetail from "./components/entries/EntryDetail";
import ScrapeForm from "src/components/scrape/ScrapeForm";

/** App-wide routes
 *
 * Visiting a route that doesn't exist will redirect user to homepage
 *
*/

const RoutesList = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/collections" element={<CollectionList />} />
        <Route path="/collections/:id" element={<CollectionDetail />} />
        <Route path="/entries/:id" element={<EntryDetail />} />
        <Route path="/scrape" element={<ScrapeForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default RoutesList;