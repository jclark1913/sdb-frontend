import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import { SDBApi } from "src/api/api";
import AddCollectionModal from "./AddCollectionModal";
import DeleteCollectionModal from "./DeleteCollectionModal";
import {
  CollectionType,
  AddCollectionModalContextType,
} from "src/types/globalTypes";
import { AddCollectionModalContext } from "src/components/ContentArea.tsx";
/** CollectionList
 *
 *  Props: None
 *
 *  State:
 *    - collections: [{id, name, description}, ...]
 *    - isLoading: boolean
 *    - showModal: boolean
 *    - currCollectionData: {id, name, description}
 *    - showDeleteCollectionModal: boolean
 *    - showCreateCollectionModal: boolean
 *
 *
 * App -> CollectionList -> CollectionCard
 *
 */

function CollectionList() {
  const [collections, setCollections] = useState<CollectionType[] | any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDeleteCollectionModal, setShowDeleteCollectionModal] =
    useState<boolean>(false);
  const [currCollectionData, setCurrCollectionData] = useState<{
    [key: string]: string | number;
  }>({}); // [{id, name, description}, ...

  const { isAddCollectionModalOpen, handleAddCollectionModalClick, handleAddCollection } =
    useContext(AddCollectionModalContext) as AddCollectionModalContextType;

  const navigate = useNavigate();

  console.log(collections, "Collections in CollectionList (state)");

  useEffect(
    function getCollectionsOnMount() {
      async function getCollections() {
        const collections = await SDBApi.getCollections();
        setCollections(collections);
        setIsLoading(false);
      }
      if (isLoading) {
        getCollections();
      }
    },
    [isLoading]
  );

  /** Deletes single collection by its id. */
  const deleteCollection = async (id: number) => {
    await SDBApi.deleteCollection(id);
    setCollections(collections.filter((c) => c.id !== id));
  };

  /** Displays the confirmation modal for deleting a collection when called and
   * updates state to contain the collection data of the collection to be deleted.
   *
   * TODO: improve typing
   */
  const displayDeletionModal = (collectionData: {
    [key: string]: string | number;
  }) => {
    setCurrCollectionData(collectionData);
    setShowDeleteCollectionModal(true);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="CollectionList">
      <div className="mb-5 pb-5 border-b flex flex-1 justify-between">
        <h1 className="text-3xl font-medium">Saved Collections</h1>
        <button
          onClick={() => {
            handleAddCollectionModalClick();
            console.log(
              "Add Collection button clicked, status: ",
              isAddCollectionModalOpen
            );
          }}
          className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border"
        >
          + Collection
        </button>
      </div>
      <div className="CollectionList-List grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        {isLoading === false
          ? collections.map((c) => (
              <CollectionCard
                key={c.id}
                id={c.id}
                name={c.name}
                description={c.description}
                createdAt={c.created_at}
                handleDelete={displayDeletionModal}
              />
            ))
          : null}
      </div>
      <AddCollectionModal
        showModal={isAddCollectionModalOpen}
        onClose={() => handleAddCollectionModalClick()}
        onSubmit={handleAddCollection}
      />
      <DeleteCollectionModal
        showModal={showDeleteCollectionModal}
        onClose={() => setShowDeleteCollectionModal(false)}
        onDelete={deleteCollection}
        collectionData={currCollectionData}
      />
    </div>
  );
}

export default CollectionList;
