import React from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { CollectionCardProps } from "src/types/globalTypes";

/** Shows basic info about a given collection
 *
 * Rendered by CollectionList to a show a card for each collection.
 *
 * Props:
 * - id: number
 * - name: string
 * - description: string
 * - createdAt: string
 * - handleDelete: function (deletes collection)
 * - handleEdit: function (updates collection)
 *
 * State: None
 *
 * CollectionList -> CollectionCard
 */

const CollectionCard: React.FC<CollectionCardProps> = ({
  id,
  name,
  description,
  createdAt,
  handleDelete,
  handleEdit,
}) => {
  /**
   * When trash icon is clocked, calls handleDelete (from collectionList) with collectionData
   */
  const onDelete = () => {
    const collectionData = {
      id: id,
      name: name,
      description: description,
      createdAt: createdAt,
    };
    handleDelete(collectionData);
  };

  /**
   * Formats name displayed on collection card to be no longer than 30 characters
   */
  const formatNameForCollectionCard = (str: string) => {
    if (str.length > 30) {
      return str.substring(0, 30) + "...";
    }
    return str;
  };

  /**
   * Formats description displayed on collection card to be no longer than 100 characters
   */
  const formatDescriptionForCollectionCard = (str: string) => {
    if (str.length > 100) {
      return str.substring(0, 100) + "...";
    }
    return str;
  };

  /**
   * When pencil icon is clicked, calls handleEdit (from collectionList) with collectionData
   */
  const onEdit = () => {
    const collectionData = {
      id: id,
      name: name,
      description: description,
      createdAt: createdAt,
    };
    handleEdit(collectionData);
  };

  return (
    <div className="CollectionCard max-w-sm rounded shadow-sm border relative flex flex-col">
      <a
        className="hover:bg-gray-700 hover:text-white flex flex-grow"
        href={`/collections/${id}`}
      >
        <div className="card-body px-4 py-4 flex-grow overflow-x-hidden">
          <h5 className="text-xl font-medium pb-3">
            {formatNameForCollectionCard(name)}
          </h5>
          <p className="card-text">
            {formatDescriptionForCollectionCard(description)}
          </p>
          <p className="card-text self-end">{createdAt}</p>
        </div>
      </a>
      <TrashIcon
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="stroke-black block h-6 w-6 absolute top-3 right-3 cursor-pointer bg-red-400 hover:bg-red-500 rounded-md border"
      />

      <PencilSquareIcon
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="stroke-black block h-6 w-6 absolute top-3 right-10 cursor-pointer bg-blue-200 hover:bg-blue-500 rounded-md border"
      />
    </div>
  );
};

export default CollectionCard;
