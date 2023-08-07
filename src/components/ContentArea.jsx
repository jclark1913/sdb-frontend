import React from "react";

function ContentArea({children}) {
    return (
        <div className="ContentArea max-w-screen-lg mx-auto p-4 md:p-8">
            {children}
        </div>
    )
}

export default ContentArea;