import React, {
  createContext,
  useState,
  FunctionComponent,
} from "react";

import { ExpandContextType, ContentAreaProps } from "src/types/globalTypes.ts";

export const ExpandContext = createContext<ExpandContextType | undefined>(
  undefined
);

/** Content Area
 *
 * TODO: Write docstring
 *
 */
export const ContentArea: FunctionComponent<ContentAreaProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const contentAreaSize = isExpanded
    ? "w-screen p-8"
    : "ContentArea max-w-screen-lg mx-auto p-4 md:p-8";

  return (
    <ExpandContext.Provider value={{ isExpanded, handleExpandClick }}>
      <div className={contentAreaSize}>{children}</div>
    </ExpandContext.Provider>
  );
};
