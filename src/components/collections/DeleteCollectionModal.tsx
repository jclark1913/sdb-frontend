import React from "react";
import { DeleteCollectionModalProps } from "src/types/globalTypes";

/** DeleteCollectionModal
 *
 * Props:
 *  - showModal: boolean
 *  - onClose: function
 *  - collectionData: object
 *  - onDelete: function
 *
 * App -> CollectionList -> DeleteCollectionModal
 */
const DeleteCollectionModal: React.FC<DeleteCollectionModalProps> = ({ showModal, onClose, collectionData, onDelete }) => {

    const handleDelete = async () => {
        await onDelete(Number(collectionData.id));
        onClose();
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-10 w-screen h-screen transition-opacity duration-300 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 rounded-md flex flex-col gap-5 max-w-2xl flex-grow">
                <h1 className="text-lg font-bold">{`Are you sure you want to delete "${collectionData.name}"?`}</h1>
                <p>All saved data inside the collection will be permanently lost.</p>
                <div className="flex justify-start gap-2">
                    <button className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border" onClick={onClose}>Cancel</button>
                    <button className="bg-red-500 hover:bg-red-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border" onClick={handleDelete}>Delete</button>
                </div>

            </div>
        </div>
    );
};

export default DeleteCollectionModal;
