import React from 'react';
import { Link } from 'react-router-dom';

import "./CollectionCard.css";

/** Shows basic info about a given collection
 *
 * Rendered by CollectionList to a show a card for each collection.
 *
 * CollectionList -> CollectionCard
 */

function CollectionCard({ id, name, description }) {
  return (
    <a className="CollectionCard" href={`/collections/${id}`}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
      </div>
    </a>
  );
}

export default CollectionCard;
