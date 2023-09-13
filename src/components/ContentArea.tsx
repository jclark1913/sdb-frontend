import React, { createContext, useState, FunctionComponent } from "react";
import { SDBApi } from "src/api/api.ts";
import {
  ExpandContextType,
  ContentAreaProps,
  AddCollectionModalContextType,
} from "src/types/globalTypes.ts";

export const ExpandContext = createContext<ExpandContextType | undefined>(
  undefined
);

export const AddCollectionModalContext = createContext<
  AddCollectionModalContextType | undefined
>(undefined);

/** Content Area
 *
 * TODO: Write docstring
 *
 */
export const ContentArea: FunctionComponent<ContentAreaProps> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddCollectionModalOpen, setIsAddCollectionModalOpen] =
    useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddCollectionModalClick = () => {
    setIsAddCollectionModalOpen(!isAddCollectionModalOpen);
  };

  const handleAddCollection = async (name: string, description: string) => {
    const data = {
      name: name,
      description: description,
    };
    await SDBApi.addCollection(data);
  };

  const contentAreaSize = isExpanded
    ? "w-screen p-8"
    : "ContentArea max-w-screen-lg mx-auto p-4 md:p-8";

  return (
    <ExpandContext.Provider value={{ isExpanded, handleExpandClick }}>
      <AddCollectionModalContext.Provider
        value={{ isAddCollectionModalOpen, handleAddCollectionModalClick, handleAddCollection }}
      >
        <div className={contentAreaSize}>{children}</div>
      </AddCollectionModalContext.Provider>
    </ExpandContext.Provider>
  );
};
