import React, { useContext, useMemo } from "react";
import { FilterContext } from "../context/FilterContext";

const ProductGrid = ({ products, setFilteredCount }) => {
  const { searchTerm, category, priceRange, currentPage, itemsPerPage } =
    useContext(FilterContext);

  // Filter products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      const title = (p.title || "").toLowerCase();
      if (searchTerm && !title.includes(searchTerm.toLowerCase())) return false;
      if (category !== "all" && p.category !== category) return false;
      const price = p.price || 0;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      return true;
    });
    setFilteredCount(filtered.length); // Update filtered product count
    return filtered;
  }, [products, searchTerm, category, priceRange, setFilteredCount]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {paginatedProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105"
        >
          <img
            src={product.image || "https://via.placeholder.com/300x300?text=No+Image"}
            alt={product.title}
            className="h-48 w-full object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h2>
            <p className="text-gray-600 mt-1">${product.price}</p>
            <p className="text-sm text-gray-500 mt-2">{product.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
