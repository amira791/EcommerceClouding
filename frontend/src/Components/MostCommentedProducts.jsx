import React, { useState , useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js/auto';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend);

function MostCommentedProducts() {
  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/commented')
      .then(response => {
        setProductsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });
  }, []); // Empty dependency array to ensure this effect runs only once on mount

  const [productsData , setProductsData] = useState([
    { product_name: 'Product A', total_comments: 30 },
    { product_name: 'Product B', total_comments: 25 },
    { product_name: 'Product C', total_comments: 20 },
    { product_name: 'Product D', total_comments: 15 },
    { product_name: 'Product E', total_comments: 10 },
    { product_name: 'Product A', total_comments: 30 },
    { product_name: 'Product B', total_comments: 25 },
    { product_name: 'Product C', total_comments: 20 },
    { product_name: 'Product D', total_comments: 15 },
    { product_name: 'Product E', total_comments: 10 },
    { product_name: 'Product A', total_comments: 30 },
    { product_name: 'Product B', total_comments: 25 },
    { product_name: 'Product C', total_comments: 20 },
    { product_name: 'Product D', total_comments: 15 },
    { product_name: 'Product E', total_comments: 10 },
  ]);
  const [numberOfProducts, setNumberOfProducts] = useState(5); // Default to 5 products
  const handleNumberOfProductsChange = (event) => {
    setNumberOfProducts(Number(event.target.value));
  };
  const filteredProductsData = productsData.slice(0, numberOfProducts);
  const productNames = filteredProductsData.map(product => product.product_name);
  const numberOfComments = filteredProductsData.map(product => product.total_comments);
  const data = {
    labels: productNames,
    datasets: [
      {
        label: 'Number of Comments',
        data: numberOfComments,

        backgroundColor: [
          '#4B6657',
          '#CF713C',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 102, 87, 0.4)',
          'rgba(207, 113, 60, 0.5)',
        ],
        borderColor: [
            '#4B6657',
            '#CF713C',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 102, 87, 0.4)',
            'rgba(207, 113, 60, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the pie chart
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Most Commented Products',
        color: '#4B6657',
        font: {
          size: 18,
          weight: 'bold',
          family: "Nunito",
        },
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#4B6657',
        },
      },
    },
  };

  return (
    <div className="bg-white bg-opacity-70 p-4 rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="numberOfProducts" className="text-HardGreen  mr-2">Number of Products:</label>
        <select id="numberOfProducts" value={numberOfProducts} onChange={handleNumberOfProductsChange} className=' outline-none bg-SoftOrange'>
          {[5, 10, 15].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default MostCommentedProducts;
