import React from "react";
import EntryCard from "src/components/entries/EntryCard";

/** EntriesList
 *
 * Props: entries: [{id, title, description, body, created_at, updated_at}, ...]
 *
 * State: isLoading: boolean
 *
 * App -> CollectionDetail -> EntriesList -> EntryCard
 *
*/

function EntriesList({ entries }) {

    return (
      <div className="EntriesList">
        <div className="EntriesList-List">
          {entries.map(e => (
            <EntryCard
              key={e.id}
              id={e.id}
              date_posted={e.date_posted}
              publication={e.publication}
              title={e.title}
              title_translated={e.title_translated}
              full_text={e.full_text}
              full_text_translated={e.full_text_translated}
              ai_summary={e.ai_summary}
              link={e.link}
            />
          ))}
        </div>
      </div>
    );

}

export default EntriesList;