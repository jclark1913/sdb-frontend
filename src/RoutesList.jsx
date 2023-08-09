import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CollectionDetail from "src/components/collections/CollectionDetail";
import CollectionList from "src/components/collections/CollectionList";
import Homepage from "src/components/homepage/Homepage";
import EntryDetail from "src/components/entries/EntryDetail";


/** App-wide routes
 *
 * Visiting a route that doesn't exist will redirect user to homepage
 *
*/

// prefer const definitions to function calls
const RoutesList = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/collections" element={<CollectionList />} />
        <Route path="/collections/:id" element={<CollectionDetail />} />
        <Route path="/entries/:id" element={<EntryDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default RoutesList;