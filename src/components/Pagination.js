import React, { useContext, useMemo } from "react";
import { FilterContext } from "../context/FilterContext";

const Pagination = ({ totalItems }) => {
  const { currentPage, setCurrentPage, itemsPerPage } = useContext(FilterContext);

  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage]);

  if (totalPages <= 1) return null; // Hide pagination if only 1 page

  const pages = [...Array(totalPages).keys()].map((x) => x + 1);

  return (
    <div className="flex gap-2 justify-center mt-4 flex-wrap">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "border"}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
