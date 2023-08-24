import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CollectionCard from 'src/components/collections/CollectionCard';
import SDBApi from 'src/api/api';
import AddCollectionModal from './AddCollectionModal';
import DeleteCollectionModal from './DeleteCollectionModal';

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
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateCollectionModal, setShowCreateCollectionModal] = useState(false);
  const [showDeleteCollectionModal, setShowDeleteCollectionModal] = useState(false);
  const [currCollectionData, setCurrCollectionData] = useState({}); // [{id, name, description}, ...

  const navigate = useNavigate();

  console.log(collections, "Collections in CollectionList (state)");

  useEffect(function getCollectionsOnMount() {
    async function getCollections() {
      const collections = await SDBApi.getCollections();
      setCollections(collections);
      setIsLoading(false);
    }
    if (isLoading) {
      getCollections();
    }
  }, [isLoading]);

  /** Receives name and description for db, adds new collection. */
  const handleAddCollection = async (name, description) => {
    const data = {
      name: name,
      description: description
    };
    await SDBApi.addCollection(data);
  };

  /** Deletes single collection by its id. */
  const deleteCollection = async (id) => {
    await SDBApi.deleteCollection(id);
    setCollections(collections.filter(c => c.id !== id));

  };

  /** Displays the confirmation modal for deleting a collection when called and
   * updates state to contain the collection data of the collection to be deleted.
    */
  const displayDeletionModal = (collectionData) => {
    setCurrCollectionData(collectionData);
    setShowDeleteCollectionModal(true);
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="CollectionList">
      <div className="mb-5 pb-5 border-b flex flex-1 justify-between">
        <h1 className='text-3xl font-medium'>Saved Collections</h1>
        <button
          onClick={() => setShowCreateCollectionModal(!showCreateCollectionModal)}
          className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border">+ Collection</button>
      </div>
      <div className="CollectionList-List grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        {isLoading === false
          ? collections.map(c => (
            <CollectionCard
              key={c.id}
              id={c.id}
              name={c.name}
              description={c.description}
              createdAt={c.created_at}
              handleDelete={displayDeletionModal}
            />
          )) : null}
      </div>
      <AddCollectionModal showModal={showCreateCollectionModal} onClose={() => setShowCreateCollectionModal(false)} onSubmit={handleAddCollection} />
      <DeleteCollectionModal showModal={showDeleteCollectionModal} onClose={() => setShowDeleteCollectionModal(false)} onDelete={deleteCollection} collectionData={currCollectionData}/>
    </div>
  );
}

export default CollectionList;