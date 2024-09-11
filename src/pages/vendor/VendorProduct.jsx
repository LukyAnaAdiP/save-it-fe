// VendorProduct.js
import React, { useState, useEffect } from "react";
import CarouselVendor from "../../components/vendor/CarouselVendor";
import CardProductVendor from "../../components/vendor/CardProductVendor";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { fetchProcurements } from "../../redux/procurementSlice";
import Modal from "../../components/modals/Modal";
import { useSearch } from "../../context/SearchContext";
import SearchInput from "../../constant/SearchInput";
import Filter from "../../components/vendor/Filter";

function VendorProduct() {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({ category: [], vendor: [] });
  const dispatch = useDispatch();
  const { procurements, status, error } = useSelector((state) => state.procurements);
  const { searchTerm } = useSearch();
  

  useEffect(() => {
    dispatch(fetchProcurements());
  }, [dispatch]);

  const handleDetailsClick = (id) => {
    const product = procurements.find((p) => p.vendorProductId === id);
    if (product) {
      setSelectedProduct(product);
    } else {
      console.error(`Product with id ${id} not found`);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleFilterChange = (filterType, value, isChecked = null) => {
    setFilters(prevFilters => {
      if (filterType === 'category') {
        // Toggle the category
        const newCategories = prevFilters.category.includes(value)
          ? prevFilters.category.filter(cat => cat !== value)
          : [...prevFilters.category, value];
        return { ...prevFilters, category: newCategories };
      } else if (filterType === 'vendor') {
        // Handle vendor checkboxes
        const newVendors = isChecked
          ? [...prevFilters.vendor, value]
          : prevFilters.vendor.filter(v => v !== value);
        return { ...prevFilters, vendor: newVendors };
      }
      return prevFilters;
    });
  };

  const filteredProcurements = procurements.filter((product) => {
    const matchesSearch =
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toString().includes(searchTerm);

    const matchesCategory = filters.category.length === 0 ||
      filters.category.includes(product.productCategory.charAt(0).toUpperCase() + product.productCategory.slice(1).toLowerCase());

    const matchesVendor = filters.vendor.length === 0 ||
      filters.vendor.includes(product.vendorName);

    return matchesSearch && matchesCategory && matchesVendor;
  });

  return (
    <>
    <div className="overflow-hidden">
      <CarouselVendor />
      <div className="relative px-4 mt-10">
        <SearchInput />
      </div>
      {/* <div className="flex"> */}
        <div className="mx-4 p-4">
          <Filter onFilterChange={handleFilterChange} />
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-96">
          {status === "loading" && <p>Loading...</p>}
          {status === "succeeded" && filteredProcurements.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No products found</p>
          )}
          {status === "succeeded" && filteredProcurements.map((product) => (
            <CardProductVendor
              key={product.vendorProductId}
              id={product.vendorProductId}
              name={product.productName}
              category={product.productCategory}
              vendorName={product.vendorName}
              stock={product.stocks}
              price={product.price}
              image={product.productImage.url}
              description={product.productDescription}
              isDescriptionVisible={isDescriptionVisible === product.vendorProductId}
              onDetailClick={handleDetailsClick}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
        {/* </div> */}
      {/* </div> */}
      <Modal isOpen={selectedProduct !== null} onClose={handleCloseModal}>
        {selectedProduct && (
          <>
            <h4 className="text-black text-sm font-semibold my-2">Vendor: {selectedProduct.vendorName}</h4>
            <p className="text-gray-600">{selectedProduct.productDescription}</p>
          </>
        )}
      </Modal>
      </div>
    </>
  );
}

export default VendorProduct;