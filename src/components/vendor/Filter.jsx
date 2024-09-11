import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import { fetchCategories } from "../../redux/categorySlice";
import { useState } from "react";
import {IconChevronUp, IconChevronDown } from '@tabler/icons-react'


function Filter({ onFilterChange }) {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { categories } = useSelector((state) => state.category);
  const { procurements } = useSelector((state) => state.procurements);
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const uniqueCategories = useMemo(
    () => removeDuplicatesAndStandardize(categories),
    [categories]
  );
  const vendors = useMemo(
    () => [...new Set(procurements.map((product) => product.vendorName))],
    [procurements]
  );

  return (
    <div className="mb-5">
      <h2 className="text-lg text-gray-600 mb-4 ">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-4 mb-8">
        {uniqueCategories.map((category) => (
          <div
            key={category.id}
            className={`bg-white rounded-lg p-2 cursor-pointer hover:shadow-md transition-shadow text-center ${
              selectedCategories.includes(category.categoryName)
                ? "ring-2 ring-blue-500"
                : ""
            }`}
            onClick={() => {
              onFilterChange("category", category.categoryName);
              setSelectedCategories((prev) =>
                prev.includes(category.categoryName)
                  ? prev.filter((cat) => cat !== category.categoryName)
                  : [...prev, category.categoryName]
              );
            }}
          >
            {category.productCategoryImage ? (
              <img
                src={category.productCategoryImage.path}
                alt={category.categoryName}
                className="w-full h-24 object-fit rounded-t-lg mb-2"
              />
            ) : (
              <div className="w-full h-24 bg-gray-200 rounded-t-lg flex items-center justify-center mb-2">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <p className="text-sm font-medium">{category.categoryName}</p>
          </div>
        ))}
      </div>

      <div className="relative -mx-10">
        <button onClick={toggleDropdown} className="inline-flex justify-center w-40 rounded-md border border-gray-300 shadow-sm mx-10 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          Vendor Filters
          {isOpen ? (
            <IconChevronUp className="ml-2 mt-1" size={16} />
          ) : (
            <IconChevronDown className="ml-2 mt-1" size={16} />
          )}
          </button>
      <div className="bg-white mx-10 mt-3 rounded-lg shadow-md transition-transform duration-300 ease-out delay-0">
        {isOpen && (
        <div className="grid grid-cols-8 gap-2 px-5 py-5">
          {vendors.map((vendor) => (
            <div key={vendor} className="flex items-center transition-transform transform origin-top scale-95">
              <input
                type="checkbox"
                id={`vendor-${vendor}`}
                onChange={(e) =>
                  onFilterChange("vendor", vendor, e.target.checked)
                }
                className="mr-2"
              />
              <label htmlFor={`vendor-${vendor}`} className="text-sm">
                {vendor}
              </label>
            </div>
          ))}
        </div>
                    
                )}
      </div>
    </div>
      {/* <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Vendor Filters</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {vendors.map((vendor) => (
            <div key={vendor} className="flex items-center">
              <input
                type="checkbox"
                id={`vendor-${vendor}`}
                onChange={(e) =>
                  onFilterChange("vendor", vendor, e.target.checked)
                }
                className="mr-2"
              />
              <label htmlFor={`vendor-${vendor}`} className="text-sm">
                {vendor}
              </label>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default Filter;

// Helper function to remove duplicates and standardize category names
function removeDuplicatesAndStandardize(categories) {
  const uniqueCategories = {};
  categories.forEach((category) => {
    const standardName = category.categoryName.toLowerCase();
    if (!uniqueCategories[standardName] || category.productCategoryImage) {
      uniqueCategories[standardName] = {
        ...category,
        categoryName:
          category.categoryName.charAt(0).toUpperCase() +
          category.categoryName.slice(1).toLowerCase(),
      };
    }
  });
  return Object.values(uniqueCategories);
}
