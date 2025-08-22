import React from 'react';
import { useProductStore } from '../../store/useProductStore';
import { PlusCircleIcon } from 'lucide-react';

const AddProductModal = () => {
  const { loading, addProduct, formData, setFormData } = useProductStore();

  return (
    <dialog id="addProductModal" className="modal">
        <div className="modal-box max-w-md p-6 rounded-xl bg-gray-900 text-gray-100 shadow-lg relative">

            {/* Close Button */}
            <form method="dialog" className="absolute top-3 right-3">
            <button
                aria-label="Close modal"
                className="text-gray-400 hover:text-gray-200 focus:outline-none transition text-xl"
            >
                ✕
            </button>
            </form>

            <h2 className="text-2xl font-semibold mb-6 text-center tracking-wide">
            Add New Product
            </h2>

            <form onSubmit={addProduct} className="space-y-5">
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-1 font-semibold text-gray-300 text-sm">Product Name</label>
                    <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="mb-1 font-semibold text-gray-300 text-sm">Description</label>
                    <textarea
                    id="description"
                    name="description"
                    placeholder="Enter product description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="price" className="mb-1 font-semibold text-gray-300 text-sm">Price (£)</label>
                    <input
                    id="price"
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    placeholder="Enter price"
                    required
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    className="rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="image" className="mb-1 font-semibold text-gray-300 text-sm">Image URL</label>
                    <input
                    id="image"
                    type="url"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    required
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    className="rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Modal action */}
                <div className="modal-action flex justify-end space-x-3">
                    <button 
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => document.getElementById("addProductModal").close()}
                    >
                    Cancel
                    </button>
                    <button 
                    type="submit"
                    className="btn btn-primary"
                    disabled={!formData.name || !formData.description || !formData.price || !formData.image || loading}
                    >
                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <>
                        <PlusCircleIcon className="w-4 h-4 mr-2" />
                        Add Product
                        </>
                    )}
                    </button>
                </div>

            </form>

        </div>

        {/* Close button for the modal backdrop */}
        <form method="dialog" className="modal-backdrop">
        <button>Close</button>
        </form>

    </dialog>
  );
};

export default AddProductModal;
