import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SDBApi } from "src/api/api";
import CollectionCard from "./CollectionCard";
import AddCollectionModal from "./AddCollectionModal";
import DeleteCollectionModal from "./DeleteCollectionModal";
import EditCollectionModal from "./EditCollectionModal";
import {
  CollectionType,
  AddCollectionModalContextType,
} from "src/types/globalTypes";
import { AddCollectionModalContext } from "src/components/ContentArea.tsx";
import { formatCollectionDate } from "src/utils/time_formatting";

/** CollectionList
 *
 *  Props: None
 *
 *  State:
 *    - collections: Array of collection objects
 *    - isLoading: boolean
 *    - showDeleteCollectionModal: boolean
 *    - showEditCollectionModal: boolean
 *    - currCollectionData: {id, name, description} - used for editing/deleting
 *
 *  Context:
 *   - isAddCollectionModalOpen: boolean
 *   - handleAddCollectionModalClick: function (opens/closes modal)
 *   - handleAddCollection: function (adds collection)
 *
 *  NOTES:
 *   - CollectionList contains functionality for deleting a collection and passses
 *    the delete function down to CollectionCard.
 *   - Adding a collection, however, is handled through context given that it is
 *    used in multiple places throughout the app.
 *   - Delete could be handled through context in the future if I need to use it
 *    in multiple spots.
 *
 * App -> CollectionList -> CollectionCard
 *
 */

function CollectionList() {
  const [collections, setCollections] = useState<CollectionType[] | any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDeleteCollectionModal, setShowDeleteCollectionModal] =
    useState<boolean>(false);
  const [showEditCollectionModal, setShowEditCollectionModal] =
    useState<boolean>(false);
  const [currCollectionData, setCurrCollectionData] = useState<{
    [key: string]: string | number;
  }>({});

  // Search details
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [order, setOrder] = useState<string>("asc");

  // Get context for AddCollectionModal logic
  const {
    isAddCollectionModalOpen,
    handleAddCollectionModalClick,
    handleAddCollection,
  } = useContext(AddCollectionModalContext) as AddCollectionModalContextType;

  /**
   * This hook gets all collections on mount and sets the collections state to the response. Runs any
   * time isLoading changes.
   */
  useEffect(
    function getCollectionsOnMount() {
      async function getCollections() {
        const collections = await SDBApi.getCollections(searchTerm, order);
        setCollections(collections);
        setIsLoading(false);
      }
      if (isLoading) {
        getCollections();
      }
    },
    [isLoading, searchTerm, order]
  );

  /** Deletes single collection by its id. */
  const deleteCollection = async (id: number) => {
    await SDBApi.deleteCollection(id);
    setCollections(collections.filter((c) => c.id !== id));
  };

  /** Edits single collection by its id using data in collectionData */
  const editCollection = async (
    id: number,
    collectionData: { [key: string]: string | number }
  ) => {
    await SDBApi.editCollection(id, collectionData);
  };

  /** Displays the confirmation modal for deleting a collection when called and
   * updates state to contain the collection data of the collection to be deleted.
   */
  const displayDeletionModal = (collectionData: {
    [key: string]: string | number;
  }) => {
    setCurrCollectionData(collectionData);
    console.log("CURR COLLECTION DATA STATE(DELETE): ", currCollectionData);
    setShowDeleteCollectionModal(true);
  };

  /**
   * Displays the edit modal for editing a collection when called and updates state
   * to contain the data of the collection to be edited.
   */
  const displayEditModal = (collectionData: {
    [key: string]: string | number;
  }) => {
    setCurrCollectionData(collectionData);
    setShowEditCollectionModal(true);
  };

  const toggleOrder = () => {
    if (order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="CollectionList pb-5">
      <div>
        <div className="mb-5 pb-5 border-b flex flex-1 justify-between">
          <h1 className="text-3xl font-medium">Saved Collections</h1>
          <button
            onClick={() => {
              handleAddCollectionModalClick();
            }}
            className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border"
          >
            + Collection
          </button>
        </div>
        <div className="flex flex-1 justify-between">
          <div>
            Search: Bar
          </div>
          <button
            onClick={() => {
              toggleOrder();
              setIsLoading(true);
            }}
          >
            Sort by: {order === "desc" ? "Earliest" : "Most Recent"}
          </button>
        </div>
      </div>
      <div className="CollectionList-List grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {isLoading === false
          ? collections.map((c) => (
              <CollectionCard
                key={c.id}
                id={c.id}
                name={c.name}
                description={c.description}
                createdAt={formatCollectionDate(c.created_at)}
                handleDelete={displayDeletionModal}
                handleEdit={displayEditModal}
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
      <EditCollectionModal
        showModal={showEditCollectionModal}
        onClose={() => setShowEditCollectionModal(false)}
        collectionData={currCollectionData}
        onEdit={editCollection}
      />
    </div>
  );
}

export default CollectionList;
