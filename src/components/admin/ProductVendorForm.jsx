import React, { useState } from 'react';

function ProductVendorForm({ vendorId, addProduct }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ productName, price, quantity, description, vendorId });
    setProductName('');
    setPrice('');
    setQuantity('');
    setDescription('')
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Add Product to Vendor</h2>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="mt-1 p-2 w-full border rounded dark:bg-gray-900"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Price</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 p-2 w-full border rounded dark:bg-gray-900"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="mt-1 p-2 w-full border rounded dark:bg-gray-900"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 w-full border rounded dark:bg-gray-900"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Product
      </button>
    </form>
  );
}

export default ProductVendorForm;
