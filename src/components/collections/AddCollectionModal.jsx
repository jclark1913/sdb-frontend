import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCollectionModal = ({ showModal, onClose, onSubmit }) => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [formErrors, setFormErrors] = useState([]);

    // TODO: Add better error handling and form validation
    const handleSubmit = async (e) => {
        if (name.length < 1) {
            setFormErrors(['Collection name is required']);
            e.preventDefault();
            return;
        }
            try {
                await onSubmit(name, description);
                navigate("/collections");
            } catch (err) {
                console.log(err);
            }
            return;
        };

        if (!showModal) return null;

        return (

            <div
                className="fixed inset-0 z-10 w-screen h-screen transition-opacity duration-300 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <form onSubmit={handleSubmit} onClick={e => e.stopPropagation()} className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 rounded-md flex flex-col gap-5 max-w-2xl flex-grow">
                    {formErrors && formErrors.map(err => <p className="text-white bg-red-500 rounded-md text-center"key={err}>{err}</p>)}
                    <h1 className="text-xl font-bold">Create new collection</h1>

                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Collection name"
                        className="border border-gray-300 p-2 rounded-md"
                        aria-label="Collection name"
                    />

                    <textarea
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Collection description (optional)"
                        className="border border-gray-300 p-2 rounded-md"
                        aria-label="Collection description"
                    />

                    <div className='flex gap-2'>
                        <button
                            className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border"
                            onClick={onClose}>Cancel
                        </button>
                        <button
                            className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border"
                            onClick={() => console.log(`Created collection ${name}: ${description}`)}>
                            Create
                        </button>
                    </div>
                </form>
            </div>

        );
    };

    export default AddCollectionModal;