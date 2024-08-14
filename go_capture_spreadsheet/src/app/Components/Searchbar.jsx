"use client"
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex justify-center mt-4">
      <input
        type="text"
        className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
