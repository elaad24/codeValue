import React, { useState, useEffect } from "react";
import text from "../text.json";

// Debounce utility function
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface searchbarintgerface {
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ setState }: searchbarintgerface) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce

  // Simulate API search (for example purposes)
  useEffect(() => {
    setState(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        style={{ borderRadius: "6px", border: "1px solid black" }}
        type="text"
        placeholder={text.searchProduct}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value || "");
        }}
      />
    </div>
  );
}
