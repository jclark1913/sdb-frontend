import React from 'react';
import { Link } from 'react-router-dom';

/** Shows basic info about a given collection
 *
 * Rendered by CollectionList to a show a card for each collection.
 *
 * CollectionList -> CollectionCard
 */

function CollectionCard({ id, name, description, createdAt }) {
  return (
    <a className="CollectionCard" href={`/collections/${id}`}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><small className="text-muted">{createdAt}</small></p>
      </div>
    </a>
  );
}

export default CollectionCard;
