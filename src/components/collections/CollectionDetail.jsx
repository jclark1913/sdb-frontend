import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SDBApi from 'src/api/api';
import EntriesList from 'src/components/entries/EntriesList';

/** CollectionDetail
 *
 * Renders information about a collection, including its entries.
 *
 * Props: None
 *
 * State: Company, isLoading
 *
 * Routes -> CompanyDetail -> EntryCardList
 *
*/

function CollectionDetail() {
  const { id } = useParams();
  console.debug("CollectionDetail", "id=", id);

  const [collection, setCollection] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(function getCollectionAndEntriesOnMount() {
    async function getCollection() {
      try {
        const collection = await SDBApi.getCollection(id);
        setCollection(collection);
      } catch (err) {
        setErrors(err);
      }
    }
    getCollection();
  }, [id]);

  if (errors.length) return <div>{errors}</div>;
  if (!collection) return <h1>Loading...</h1>;

  return (
    <div className="CollectionDetail">
      <h4 className="CollectionDetail-title">{collection.name}</h4>
      <p className="CollectionDetail-description">{collection.description}</p>
      <p className="CollectionDetail-created-at">{collection.created_at}</p>
      <EntriesList entries={collection.entries} />
    </div>
  )

}

export default CollectionDetail;