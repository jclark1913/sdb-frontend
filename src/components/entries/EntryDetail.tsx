import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SDBApi } from "src/api/api";
import { PaperClipIcon, RectangleGroupIcon } from "@heroicons/react/20/solid";
import { EntryType, ErrorType } from "src/types/globalTypes";

/** EntryDetail
 *
 * Props: None
 *
 * State: entry (from API)
 *
 * App -> CollectionDetail -> EntriesList -> EntryCard -> EntryDetail
 *
 *
 */

const EntryDetail = () => {
  const { id } = useParams();
  console.debug("EntryDetail", "id=", id);

  const [entry, setEntry] = useState<EntryType | null>(null);
  const [errors, setErrors] = useState<ErrorType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [fullTextShowMore, setFullTextShowMore] = useState<boolean>(false);
  const [translatedTextShowMore, setTranslatedTextShowMore] =
    useState<boolean>(false);
  const [aiSummaryShowMore, setAISummaryShowMore] = useState<boolean>(false);

  useEffect(
    function getEntryOnMount() {
      async function getEntry() {
        try {
          const entry = await SDBApi.getEntry(Number(id));
          setEntry(entry);
        } catch (err) {
          setErrors(err as ErrorType);
        }
      }
      getEntry();
    },
    [id, isLoading, errors]
  );

  function handleFullTextShowMore() {
    if (entry === null) return;
    if (!entry.full_text) return "No full text available.";

    return fullTextShowMore ? entry.full_text : entry.full_text.slice(0, 250);
  }

  function handleTranslatedTextShowMore() {
    if (entry === null) return;
    if (!entry.full_text_translated) return "No translation available.";

    return translatedTextShowMore
      ? entry.full_text_translated
      : entry.full_text_translated.slice(0, 250);
  }

  function handleAISummaryShowMore() {
    if (entry === null) return;
    if (!entry.ai_summary) return "No AI summary available.";

    return aiSummaryShowMore
      ? entry.ai_summary
      : entry.ai_summary.slice(0, 250);
  }

  async function handleTranslation() {
    const entryId = Number(id);
    const data = { entry_ids: [entryId] };
    setIsLoading(true);
    try {
      await SDBApi.translateEntries(data);
      setIsLoading(false);
    } catch (err) {
      setErrors(err as ErrorType);
    }
  }

  async function handleSummarize() {
    const entryId = Number(id);
    const data = { entry_ids: [entryId] };
    setIsLoading(true);
    try {
      await SDBApi.summarizeEntries(data);
      setIsLoading(false);
    } catch (err) {
      setErrors(err as ErrorType);
    }
  }

  // if (errors) return <div>{errors}</div>;
  if (!entry || isLoading === true) return <h1>Loading...</h1>;

  return (
    <div>
      <div className="px-4 sm:px-0 flex flex-1 justify-between">
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Entry details
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Use the buttons to edit.
          </p>
        </div>
        <div className="flex justify-center gap-0 rounded-md border">
          <button
            onClick={() => handleTranslation()}
            className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            Translate
          </button>
          <button
            onClick={() => handleSummarize()}
            className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            Get AI Summary
          </button>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Date posted
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {entry.date_posted}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Title (Arabic)
            </dt>
            <dd
              dir="rtl"
              className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {entry.title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Title (Translated)
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {entry.title_translated !== null
                ? entry.title_translated
                : "No translation available."}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Publication
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {entry.publication}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              AI summary
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {handleAISummaryShowMore()}
              {entry.ai_summary && (
                <button
                  onClick={() => setAISummaryShowMore(!aiSummaryShowMore)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {aiSummaryShowMore ? "...show less" : "...show more"}
                </button>
              )}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full text (translated)
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {handleTranslatedTextShowMore()}
              {entry.full_text_translated && (
                <button
                  onClick={() =>
                    setTranslatedTextShowMore(!translatedTextShowMore)
                  }
                  className="text-blue-500 hover:text-blue-700"
                >
                  {translatedTextShowMore ? "...show less" : "...show more"}
                </button>
              )}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full text
            </dt>
            <dd
              dir="rtl"
              className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {handleFullTextShowMore()}
              {entry.full_text && (
                <button
                  onClick={() => setFullTextShowMore(!fullTextShowMore)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {fullTextShowMore ? "...show less" : "...show more"}
                </button>
              )}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Link
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <a href={entry.link}>View original</a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default EntryDetail;
