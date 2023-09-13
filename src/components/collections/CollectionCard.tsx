import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { CollectionCardProps } from 'src/types/globalTypes';

/** Shows basic info about a given collection
 *
 * Rendered by CollectionList to a show a card for each collection.
 *
 * CollectionList -> CollectionCard
 */

const CollectionCard: React.FC<CollectionCardProps> = ({ id, name, description, createdAt, handleDelete }) => {

  const onDelete = () => {
    const collectionData = { id: id, name: name, description: description, createdAt: createdAt };
    handleDelete(collectionData);
  };

  return (
    <div className="CollectionCard max-w-sm rounded shadow-sm border relative flex flex-col">
      <a className="hover:bg-gray-700 hover:text-white flex flex-grow" href={`/collections/${id}`}>
        <div className="card-body px-6 py-4 flex-grow">
          <h5 className="text-xl font-medium pb-3">{name}</h5>
          <p className="card-text">{description}</p>
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
