import React, { useState } from 'react';

function VendorForm({ addVendor }) {
  const [vendorName, setVendorName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addVendor({ vendorName, address, email, phoneNumber });
    setVendorName('');
    setAddress('');
    setEmail('');
    setPhoneNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Add Vendor</h2>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Vendor Name</label>
        <input
          type="text"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          className="mt-1 p-2 w-full border rounded dark:bg-gray-900"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 p-2 w-full border rounded dark:bg-gray-900"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 w-full border rounded dark:bg-gray-900"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Phone Number</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1 p-2 w-full border rounded dark:bg-gray-900"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Vendor
      </button>
    </form>
  );
}

export default VendorForm;
