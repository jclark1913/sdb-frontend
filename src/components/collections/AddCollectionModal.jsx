import React from 'react';

const AddCollectionModal = ({ showModal, onClose }) => {

    if (!showModal) return null;

    return (

        <div onClick={onClose} className="fixed inset-0 w-screen h-screen bg-black bg-opacity-20 flex justify-center items-center">
            <div onClick={e => e.stopPropagation()} className="">
                "Modal shown"

            <button onClick={onClose}>Cancel</button>

            <p>Testing</p>

            </div>
        </div>

    );
};

export default AddCollectionModal;