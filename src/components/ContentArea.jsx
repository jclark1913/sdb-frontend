import React, { createContext, useState } from "react";

export const ExpandContext = createContext();

/** Content Area
 *
 * TODO: Write docstring
 *
 */
function ContentArea({ children }) {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    const contentAreaSize = isExpanded ? "w-screen p-8" : "ContentArea max-w-screen-lg mx-auto p-4 md:p-8";

    return (
        <ExpandContext.Provider value={{ isExpanded, handleExpandClick }}>
            <div className={contentAreaSize}>
                {children}
            </div>
        </ExpandContext.Provider>
    );
}

export default ContentArea;