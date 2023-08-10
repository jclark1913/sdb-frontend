import React, { useEffect, useState, useContext, useRef, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
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

  const selectedIdsRef = useRef([]);

  const { handleExpandClick, isExpanded } = useContext(ExpandContext);

  const handleSelectionChange = (selectedIds) => {
    selectedIdsRef.current = selectedIds;
  };

  const handleActionWithSelectedIds = () => {
    console.log("We have selected the following ids: ", selectedIdsRef.current);
  };

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
              onClick={() => console.log("Edit Collection button clicked")}
              className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border max-h-10">Edit</button>
            <button
              onClick={() => { handleExpandClick(); console.log("Expand Collection button clicked"); }}
              className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border max-h-10">
              {isExpanded ? <ArrowsPointingInIcon className="stroke-white block h-6 w-6" /> : <ArrowsPointingOutIcon className="stroke-white block h-6 w-6" />}
            </button>
          </div>
          <Disclosure as="div" className="" >
            <Menu as="div" className="">
              <div>
                <Menu.Button className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border max-h-10">
                  <span className="sr-only">Open additional actions</span>
                  Show Additional Actions
                  {/* <button
            onClick={handleActionWithSelectedIds}
            className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border max-h-10">
            Additional Actions
          </button> */}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                        onClick={handleActionWithSelectedIds}>
                        Print to excel
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                        onClick={handleActionWithSelectedIds}>
                        Migrate selected
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                        onClick={handleActionWithSelectedIds}>
                        Translate selected
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                        onClick={handleActionWithSelectedIds}>
                        Summarize selected with AI
                      </button>
                    )}
                  </Menu.Item>

                </Menu.Items>

              </Transition>
            </Menu>
          </Disclosure>
        </div>
      </div>
      <EntriesList onSelectionChange={handleSelectionChange} entries={collection.entries} />
    </div>
  );

}

export default CollectionDetail;