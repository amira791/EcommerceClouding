
// SearchAndFilterComponent.js
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';

function SearchAndFilterComponent({ categories, handleSearchChange, handlePriceChange, handleQuantityChange, handleCategoryChange }) {
  return (
    <div className="flex items-center justify-between  rounded-md p-2">
      {/* Search bar */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search..." 
          className="p-2 pl-10 border-0 rounded-md bg-SoftGreen focus:outline-none"
          onChange={handleSearchChange} 
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
      </div>

      {/* Filters */}
      <div className="flex items-center justify-end">

        <select 
          className="p-2 border-0 rounded-md bg-SoftGreen focus:outline-none mr-4 text-white"
          onChange={handleCategoryChange}
        >
          <option value="" className='bg-SoftGreen'>All Categories</option>
          {categories.map(category => (
            <option key={category.idCategorie} value={category.idCategorie}>{category.name}</option>
          ))}
        </select>
        <input 
          type="text" 
          placeholder="Max Price" 
          className="p-2 border-0 rounded-md bg-SoftGreen focus:outline-none mr-4 w-1/5"
          onChange={handlePriceChange}
        />
        <input 
          type="text" 
          placeholder="Min Quantity" 
          className="p-2 border-0 rounded-md bg-SoftGreen focus:outline-none mr-4 w-1/5"
          onChange={handleQuantityChange}
        />
      </div>
    </div>
  );
}

export default SearchAndFilterComponent;
