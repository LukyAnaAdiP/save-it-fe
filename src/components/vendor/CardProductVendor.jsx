import React, { useState } from "react";
import { IconChevronDown, IconChevronUp, IconShoppingCart, IconX } from "@tabler/icons-react";
import { formatIDR } from "../../utils/formatIDR";

function CardProductVendor({
  id,
  name,
  vendorName,
  price,
  category,
  stock,
  image,
  description,
  onAddToCart,
}) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const product = {
    id,
    name,
    vendorName,
    price,
    category,
    stock,
    image,
    description,
  };


  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

  return (
    <div className="bg-white w-64 rounded-xl shadow-md overflow-hidden transform transition duration-500 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img className="w-full h-48 object-cover cursor-pointer" src={image} alt="Product" onClick={openImageModal} />
        <div className="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 m-2 rounded-full text-xs font-bold">
          {category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-xs text-gray-600 mb-2">{vendorName}</p>

        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-orange-600">
            {formatIDR(price)}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${stock > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
              }`}
          >
            {stock > 0 ? `${stock} left` : "Out of Stock"}
          </span>
        </div>

        <button
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300 flex items-center justify-center text-sm"
          onClick={stock > 0 ? () => onAddToCart(product) : null}
          disabled={stock <= 0}
        >
          <IconShoppingCart size={16} className="mr-2" />
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>

        <button
          className="w-full mt-2 text-orange-600 hover:text-orange-700 focus:outline-none flex items-center justify-center text-sm"
          onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
        >
          {isDescriptionVisible ? "Hide Details" : "Show Details"}
          {isDescriptionVisible ? (
            <IconChevronUp className="ml-2" size={14} />
          ) : (
            <IconChevronDown className="ml-2" size={14} />
          )}
        </button>
      </div>
      <div
        className={`bg-orange-50 p-4 transition-all duration-300 ease-in-out ${isDescriptionVisible ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
      >
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg max-w-3xl max-h-3xl">
            <img
              src={image}
              alt={name}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <IconX size={24} />
            </button>
          </div>
        </div>
      )}
    </div>


  );
}

export default CardProductVendor;