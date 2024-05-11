import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js/auto';

ChartJS.register(Title, Tooltip, Legend);

function MostRatedProducts() {
  // Sample data for the most rated products
  const [productsData] = useState([
    { productName: 'Product A', rating: 4.3 },
    { productName: 'Product B', rating: 5 },
    { productName: 'Product C', rating: 4.5 },
    { productName: 'Product D', rating: 3.4 },
    { productName: 'Product E', rating: 4.2 },
    { productName: 'Product F', rating: 4.7 },
    { productName: 'Product G', rating: 5 },
    { productName: 'Product H', rating: 3 },
    { productName: 'Product I', rating: 2 },
    { productName: 'Product J', rating: 4.8 },
    { productName: 'Product K', rating: 3 },
    { productName: 'Product L', rating: 5 },
    { productName: 'Product M', rating: 2 },
    { productName: 'Product N', rating: 3 },
    { productName: 'Product O', rating: 4 },
  ]);

  
  const [numberOfProducts, setNumberOfProducts] = useState(5); // Default to 5 products
  const handleNumberOfProductsChange = (event) => {
    setNumberOfProducts(Number(event.target.value));
  };
  const filteredProductsData = productsData
    .sort((a, b) => b.rating - a.rating)
    .slice(0, numberOfProducts);
  const productNames = filteredProductsData.map(product => product.productName);
  const ratings = filteredProductsData.map(product => product.rating);

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
