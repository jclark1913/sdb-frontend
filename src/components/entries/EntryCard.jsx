import React from "react";

/** EntryCard
 *
 * Props: id, title, description, body, created_at, updated_at
 *
 * State: None
 *
 * App -> CollectionDetail -> EntriesList -> EntryCard
 *
*/
// python snake_case syntax
// quit it, you're in javascript, it's camelCase time
function EntryCard({
  id,
  date_posted,
  publication,
  title,
  title_translated,
  full_text,
  full_text_translated,
  ai_summary,
  link,
}) {

  return (
    <div className="EntryCard">
      <div className="EntryCard-Id">
        <a href={`/entries/${id}`}><p>Id: {id}</p></a>
      </div>
      <div className="EntryCard-Date-Posted">
        <p>Date Posted: {date_posted}</p>
      </div>
      <div className="EntryCard-Publication">
        <p>Publication: {publication}</p>
      </div>
      <div className="EntryCard-Title">
        <h3>{title}</h3>
      </div>
      <div className="EntryCard-Title-Translated">
        <p>Title Translated: {title_translated}</p>
      </div>
      <div className="EntryCard-Full-Text">
        <p>{full_text}</p>
      </div>
      <div className="EntryCard-Full-Text-Translated">
        <p>Full Text Translated: {full_text_translated}</p>
      </div>
      <div className="EntryCard-AI-Summary">
        <p>AI Summary: {ai_summary}</p>
      </div>
      <div className="EntryCard-Link">
        <a href={link}>Article Link</a>
      </div>
    </div>
  );

}


export default EntryCard;