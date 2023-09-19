import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  Fragment,
} from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { SDBApi } from "src/api/api.ts";
import EntriesList from "src/components/entries/EntriesList.tsx";
import { ExpandContext } from "src/components/ContentArea.tsx";
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/20/solid";
import {
  ExpandContextType,
  ErrorType,
  CollectionType,
} from "src/types/globalTypes.ts";
import { formatCollectionDate } from "src/utils/time_formatting";

/** CollectionDetail
 *
 * Renders information about a collection, including its entries.
 *
 * Props: None
 *
 * State: collection, isLoading
 *
 * Routes -> CollectionDetail -> EntryCardList
 *
 * TODO: Improve docstring and clean up code
 *
 */

function CollectionDetail() {
  const { id } = useParams();
  console.debug("CollectionDetail", "id=", id);

  const [collection, setCollection] = useState<CollectionType | null>(null);
  const [errors, setErrors] = useState<ErrorType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const selectedIdsRef = useRef<number[]>([]);

  const { handleExpandClick, isExpanded } = useContext(
    ExpandContext
  ) as ExpandContextType;

  const handleSelectionChange = (selectedIds: number[]) => {
    selectedIdsRef.current = selectedIds;
  };

  useEffect(
    function getCollectionAndEntriesOnMount() {
      async function getCollection() {
        try {
          const collection = await SDBApi.getCollection(Number(id)); //TODO: Add interface here
          setCollection(collection);
        } catch (err) {
          setErrors(err as ErrorType);
        }
      }
      getCollection();
      setRefresh(false);
    },
    [id, refresh]
  );

  const handleActionWithSelectedIds = () => {
    console.log("We have selected the following ids: ", selectedIdsRef.current);
    const currSelectedIds = selectedIdsRef.current;
  };

  /** Translates entries selected by the user from the EntriesList table
   *
   * Input: Array of ids: [1, 2, 3, ...]
   *
   * Output: None
   *
   */
  const translateSelectedIds = async () => {
    console.log("Translating the following ids: ", selectedIdsRef.current);
    const currSelectedIds = selectedIdsRef.current;
    const data = { entry_ids: currSelectedIds };
    setIsLoading(true);
    try {
      await SDBApi.translateEntries(data);
    } catch (err) {
      setErrors(err as ErrorType);
    }
    setRefresh(true);
    setIsLoading(false);
  };

  /** Summarizes entries selected by the user from the EntriesList table
   *
   * Input: Array of ids: [1, 2, 3, ...]
   *
   * Output: None
   *
   */
  const summarizeSelectedIds = async () => {
    console.log("Summarizing the following ids: ", selectedIdsRef.current);
    const currSelectedIds = selectedIdsRef.current;
    const data = { entry_ids: currSelectedIds };
    setIsLoading(true);
    try {
      await SDBApi.summarizeEntries(data);
    } catch (err) {
      setErrors(err as ErrorType);
    }
    setRefresh(true);
    setIsLoading(false);
  };

  if (isLoading) return <h1>RUNNING OPERATION...THIS MAY TAKE A MOMENT</h1>;
  // if (errors.length) return <div>{errors}</div>; TODO: Add more robust error handling
  if (!collection) return <h1>Loading...</h1>;

  return (
    <div className="CollectionDetail flex flex-col" style={{ height: 'calc(100vh - 140px'}}>
      <div className="mb-5 pb-5 border-b flex flex-1 justify-between">
        <div>
          <h1 className="text-3xl font-medium">{collection.name}</h1>
          <p className="">{collection.description}</p>
          <p className="">{formatCollectionDate(Number(collection.created_at))}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-grow justify-between">
            <button
              onClick={() => console.log("Edit Collection button clicked")}
              className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border max-h-10"
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleExpandClick();
                console.log("Expand Collection button clicked");
              }}
              className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border max-h-10"
            >
              {isExpanded ? (
                <ArrowsPointingInIcon className="stroke-white block h-6 w-6" />
              ) : (
                <ArrowsPointingOutIcon className="stroke-white block h-6 w-6" />
              )}
            </button>
          </div>
          <Disclosure as="div" className="">
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
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                        onClick={handleActionWithSelectedIds}
                      >
                        Print to excel
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                        onClick={handleActionWithSelectedIds}
                      >
                        Migrate selected
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                        onClick={translateSelectedIds}
                      >
                        Translate selected
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                        onClick={summarizeSelectedIds}
                      >
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
      <EntriesList
        onSelectionChange={handleSelectionChange}
        entries={collection.entries}
      />
    </div>
  );
}

export default CollectionDetail;
