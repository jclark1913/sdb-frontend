import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import SDBApi from 'src/api/api';
import EntriesList from 'src/components/entries/EntriesList';
import { ExpandContext } from 'src/components/ContentArea';
import { ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/20/solid';

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

  const { handleExpandClick, isExpanded } = useContext(ExpandContext);

  // see my refactor in EntryDetail
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
      <div className="mb-5 pb-5 border-b flex flex-1 justify-between">
        <div>
          <h1 className='text-3xl font-medium'>{collection.name}</h1>
          <p className="">{collection.description}</p>
          <p className="">{collection.created_at}</p>
        </div>
        <div className='flex flex-col'>
          <div className="flex flex-grow justify-between">
            <button
              {/*  consider getting strict about using `name` and other button attributes, especially accessibility attributes */}
              {/*  then you could define a generic onClick handler that could debug this info for you, and any onClick defs you have with it*/}
              onClick={() => console.log("Edit Collection button clicked")}
              className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border max-h-10">Edit</button>
            <button
              onClick={() => { handleExpandClick(); console.log("Expand Collection button clicked"); }}
              className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border max-h-10">
              {isExpanded ? <ArrowsPointingInIcon className="stroke-white block h-6 w-6" /> : <ArrowsPointingOutIcon className="stroke-white block h-6 w-6" />}
            </button>
          </div>
          <button
            onClick={() => console.log("Print to excel clicked")}
            className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border max-h-10">
            Print to Excel
            </button>
        </div>
      </div>
      <EntriesList entries={collection.entries} />
    </div>
  );

}

export default CollectionDetail;