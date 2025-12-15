import React, { useEffect, useState, useCallback } from "react";
import { FilterProvider } from "./context/FilterContext";
import { fetchProducts } from "./api/productApi";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";
import Pagination from "./components/Pagination";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0); // Track filtered products

  const updateFilteredCount = useCallback((count) => setFilteredCount(count), []);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      const cats = Array.from(new Set(data.map((p) => p.category)));
      setCategories(cats);
    };
    loadProducts();
  }, []);

  return (
    <FilterProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Product Filter + Search + Pagination</h1>
        <Filters categories={categories} />
        <ProductGrid products={products} setFilteredCount={updateFilteredCount} />
        <Pagination totalItems={filteredCount} />
      </div>
    </FilterProvider>
  );
}

export default App;
