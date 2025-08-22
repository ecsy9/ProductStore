import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from '../../store/useProductStore.js';
import { use, useEffect } from "react";
import { Trash2Icon } from "lucide-react";
import SaveIcon from "lucide-react/dist/esm/icons/save.js";

const ProductPage = () => {
  const { 
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct
  } = useProductStore();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id, fetchProduct]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      navigate("/");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button onClick={() => navigate('/')} className="btn btn-ghost mb-4">
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Product image */}
        <div className="rounded-lg bg-gray-900 p-6 shadow-lg">
          <img
            src={currentProduct?.image || '/placeholder.png'}
            alt={currentProduct?.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        </div>

        {/* Product form */}
        <div className="card bg-gray-900 p-6 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Edit Product</h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              updateProduct(id);
            }}
              className="space-y-4"
            >

              {/* Product Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300">Product Name </span>
                </label>
                <input
                  id="name"
                  placeholder="Enter product name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input input-bordered bg-gray-800 text-gray-100"
                  required
                />
              </div>

              {/* Product Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300">Price (£) </span>
                </label>
                <input
                  id="price"
                  placeholder="Enter product price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="input input-bordered bg-gray-800 text-gray-100"
                  required
                />
              </div>

              {/* Product Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300">Description </span>
                </label>
                <textarea
                  id="description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="textarea textarea-bordered bg-gray-800 text-gray-100"
                  required
                />
              </div>

              {/* Product Image URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300">Image URL </span>
                </label>
                <input
                  id="image"
                  placeholder="Enter product image URL"
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="input input-bordered bg-gray-800 text-gray-100"
                  required
                />
              </div>

              {/* FORM ACTIONS */}
              <div className="form-control mt-6">
                <button type="button" onClick={handleDelete} className="btn btn-primary">
                  <Trash2Icon className="mr-2" />
                  Delete Product
                </button>

                <button
                  type="submit"
                  className="btn btn-secondary ml-2"
                  disabled={loading || !formData.name || !formData.description || !formData.price || !formData.image}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <SaveIcon className="mr-2" />
                      Save Changes  
                    </>
                  )}
                </button>

              </div>

            </form>
          </div>
        </div>
      </div>
    </div>

  )

};

export default ProductPage;
