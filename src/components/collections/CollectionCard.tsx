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
    if (str.length > 220) {
      return str.substring(0, 220) + "...";
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
    <div className="rounded shadow-sm border relative flex flex-col min-h-[200px] max-h-[200px]">
      <a
        className="hover:bg-gray-700 hover:text-white flex flex-grow flex-col"
        href={`/collections/${id}`}
      >
        <div className="px-4 py-4 flex-grow flex-col overflow-x-hidden">
          <h5 className="text-xl font-medium pb-3">
            {formatNameForCollectionCard(name)}
          </h5>
          <p className="">{formatDescriptionForCollectionCard(description)}</p>

          <p className="absolute bottom-1 text-sm font-medium">
            <hr className="mb-1"></hr>Created {createdAt}
          </p>
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
