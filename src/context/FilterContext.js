import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  return (
    <FilterContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        category,
        setCategory,
        priceRange,
        setPriceRange,
        currentPage,
        setCurrentPage,
        itemsPerPage,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
