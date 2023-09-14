import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EditCollectionModalProps } from "src/types/globalTypes";

/** EditCollectionModal
 *
 * Props:
 * - showModal: boolean
 * - onClose: function (hides modal)
 * - collectionData: {id, name, description, createdAt}
 * - onEdit: function (updates collection)
 *
 * State:
 * - formData: {name, description}
 * - formErrors: string[] of errors (flashed on submit)
 *
 * App -> ContentArea -> CollectionList -> EditCollectionModal
 */
const EditCollectionModal: React.FC<EditCollectionModalProps> = ({
  showModal,
  onClose,
  collectionData,
  onEdit,
}) => {
  const navigate = useNavigate();

  // formData state initializes with collectionData
  const [formData, setFormData] = useState({
    name: collectionData.name,
    description: collectionData.description,
  });

  // formErrors state: any errors are flashed on submit
  const [formErrors, setFormErrors] = useState<string[]>([]);

  /**
   * Handles edit of collection on form submit. Validates that collection name is not empty.
   */
  const handleSubmit = async (e: any) => {
    if (formData.name.toString().length < 1) {
      setFormErrors(["Collection name is required"]);
      e.preventDefault();
      return;
    }
    try {
      await onEdit(Number(collectionData.id), formData);
      navigate("/collections");
    } catch (err) {
      console.log(err);
    }
    return;
  };

  /**
   * This hook updates the formData state with the collectionData prop on mount and whenever the
   * collectionData prop changes.
   */
  useEffect(() => {
    setFormData({
      name: collectionData.name,
      description: collectionData.description,
    });
  }, [collectionData]);

  /**
   * Updates formData state whenever form fields are changed.
   */
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // If showModal is false, don't render anything
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-10 w-screen h-screen transition-opacity duration-300 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 rounded-md flex flex-col gap-5 max-w-2xl flex-grow"
      >
        {formErrors &&
          formErrors.map((err) => (
            <p
              className="text-white bg-red-500 rounded-md text-center"
              key={err}
            >
              {err}
            </p>
          ))}
        <h1 className="text-xl font-bold">Update "{collectionData.name}"</h1>

        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Collection name"
          className="border border-gray-300 p-2 rounded-md"
          aria-label="Collection name"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Collection description (optional)"
          className="border border-gray-300 p-2 rounded-md"
          aria-label="Collection description"
        />

        <div className="flex gap-2">
          <button
            className="hover:bg-red-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium border"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border"
            onClick={() =>
              console.log(
                `Updated collection ${formData.name}: ${formData.description}`
              )
            }
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCollectionModal;
