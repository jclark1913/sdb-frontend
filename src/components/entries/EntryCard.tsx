import React from "react";
import { EntryCardProps } from "src/types/globalTypes.ts";

/** EntryCard
 *
 * Props: id, title, description, body, created_at, updated_at
 *
 * State: None
 *
 * App -> CollectionDetail -> EntriesList -> EntryCard
 *
*/

const EntryCard: React.FC<EntryCardProps> = ({
  id,
  datePosted,
  publication,
  title,
  titleTranslated,
  fullText,
  fullTextTranslated,
  aiSummary,
  link,
}) => {

  return (
    <div className="EntryCard">
      <div className="EntryCard-Id">
        <a href={`/entries/${id}`}><p>Id: {id}</p></a>
      </div>
      <div className="EntryCard-Date-Posted">
        <p>Date Posted: {datePosted}</p>
      </div>
      <div className="EntryCard-Publication">
        <p>Publication: {publication}</p>
      </div>
      <div className="EntryCard-Title">
        <h3>{title}</h3>
      </div>
      <div className="EntryCard-Title-Translated">
        <p>Title Translated: {titleTranslated}</p>
      </div>
      <div className="EntryCard-Full-Text">
        <p>{fullText}</p>
      </div>
      <div className="EntryCard-Full-Text-Translated">
        <p>Full Text Translated: {fullTextTranslated}</p>
      </div>
      <div className="EntryCard-AI-Summary">
        <p>AI Summary: {aiSummary}</p>
      </div>
      <div className="EntryCard-Link">
        <a href={link}>Article Link</a>
      </div>
    </div>
  );

}


export default EntryCard;