import React, { useEffect, useState } from 'react';
import CollectionCard from 'src/components/collections/CollectionCard';
import SDBApi from 'src/api/api';

/** CollectionList
 *
 *  Props: None
 *
 *  State:
 *        - collections: [{id, name, description}, ...]
 *        - isLoading: boolean
 *
 *
 * App -> ??? -> CollectionList -> CollectionCard
 *
 */

function CollectionList() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="CollectionList">
      <div className="CollectionList-List">
        {isLoading === false
          ? collections.map(c => (
            <CollectionCard
              key={c.id}
              id={c.id}
              name={c.name}
              description={c.description}
              createdAt={c.created_at}
            />
          )) : null}
      </div>
    </div>
  );
}

export default CollectionList;