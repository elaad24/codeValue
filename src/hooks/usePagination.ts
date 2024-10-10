import { useState } from "react";

interface PaginationProps<T> {
  data: T[];
  itemsPerPage: number;
}

const usePagination = <T>({ data, itemsPerPage }: PaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Go to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Set the page manually
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentItems, // Items on the current page
    currentPage, // Current page number
    totalPages, // Total number of pages
    nextPage, // Function to go to next page
    prevPage, // Function to go to previous page
    goToPage, // Function to go to a specific page
  };
};

export default usePagination;
