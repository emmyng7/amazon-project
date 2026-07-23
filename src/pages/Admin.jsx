import { useContext, useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ProductContext } from "../context/ProductContext";

function Admin() {
  const {
    products,
    addProduct,
    deleteProduct,
    updateProduct,
  } = useContext(ProductContext);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    thumbnail: "",
  });

  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [highlightId, setHighlightId] = useState(null);
  const [localProducts, setLocalProducts] = useState([]);

  const productRefs = useRef({});

  // Sync local products with context products
  useEffect(() => {
    console.log("Products updated in context:", products);
    setLocalProducts(products || []);
  }, [products]);

  // Debug: Log local products when they change
  useEffect(() => {
    console.log("Local products:", localProducts);
  }, [localProducts]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function resetForm() {
    setForm({
      title: "",
      price: "",
      category: "",
      thumbnail: "",
    });

    setPreview("");
    setEditingId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!form.title || !form.price || !form.category) {
      toast.error("Please fill in all fields");
      return;
    }

    const productData = {
      title: form.title,
      price: Number(form.price),
      category: form.category,
      thumbnail: form.thumbnail || "https://via.placeholder.com/150?text=No+Image",
      rating: 5,
      stock: 50,
      brand: "Amazon",
      description: "Amazon Product",
      discountPercentage: 0,
      images: [form.thumbnail || "https://via.placeholder.com/150?text=No+Image"],
    };

    if (editingId) {
      // Update existing product
      const updatedProduct = {
        id: editingId,
        ...productData,
      };

      updateProduct(updatedProduct);
      toast.success("Product updated successfully");
      resetForm();
      
      // Scroll to the updated product
      setTimeout(() => {
        const ref = productRefs.current[editingId];
        if (ref) {
          ref.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 300);
      
      return;
    }

    // Add new product
    const newProduct = {
      id: Date.now(),
      ...productData,
    };

    console.log("Adding new product:", newProduct);
    addProduct(newProduct);

    toast.success("Product added successfully!");

    // Highlight the new product
    setHighlightId(newProduct.id);

    // Reset form
    resetForm();

    // Scroll to the new product after it's added
    setTimeout(() => {
      // Force a re-render to get the updated products list
      setLocalProducts([...products, newProduct]);
      
      setTimeout(() => {
        const ref = productRefs.current[newProduct.id];
        if (ref) {
          ref.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } else {
          console.log("Product ref not found, scrolling to bottom");
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 200);
    }, 100);

    setTimeout(() => {
      setHighlightId(null);
    }, 4000);
  }

  function handleEdit(product) {
    setEditingId(product.id);

    setForm({
      title: product.title || "",
      price: product.price || "",
      category: product.category || "",
      thumbnail: product.thumbnail || "",
    });

    setPreview(product.thumbnail || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;

    deleteProduct(id);
    toast.success("Product deleted");
  }

  // Filter products based on search
  const filteredProducts = (localProducts || []).filter((product) =>
    product.title?.toLowerCase().includes(search.toLowerCase()) || false
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pt-28 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Dashboard Header */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 shadow-xl mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-4xl font-extrabold">
                Amazon Admin Dashboard
              </h1>
              <p className="mt-3 text-gray-300">
                Manage products, inventory and categories from one place.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4">
                <p className="text-sm text-gray-300">
                  Total Products
                </p>
                <h2 className="text-3xl font-bold">
                  {(localProducts || []).length}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg">
            <p className="text-gray-500 dark:text-gray-400">
              Total Products
            </p>
            <h2 className="text-4xl font-bold mt-3 dark:text-white">
              {(localProducts || []).length}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg">
            <p className="text-gray-500 dark:text-gray-400">
              Categories
            </p>
            <h2 className="text-4xl font-bold mt-3 dark:text-white">
              {[...new Set((localProducts || []).map(item => item.category))].length}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg">
            <p className="text-gray-500 dark:text-gray-400">
              Average Price
            </p>
            <h2 className="text-4xl font-bold mt-3 dark:text-white">
              $
              {(localProducts || []).length
                ? (
                    (localProducts || []).reduce(
                      (sum, item) => sum + (item.price || 0),
                      0
                    ) / (localProducts || []).length
                  ).toFixed(0)
                : 0}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg">
            <p className="text-gray-500 dark:text-gray-400">
              Average Rating
            </p>
            <h2 className="text-4xl font-bold mt-3 dark:text-white">
              {(localProducts || []).length
                ? (
                    (localProducts || []).reduce(
                      (sum, item) => sum + (item.rating || 0),
                      0
                    ) / (localProducts || []).length
                  ).toFixed(1)
                : "0.0"}
            </h2>
          </div>
        </div>

        {/* Add Product Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 mb-10">
          <h2 className="text-3xl font-bold dark:text-white mb-2">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Fill in the product information below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Product Title"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white p-4"
              required
            />

            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white p-4"
              required
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white p-4"
              required
            >
              <option value="">Select Category</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="fragrances">Fragrances</option>
              <option value="skincare">Skincare</option>
              <option value="groceries">Groceries</option>
              <option value="home-decoration">Home Decoration</option>
              <option value="furniture">Furniture</option>
              <option value="tops">Tops</option>
              <option value="mens-shirts">Men's Shirts</option>
              <option value="mens-shoes">Men's Shoes</option>
              <option value="womens-dresses">Women's Dresses</option>
              <option value="womens-shoes">Women's Shoes</option>
              <option value="beauty">Beauty</option>
            </select>

            <input
              type="text"
              value={form.thumbnail}
              onChange={(e) => {
                setForm({
                  ...form,
                  thumbnail: e.target.value,
                });
                setPreview(e.target.value);
              }}
              placeholder="Image URL (or upload below)"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white p-4"
            />

            <input
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white p-4"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64String = reader.result;
                  setPreview(base64String);
                  setForm({
                    ...form,
                    thumbnail: base64String,
                  });
                };
                reader.readAsDataURL(file);
              }}
            />

            {preview && (
              <div className="border rounded-2xl p-5 bg-gray-50 dark:bg-gray-800">
                <p className="font-semibold mb-4 dark:text-white">
                  Image Preview
                </p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-52 h-52 object-contain mx-auto"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150?text=Invalid+Image";
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 py-4 rounded-xl text-lg font-bold transition"
            >
              {editingId ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold dark:text-white">
              Product Inventory ({filteredProducts.length} products)
            </h2>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded-xl p-3"
            />
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-5">
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10 text-center">
              <h2 className="text-2xl font-bold dark:text-white">
                {(localProducts || []).length === 0 ? "No Products Yet" : "No products match your search"}
              </h2>
              <p className="text-gray-500 mt-3">
                {(localProducts || []).length === 0 
                  ? "Start by adding your first product above." 
                  : "Try adjusting your search terms."}
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                ref={(el) => {
                  if (el) {
                    productRefs.current[product.id] = el;
                  }
                }}
                className={`bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-center gap-6 transition-all duration-300 hover:shadow-2xl ${
                  highlightId === product.id
                    ? "ring-4 ring-yellow-400 scale-[1.02]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <img
                    src={product.thumbnail || "https://via.placeholder.com/150?text=No+Image"}
                    alt={product.title || "Product"}
                    className="w-28 h-28 object-contain rounded-2xl border bg-white p-2"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150?text=Product";
                    }}
                  />
                  <div>
                    <h2 className="text-xl font-bold dark:text-white">
                      {product.title || "Untitled Product"}
                    </h2>
                    <p className="text-gray-500 mt-1">
                      Category: {product.category || "Uncategorized"}
                    </p>
                    <p className="text-yellow-500 font-bold text-2xl mt-2">
                      ${product.price || 0}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="dark:text-white">{product.rating || 5}</span>
                      <span className="text-green-500 ml-2">✓ In Stock</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Floating Scroll Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 shadow-xl text-2xl"
          >
            ↑
          </button>
          <button
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
            className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl text-2xl"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;