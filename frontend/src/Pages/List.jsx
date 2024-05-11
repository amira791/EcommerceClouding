import React, { useState } from 'react';
import ProductCard from '../Components/ProductCard';
import SearchAndFilterComponent from '../Components/SearchAndFilterComponent';
import Navbar from '../Components/Navbar';
import AddProduct from '../Components/AddProduct';

function List() {
  // get the products here 
  const products = Array.from({ length: 20 }, (_, index) => ({
    idProduct: index + 1,
    name: `Product ${index + 1}`,
    price: `$${(index + 1) * 10}`,
    quantity: index + 1,
    category: `Category ${(index % 5) + 1}`, 
    user: `User ${index + 1}`, 
  }));
  
  // get the categories here 
  const categories = [
    { idCategorie: 1, name: 'Category 1' },
    { idCategorie: 2, name: 'Category 2' },
  ];

  const handleSearchChange = (event) => {
    // Fetch data from backend based on search query
    const searchQuery = event.target.value;
    console.log('Search query:', searchQuery);
  };

  const handlePriceChange = (event) => {
    // Fetch data from backend based on max price
    const maxPrice = event.target.value;
    console.log('Max price:', maxPrice);
  };

  const handleQuantityChange = (event) => {
    // Fetch data from backend based on min quantity
    const minQuantity = event.target.value;
    console.log('Min quantity:', minQuantity);
  };
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    // Fetch data from backend based on selected category
    console.log('Selected category:', selectedCategoryId);
  };


  return (
    <>
    <Navbar/>
      <SearchAndFilterComponent
        categories={categories}
        handleCategoryChange={handleCategoryChange}
        handlePriceChange={handlePriceChange}
        handleSearchChange={handleSearchChange}
        handleQuantityChange={handleQuantityChange} />
      <AddProduct/>
      <div className="grid grid-cols-4 gap-4 px-16 py-2">
        {products.map(product => (
          <ProductCard key={product.idProduct} product={product} />
        ))}
      </div>
      
    </>
  );
}
export default List;
