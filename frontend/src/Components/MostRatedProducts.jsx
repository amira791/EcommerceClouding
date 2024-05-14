import React, { useState ,useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js/auto';
import axios from 'axios';
ChartJS.register(Title, Tooltip, Legend);

function MostRatedProducts() {

  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/rated')
      .then(response => {
        setProductsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });
  }, []); 
  // Sample data for the most rated products
  const [productsData,setProductsData] = useState([
    { product_name: 'Product A', avg_rating: 4.3 },
    { product_name: 'Product B', avg_rating: 5 },
    { product_name: 'Product C', avg_rating: 4.5 },
    { product_name: 'Product D', avg_rating: 3.4 },
    { product_name: 'Product E', avg_rating: 4.2 },
    { product_name: 'Product F', avg_rating: 4.7 },
    { product_name: 'Product G', avg_rating: 5 },
    { product_name: 'Product H', avg_rating: 3 },
    { product_name: 'Product I', avg_rating: 2 },
    { product_name: 'Product J', avg_rating: 4.8 },
    { product_name: 'Product K', avg_rating: 3 },
    { product_name: 'Product L', avg_rating: 5 },
    { product_name: 'Product M', avg_rating: 2 },
    { product_name: 'Product N', avg_rating: 3 },
    { product_name: 'Product O', avg_rating: 4 },
  ]);

  
  const [numberOfProducts, setNumberOfProducts] = useState(5); // Default to 5 products
  const handleNumberOfProductsChange = (event) => {
    setNumberOfProducts(Number(event.target.value));
  };
  const filteredProductsData = productsData
    .sort((a, b) => b.avg_rating - a.avg_rating)
    .slice(0, numberOfProducts);
  const productNames = filteredProductsData.map(product => product.product_name);
  const ratings = filteredProductsData.map(product => product.avg_rating);

  const data = {
    labels: productNames,
    datasets: [
      {
        label: 'Rating',
        data: ratings,
        backgroundColor: 'rgba(207, 113, 60, 0.7)',
        borderColor: 'rgba(207, 113, 60, 0.7)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Most Rated Products',
        color: '#4B6657',
        font: {
          size: 18,
          weight: 'bold',
          family: "Nunito",
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#4B6657',
          stepSize: 0.5, 
          beginAtZero: true,
          max: 5, 
        },
      },
      x: {
        ticks: {
          color: '#4B6657',
        },
      },
    },
  };

  return (
    <div className="bg-white bg-opacity-70 p-4 rounded-md shadow-md w-3/5 items-center justify-center">
      <div className="mb-4">
        <label htmlFor="numberOfProducts" className="text-HardGreen  mr-2">Number of Products:</label>
        <select id="numberOfProducts" value={numberOfProducts} onChange={handleNumberOfProductsChange} className=" outline-none bg-SoftOrange ">
          {[5, 10, 15].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 w-full">
        <Bar data={data} options={options} className=' '/>
      </div>
    </div>
  );
}

export default MostRatedProducts;
