import React from "react";
import { useSearch } from "../../context/SearchContext";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchWarehouseProducts } from "../../redux/features/customer/customerSlice";
import WaitingAnimation from "../../constant/WaitingAnimation";



function ProductList() {

  const dispatch = useDispatch();
  const { warehouseProducts, status, error } = useSelector((state) => state.customerWarehouse);
  const { searchTerm } = useSearch();

  useEffect(() => {
    dispatch(fetchWarehouseProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <WaitingAnimation/>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }


  const flattenedProducts = warehouseProducts.flatMap(product =>
    product.goods.map(item => ({
      id: item.vendorProductId || `custom_${item.warehouseId}`, // Use a custom ID if vendorProductId doesn't exist
      name: item.goodsName,
      price: item.price,
      category: item.goodsCategoryName,
      stock: item.stocks,
      vendorName: item.vendorDetails?.vendorName || "Others" // Use "Others" if vendorName doesn't exist
    }))
  );

  const sortedProductData = [...flattenedProducts].sort((a, b) =>
    a.categoryName?.localeCompare(b.categoryName)
  );

  const filteredProducts = sortedProductData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toString().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.stock.toString().includes(searchTerm.toLowerCase()) ||
      (product.vendorName && product.vendorName.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  return (
    <div className="p-6 mt-5 bg-gray-50 dark:bg-gray-800 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Product List</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-800 border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead className="bg-blue-600 dark:bg-gray-800 text-white">
            <tr className="font-semibold border-b border-blue-700">
              {/* <th className="px-4 py-2">Product ID</th> */}
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Vendor Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className={`border-b ${product.id % 2 === 0 ? "bg-gray-100 dark:bg-gray-800 dark:text-white" : "bg-white dark:bg-gray-800 dark:text-white"
                  } hover:bg-blue-50`}
              >
                {/* <td className="px-4 py-2">{product.id}</td> */}
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.vendorName ? product.vendorName : "Others"}</td>
                <td className="px-4 py-2">
                  {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
