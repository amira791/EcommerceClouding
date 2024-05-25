import React, { useState, useEffect } from 'react';
import ProductCard from '../Components/ProductCard';
import SearchAndFilterComponent from '../Components/SearchAndFilterComponent';
import Navbar from '../Components/Navbar';
import AddProduct from '../Components/AddProduct';
import axios from 'axios';
function List() {

  
  const [products,setProducts] = useState(Array.from({ length: 20 }, (_, index) => ({
    idproduct: index + 1,
    name: `Product ${index + 1}`,
    price: `$${(index + 1) * 10}`,
    quantity: index + 1,
    category: `Category ${(index % 5) + 1}`, 
    user: `User ${index + 1}`, 
  })))
  
  // get the categories here 
  const [categories,setCategories] = useState([
    { idCategorie: 1, name: 'Category 1' },
    { idCategorie: 2, name: 'Category 2' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice,setMaxPrice] = useState('')
  const [maxQuantity,setMaxQuantity] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('');


  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/products')
      .then(response => {
        setProducts(response.data);
        console.log(products)
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });
      axios.get('http://localhost:4000/api/v1/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });
  }, []); 

  useEffect(() => {
    console.log(selectedCategory)
    axios.get(`http://localhost:4000/api/v1/products/filterByCategory/${selectedCategory}`)
    .then(response => {
      setProducts(response.data);
    })
    .catch(error => {
      console.error('Error fetching data from the server:', error);
    });
  }, [selectedCategory]); 
  useEffect(() => {
    // Check if both startDate and endDate are set
    if ( maxPrice!== null) {
      axios.get(`http://localhost:4000/api/v1/products/filterByPrice/${maxPrice}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });
    }
  }, [maxPrice]); 

  useEffect(() => {
    // Check if both startDate and endDate are set
    if ( maxPrice!== null) {
      axios.get(`http://localhost:4000/api/v1/products/filterByQuantity/${maxQuantity}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });
    }
  }, [maxQuantity]); 


  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handlePriceChange = (event) => {
    // Fetch data from backend based on max price
    const maxPrice = event.target.value;
    setMaxPrice(maxPrice)
  };

  const handleQuantityChange = (event) => {
    // Fetch data from backend based on min quantity
    const minQuantity = event.target.value;
    setMaxQuantity(maxQuantity)
  };


  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
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
          <ProductCard 
             key={product.idproduct} 
             idProduct={product.idproduct} 
             price={product.price} 
             name={product.name}
             category={product.category}
             user={product.user}
             quantity={product.quantity} />
        ))}
      </div>
      
    </>
  );
}
export default List;
