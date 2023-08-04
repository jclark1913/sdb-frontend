import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EntryCard.css";
import SDBApi from "api/api";

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

function EntryDetail() {
  const { id } = useParams();
  console.debug("EntryDetail", "id=", id);

  const [entry, setEntry] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(function getEntryOnMount() {
    async function getEntry() {
      try {
        const entry = await SDBApi.getEntry(id);
        setEntry(entry);
      } catch (err) {
        setErrors(err);
      }
    }
    getEntry();
  }, [id]);

  if (errors.length) return <div>{errors}</div>;
  if (!entry) return <h1>Loading...</h1>;

  return (
    <div className="EntryDetail">
      <p className="EntryDetail-id">{entry.id}</p>
      <p className="EntryDetail-Date-Posted">{entry.date_posted}</p>
      <p className="EntryDetail-Publication">{entry.publication}</p>
      <h4 className="EntryDetail-title">{entry.title}</h4>
      <p className="EntryDetail-Title-Translated">{entry.title_translated}</p>
      <p className="EntryDetail-Full-Text">{entry.full_text}</p>
      <p className="EntryDetail-Full-Text-Translated">{entry.full_text_translated}</p>
      <p className="EntryDetail-AI-Summary">{entry.ai_summary}</p>
      <a className="EntryDetail-Link" href={entry.link}>Article Link</a>
      <a href={`/collections/${entry.collection_id}`}>
        <p className="EntryDetail-Collection-Id">{entry.collection_id}</p>
      </a>
    </div>
  );

}

export default EntryDetail;