import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProducts,
  fetchCategories,
  fetchWarehouseProducts,
} from "../redux/features/customer/customerSlice";
import Swal from "sweetalert2";
import { IconTrash } from '@tabler/icons-react'

function AddNewProductWarehouse({ onClose }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.customerWarehouse.categories);
  const categoriesStatus = useSelector((state) => state.customerWarehouse.status);

  const [products, setProducts] = useState([{
    goodsName: "",
    goodsCategory: "",
    goodsDescription: "",
    goodsImage: null,
    price: "",
    stocks: ""
  }]);

  useEffect(() => {
    if (categoriesStatus === 'idle' && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesStatus, categories]);

  const handleInputChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleCategoryChange = (index, value) => {
    handleInputChange(index, "goodsCategory", value);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    handleInputChange(index, "goodsImage", file);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        goodsName: "",
        goodsCategory: "",
        goodsDescription: "",
        goodsImage: null,
        price: "",
        stocks: "",
      },
    ]);
  };

  const handleRemoveProduct = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        );
      }
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    products.forEach((product, index) => {
      const selectedCategory = categories.find(category => category.categoryName === product.goodsCategory);
      console.log(selectedCategory.id);

      if (!selectedCategory) {
        console.error(`Category "${product.goodsCategory}" not found`);
        return;
      }

      formData.append(
        `customerGoodsRequests[${index}].goodsName`,
        product.goodsName
      );
      formData.append(
        `customerGoodsRequests[${index}].goodsCategoryId`,
        selectedCategory.id
      );
      formData.append(
        `customerGoodsRequests[${index}].goodsDescription`,
        product.goodsDescription
      );
      formData.append(`customerGoodsRequests[${index}].price`, product.price);
      formData.append(`customerGoodsRequests[${index}].stocks`, product.stocks);
      formData.append(
        `customerGoodsRequests[${index}].goodsImage`,
        product.goodsImage
      );
    });

    try {
      await dispatch(addProducts(formData)).unwrap();
      await dispatch(fetchWarehouseProducts());
      onClose();
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  return (
    // <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add New Products</h2>
      {products.map((product, index) => (
        <div key={index} className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">Product {index + 1}</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={product.goodsName}
              onChange={(e) =>
                handleInputChange(index, "goodsName", e.target.value)
              }
              placeholder="Product Name"
              className="w-full px-3 py-2 border rounded-md"
            />
            <select
              value={product.goodsCategory}
              onChange={(e) => handleCategoryChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Category</option>
              {categories?.map(category => (
                <option key={category.id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <textarea
              value={product.goodsDescription}
              onChange={(e) =>
                handleInputChange(index, "goodsDescription", e.target.value)
              }
              placeholder="Description"
              className="w-full px-3 py-2 border rounded-md col-span-2"
            />
            <input
              type="file"
              onChange={(e) => handleImageChange(index, e)}
              className="w-full text-sm py-2 border rounded-md"
            />
            <input
              type="number"
              value={product.price}
              min={0}
              onChange={(e) =>
                handleInputChange(index, "price", e.target.value)
              }
              placeholder="Price"
              className="w-full px-3 py-2 border rounded-md"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={product.stocks}
                min={0}
                onChange={(e) =>
                  handleInputChange(index, "stocks", e.target.value)
                }
                placeholder="Stock"
                className="w-full px-3 py-2 border rounded-md"
              />
              <div className="flex justify-end items-center col-span-1">
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(index)}
                  className="bg-red-500 flex text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Remove
                  <IconTrash />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Another Product
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          {status === "loading" ? "Submitting..." : "Submit All Products"}
        </button>
      </div>
    </form>
    /* </div> */
  );
}

export default AddNewProductWarehouse;
