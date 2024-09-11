import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { fetchWarehouseProducts, updateProduct } from "../redux/features/customer/customerSlice";

const EditForm = ({ onClose, product }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    type: "CUSTOMER GOODS",
    warehouseId: "",
    goodsName: "",
    goodsCategoryId: "",
    goodsDescription: "",
    price: 0,
    stocks: 0
  });

  useEffect(() => {
    if (product) {
      setFormData({
        type: "CUSTOMER GOODS",
        warehouseId: product.warehouseId,
        goodsName: product.goodsName,
        goodsCategoryId: product.goodsCategoryId,
        goodsDescription: product.goodsDescription,
        price: product.price,
        stocks: product.stocks
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === "price" || name === "stocks" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      });

      if (result.isConfirmed) {
        await dispatch(updateProduct(formData)).unwrap();
        Swal.fire("Saved!", "", "success");
        dispatch(fetchWarehouseProducts());
        onClose();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    } catch (error) {
      console.error("Error during update:", error);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Are you sure to cancel?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      });

      if (result.isConfirmed) {
        Swal.fire("Canceled!", "", "success");
        onClose();
      } else if (result.isDenied) {
        Swal.fire("Cancelled", "You can continue editing", "info");
      }
    } catch (error) {
      console.error("Error during confirmation:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Update Product</h2>

      <label htmlFor="goodsName" className="block mb-2">
        Product Name
      </label>
      <input
        type="text"
        id="goodsName"
        name="goodsName"
        value={formData.goodsName}
        onChange={handleChange}
        className="border border-gray-300 p-2 rounded w-full mb-4 dark:bg-transparent dark:text-white"
      />

      <label htmlFor="price" className="block mb-2">
        Price
      </label>
      <input
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        step="0.01"
        className="border border-gray-300 p-2 rounded w-full mb-4 dark:bg-transparent dark:text-white"
      />

      <label htmlFor="stocks" className="block mb-2">
        Stock
      </label>
      <input
        type="number"
        id="stocks"
        name="stocks"
        value={formData.stocks}
        onChange={handleChange}
        className="border border-gray-300 p-2 rounded w-full mb-4 dark:bg-transparent dark:text-white"
      />

      <label htmlFor="goodsDescription" className="block mb-2">
        Description
      </label>
      <textarea
        id="goodsDescription"
        name="goodsDescription"
        value={formData.goodsDescription}
        onChange={handleChange}
        className="border border-gray-300 p-2 rounded w-full mb-4 dark:bg-transparent dark:text-white"
      />

      <div className="flex mr-5 justify-center">
        <button
          type="submit"
          className="bg-blue-500 mr-5 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;