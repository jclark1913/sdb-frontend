import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CollectionDetail from "./CollectionDetail";
import CollectionList from "./CollectionList";
import Homepage from "./Homepage";


/** App-wide routes
 *
 * Visiting a route that doesn't exist will redirect user to homepage
 *
*/

function RoutesList(){
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/collections" element={<CollectionList />} />
        <Route path="/collections/:id" element={<CollectionDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default RoutesList;