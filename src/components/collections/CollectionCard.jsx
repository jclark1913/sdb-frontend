import React from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';

/** Shows basic info about a given collection
 *
 * Rendered by CollectionList to a show a card for each collection.
 *
 * CollectionList -> CollectionCard
 */

function CollectionCard({ id, name, description, createdAt, handleDelete }) {

  const onDelete = async () => {
    await handleDelete(id);
  }

  return (
    <div className="CollectionCard max-w-sm rounded shadow-sm border relative" href={`/collections/${id}`}>
      <a className="hover:bg-gray-700 hover:text-white block" href={`/collections/${id}`}>
        <div className="card-body px-6 py-4 flex-col">
          <h5 className="text-xl font-medium pb-3">{name}</h5>
          <p className="card-text text-">{description}</p>
          <p className="card-text self-end">{createdAt}</p>

        </div>
      </a>
          <TrashIcon onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
            className="stroke-black block h-6 w-6 absolute top-3 right-3 cursor-pointer hover:bg-red-500 rounded-md border"
          />
    </div>
  );
}

export default CollectionCard;
