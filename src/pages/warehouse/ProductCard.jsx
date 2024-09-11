import React, { useState, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import Modal from "../../components/modals/Modal";
import EditForm from "../../components/EditForm";
import { useSidebar } from "../../context/SidebarContext";
import AddNewProductWarehouse from "../../components/AddNewProductWarehouse";
import { useDispatch, useSelector } from "react-redux";
import { fetchWarehouseProducts } from "../../redux/features/customer/customerSlice";
import { Link } from "react-router-dom";
import WaitingAnimation from "../../constant/WaitingAnimation";

function ProductCard() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isSidebarOpen } = useSidebar();
  const { searchTerm } = useSearch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState(null);


  const dispatch = useDispatch();
  const { warehouseProducts, status, error } = useSelector((state) => state.customerWarehouse);

  const productTypes = ["Product Vendor", "My Product"];

  useEffect(() => {
    if (status === "idle" && warehouseProducts.length === 0) {
      dispatch(fetchWarehouseProducts());
    }
    // dispatch(fetchWarehouseProducts());
  }, [dispatch, status]);

  const openModal = (type, product) => {
    setFormType(type);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setFormType(null);
  };

  const toPascalCase = (str) => {
    return str?.replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
  };

  // Extract unique categories and vendors from the fetched data
  const categories = [...new Set(warehouseProducts.flatMap(product =>
    product.goods?.map(item => toPascalCase(item.goodsCategoryName))
  ))];
  const vendors = [...new Set(warehouseProducts.flatMap(product =>
    product.goods?.map(item =>
      (item.vendorDetails && item.vendorDetails.vendorName) ? item.vendorDetails.vendorName : "Others"
    )
  ))];

  const DiagonalBadge = ({ type }) => {
    const badgeText = type === "TRANSACTION PRODUCT" ? "Product Vendor" : "My Product";
    const badgeColor = type === "TRANSACTION PRODUCT" ? "bg-blue-500" : "bg-green-500";

    // console.log(`Diagonal badge type: ${type}`);

    return (
      <div className={`absolute top-0 right-0 ${badgeColor} text-white px-1 py-1 text-xs font-bold transform`}>
        {badgeText}
      </div>
    );
  };

  // Update the filtering logic to compare Pascal case categories
  const filteredProducts = warehouseProducts.flatMap(product =>
    product.goods?.filter(item =>
      (selectedCategory === "" || toPascalCase(item.goodsCategoryName) === selectedCategory) &&
      (selectedVendor === "" ||
        (item.vendorDetails && item.vendorDetails.vendorName === selectedVendor) ||
        (!item.vendorDetails && selectedVendor === "Others")) &&
      (selectedType === "" ||
        (selectedType === "Product Vendor" && product.type === "TRANSACTION PRODUCT") ||
        (selectedType === "My Product" && product.type === "CUSTOMER GOODS")) &&
      (item.goodsName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.goodsCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.vendorDetails && item.vendorDetails.vendorName.toLowerCase().includes(searchTerm.toLowerCase())))
    ).map(item => ({
      ...item,
      type: product.type
    }))

  );


  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor === selectedVendor ? "" : vendor);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type === selectedType ? "" : type);
  };

  const handleClear = () => {
    setSelectedVendor("");
    setSelectedCategory("");
    setSelectedType("");
  };

  const truncateDescription = (description, maxLength) => {
    if (description?.length <= maxLength) return description;
    return description?.slice(0, maxLength) + '...';
  };

  if (status === "loading") {
    return <WaitingAnimation/>;
  }

  if (status === "failed") {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-5">

      {/* Filter Category */}
      <label htmlFor="category" className="block text-gray-700 dark:text-white">
        Filter by Category
      </label>
      <div className="flex flex-wrap items-center mb-4 space-x-2 overflow-x-auto">
        {categories.map((category, index) => (
          <div
            key={`category-${index}-${category}`}
            onClick={() => handleCategoryClick(category)}
            className={`m-2 h-8 px-5 py-2 flex items-center text-sm border dark:bg-transparent dark:text-white hover:bg-orange-500 rounded-3xl cursor-pointer transition-all duration-300 ${selectedCategory === category
              ? "border-orange-500 bg-orange-500 text-white dark:bg-orange-500"
              : "border-gray-500 bg-white text-gray-900"
              }`}
          >
            {category}
          </div>
        ))}

        {/* Filter Clear */}
        {(selectedCategory || selectedVendor || selectedType) && (
          <div onClick={handleClear} className="h-8 px-5 flex items-center font-medium text-blue-500 cursor-pointer dark:text-white hover:text-blue-700 transition-all duration-300">
            Clear all
          </div>
        )}
      </div>

      {/* Filter Vendor */}
      <label htmlFor="vendor" className="block text-gray-700 dark:text-white">
        Filter by Vendor
      </label>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex flex-wrap items-center mb-4 space-x-2 overflow-x-auto">
          {vendors.map((vendor, index) => (
            <div
              key={`vendor-${index}-${vendor}`}
              onClick={() => handleVendorClick(vendor)}
              className={`m-2 h-8 px-5 py-2 flex items-center text-sm border dark:bg-transparent dark:text-white rounded-3xl hover:bg-orange-500 cursor-pointer transition-all duration-300 ${selectedVendor === vendor
                ? "border border-orange-500 bg-orange-500 dark:bg-orange-500 text-white"
                : "border-gray-500 bg-white text-gray-900"
                }`}
            >
              {vendor}
            </div>
          ))}
        </div>
      </div>

      {/* Filter Type */}
      <label htmlFor="type" className="block text-gray-700 dark:text-white" style={{ marginTop: "-20px" }}>
        Filter by Product Type
      </label>
      <div className="flex flex-wrap items-center mb-4 space-x-2 overflow-x-auto">
        {productTypes.map((type, index) => (
          <div
            key={`type-${index}-${type}`}
            onClick={() => handleTypeClick(type)}
            className={`m-2 h-8 px-5 py-2 flex items-center text-sm border dark:bg-transparent dark:text-white hover:bg-orange-500 rounded-3xl cursor-pointer transition-all duration-300 ${selectedType === type
              ? "border-orange-500 bg-orange-500 text-white dark:bg-orange-500"
              : "border-gray-500 bg-white text-gray-900"
              }`}
          >
            {type}
          </div>
        ))}
      </div>

      {/* Product Card */}
      <div
        className={`grid ${isSidebarOpen
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          } gap-6`}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product?.vendorProductId || product?.warehouseId}
              className="bg-white shadow-md rounded-lg overflow-hidden max-w-xs w-60 dark:bg-gray-900 dark:text-white transform transition-transform hover:scale-105"
            >
              <DiagonalBadge type={product?.type} />
              <img
                className="w-full h-40 object-contain"
                src={product?.goodsImage?.url}
                alt={product?.goodsName}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate dark:text-white font-serif">
                  {product?.goodsName}
                </h2>
                <div className="flex justify-between">
                  <p className="text-gray-600 dark:text-white">{product?.goodsCategoryName}</p>
                  <p className="text-gray-600 dark:text-white">{product?.stocks} pcs</p>
                </div>

                <div className="mt-2 flex justify-start">
                  <span className="text-orange-600 font-semibold">
                    {product?.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </span>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-600 text-justify mt-1 mb-5 dark:text-white font-mono">{truncateDescription(product?.goodsDescription, 100)}</p>
                </div>
              </div>
              {product?.type !== 'TRANSACTION PRODUCT' ?
                (
                  <div className=" flex justify-center fixed bottom-1 ml-2 mt-15">
                    <button
                      onClick={() => openModal("EditForm", product)}
                      className="bg-black text-lg text-center text-white px-20 rounded-lg hover:bg-orange-500"
                    >
                      Update
                    </button>
                  </div>
                )
                :
                (
                  <div className="flex justify-center fixed bottom-1 ml-2 mt-15">
                    <Link
                      to='/vendorproduct'
                      className="bg-black text-lg 0 text-center text-white px-4 rounded-lg hover:bg-orange-500"
                    >
                      Restock
                    </Link>
                  </div>
                )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products found matching the selected criteria.
          </div>
        )}
      </div>

      <button onClick={() => openModal("AddNewProductWarehouse")} className="absolute inline bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-black">
        Add new Product
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {formType === "EditForm" && (
          <EditForm onClose={closeModal} product={selectedProduct} />
        )}
        {formType === "AddNewProductWarehouse" && (
          <AddNewProductWarehouse onClose={closeModal} existingImage="" />
        )}
      </Modal>

    </div>
  );
}

export default ProductCard;
