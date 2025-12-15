import React, { useContext, useCallback } from "react";
import { FilterContext } from "../context/FilterContext";

const Filters = ({ categories }) => {
  const { searchTerm, setSearchTerm, category, setCategory, priceRange, setPriceRange, setCurrentPage } =
    useContext(FilterContext);

  const handleSearch = useCallback(
    (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset to first page
    },
    [setSearchTerm, setCurrentPage]
  );

  const handleCategory = useCallback(
    (e) => {
      setCategory(e.target.value);
      setCurrentPage(1);
    },
    [setCategory, setCurrentPage]
  );

  const handlePrice = useCallback(
    (e) => {
      const [min, max] = e.target.value.split("-").map(Number);
      setPriceRange([min, max]);
      setCurrentPage(1);
    },
    [setPriceRange, setCurrentPage]
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 rounded flex-1"
      />

      <select value={category} onChange={handleCategory} className="border p-2 rounded">
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={priceRange.join("-")}
        onChange={handlePrice}
        className="border p-2 rounded"
      >
        <option value="0-1000">All Prices</option>
        <option value="0-50">0 - 50</option>
        <option value="50-100">50 - 100</option>
        <option value="100-500">100 - 500</option>
        <option value="500-1000">500 - 1000</option>
      </select>
    </div>
  );
};

export default Filters;
