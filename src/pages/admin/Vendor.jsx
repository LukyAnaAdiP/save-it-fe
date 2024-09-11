import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorsAndProducts, addVendor, addProduct } from "../../redux/features/vendor/vendorSlice";
import { IconPlus, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";

function VendorProductPage() {
  const dispatch = useDispatch();
  const vendorandproducts = useSelector((state) => state.vendor.vendorsAndProducts);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [newVendor, setNewVendor] = useState({
    name: "",
    mobilePhoneNo: "",
    address: "",
    email: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    image: null,
    price: "",
    stocks: "",
  });

  useEffect(() => {
    dispatch(fetchVendorsAndProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/product-category?size=400");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleVendorClick = (vendorId) => {
    setSelectedVendor(vendorId);
  };

  const handleInputChange = (e) => {
    setNewVendor({ ...newVendor, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (!selectedVendor) {
      console.error("No vendor selected");
      return;
    }

    formData.append('vendorId', selectedVendor);
    formData.append('productName', newProduct.name);
    formData.append('productDescription', newProduct.description);
    formData.append('productCategoryId', newProduct.category);
    if (newProduct.image) {
      formData.append('productImage', newProduct.image);
    } else {
      console.error("No image selected");
      return;
    }
    formData.append('price', newProduct.price);
    formData.append('stocks', newProduct.stocks);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axiosInstance.post("/products/product-list", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("API Response:", response.data);

      if (response.data) {
        setIsProductModalOpen(false);
        setNewProduct({ name: "", category: "", description: "", image: null, price: "", stocks: "" });
        dispatch(fetchVendorsAndProducts());
      }
    } catch (error) {
      console.error("Failed to add product:", error.response ? error.response.data : error);
    }
  };

  const validateForm = () => {
    let formErrors = {};

    // Validate phone number
    if (!newVendor.mobilePhoneNo) {
      formErrors.mobilePhoneNo = "Phone Number is Required";
    } else if (!/^08\d{9,11}$/.test(newVendor.mobilePhoneNo)) {
      formErrors.mobilePhoneNo = "The phone number must be valid and start with '08' followed by 9 to 11 digits";
    }

    // Validate email
    if (!newVendor.email) {
      formErrors.email = "Email is Required";
    } else if (!/^((?!\.)[a-zA-Z0-9\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(newVendor.email)) {
      formErrors.email = "The email is not in the correct format";
    }

    // Validate other fields
    if (!newVendor.name) formErrors.name = "Name is Required";
    if (!newVendor.address) formErrors.address = "Address is Required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission and validation Vendor
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(addVendor(newVendor)).unwrap();
        setIsModalOpen(false);
        setNewVendor({ name: "", mobilePhoneNo: "", address: "", email: "" });
        dispatch(fetchVendorsAndProducts());
      } catch (error) {
        console.error("Failed to add vendor:", error);
      }
    }
  };

  const handleProductInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productImage") {
      setNewProduct({ ...newProduct, image: files[0] });
    } else {
      const stateKey = name === "productName" ? "name" :
        name === "productDescription" ? "description" :
          name === "productCategoryId" ? "category" :
            name;
      setNewProduct({ ...newProduct, [stateKey]: value });
    }
  };


  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product Vendor</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-4 py-2 flex items-center transition duration-300 ease-in-out" onClick={() => setIsModalOpen(true)}>
          <IconPlus size={20} className="mr-2" />
          Add Vendor
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="vendorSelector" className="block text-gray-700 font-semibold mb-2">
          Select Vendor
        </label>
        <select
          id="vendorSelector"
          className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          onChange={(e) => handleVendorClick(e.target.value)}
          value={selectedVendor || ""}
        >
          <option value="">-- Select a Vendor --</option>
          {vendorandproducts?.map((vendor) => (
            <option key={vendor.vendorDetails.vendorId} value={vendor.vendorDetails.vendorId}>
              {vendor.vendorDetails.vendorName}
            </option>
          ))}
        </select>
      </div>

      {/* Vendor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white p-8 rounded-lg shadow-lg w-96"
            >
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <AnimatePresence>
        {isProductModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white p-10 rounded-lg shadow-lg w-100 max-h-[90vh] overflow-y-auto"
            >

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Add New Product</h2>
                <button onClick={() => setIsProductModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <IconX size={24} />
                </button>
              </div>

              <form onSubmit={handleAddProduct}>
                <div className="mb-4">
                  <label htmlFor="productName" className="block text-gray-700 font-semibold mb-2">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={newProduct.name}
                    onChange={handleProductInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="productCategoryId" className="block text-gray-700 font-semibold mb-2">Category</label>
                  <select
                    id="productCategoryId"
                    name="productCategoryId"
                    value={newProduct.category}
                    onChange={handleProductInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="productDescription" className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea
                    id="productDescription"
                    name="productDescription"
                    value={newProduct.description}
                    onChange={handleProductInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="productImage" className="block text-gray-700 font-semibold mb-2">Product Image</label>
                  <input
                    type="file"
                    id="productImage"
                    name="productImage"
                    onChange={handleProductInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    accept="image/*"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={newProduct.price}
                    onChange={handleProductInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="stocks" className="block text-gray-700 font-semibold mb-2">Stocks</label>
                  <input
                    type="number"
                    id="stocks"
                    name="stocks"
                    value={newProduct.stocks}
                    onChange={handleProductInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-4 py-2 transition duration-300 ease-in-out"
                >
                  Add Product
                </button>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedVendor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Products</h2>
            <button
              onClick={() => setIsProductModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-4 py-2 flex items-center transition duration-300 ease-in-out"
            >
              <IconPlus size={20} className="mr-2" />
              Add Product
            </button>
          </div>
          <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
            <table className="w-full text-left text-gray-800 border-collapse"></table>
          </div>
        </motion.div>
      )}

      {selectedVendor && (
        <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
          <table className="w-full text-left text-gray-800 border-collapse">
            <thead className="bg-gray-200">
              <tr className="text-gray-700">
                <th className="px-6 py-3 font-semibold">Product Name</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold">Description</th>
                <th className="px-6 py-3 font-semibold">Image</th>
              </tr>
            </thead>

            <tbody>
              {vendorandproducts
                ?.filter((vendor) => vendor.vendorDetails.vendorId === selectedVendor)
                .flatMap((vendor) => vendor.products)
                .map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                  >
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.description}</td>
                    <td className="px-6 py-4">
                      <img
                        src={product.image.url}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-full"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add New Vendor</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <IconX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newVendor.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="mobilePhoneNo" className="block text-gray-700 font-semibold mb-2">Mobile Phone</label>
                <input
                  type="tel"
                  id="mobilePhoneNo"
                  name="mobilePhoneNo"
                  value={newVendor.mobilePhoneNo}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.mobilePhoneNo ? 'border-red-500' : ''}`}
                  required
                />
                {errors.mobilePhoneNo && <p className="text-red-500 text-sm mt-1">{errors.mobilePhoneNo}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={newVendor.address}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : ''}`}
                  required
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newVendor.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 transition duration-300 ease-in-out"
              >
                Add Vendor
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}

export default VendorProductPage;