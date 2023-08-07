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
    <div className="CollectionCard max-w-sm rounded shadow-sm border hover:bg-gray-700 hover:text-white" href={`/collections/${id}`}>
      <a href={`/collections/${id}`}>
        <div className="card-body px-6 py-4 flex-col">
          <h5 className="text-xl font-medium pb-3">{name}</h5>
          <p className="card-text text-">{description}</p>
          <p className="card-text self-end">{createdAt}</p>
        </div>
      </a>
    </div>
  );
}

export default CollectionCard;
