import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js/auto';

ChartJS.register(Title, Tooltip, Legend);

function MostCommentedProducts() {
  const [productsData] = useState([
    { productName: 'Product A', numberOfComments: 30 },
    { productName: 'Product B', numberOfComments: 25 },
    { productName: 'Product C', numberOfComments: 20 },
    { productName: 'Product D', numberOfComments: 15 },
    { productName: 'Product E', numberOfComments: 10 },
    { productName: 'Product A', numberOfComments: 30 },
    { productName: 'Product B', numberOfComments: 25 },
    { productName: 'Product C', numberOfComments: 20 },
    { productName: 'Product D', numberOfComments: 15 },
    { productName: 'Product E', numberOfComments: 10 },
    { productName: 'Product A', numberOfComments: 30 },
    { productName: 'Product B', numberOfComments: 25 },
    { productName: 'Product C', numberOfComments: 20 },
    { productName: 'Product D', numberOfComments: 15 },
    { productName: 'Product E', numberOfComments: 10 },
  ]);
  const [numberOfProducts, setNumberOfProducts] = useState(5); // Default to 5 products
  const handleNumberOfProductsChange = (event) => {
    setNumberOfProducts(Number(event.target.value));
  };
  const filteredProductsData = productsData.slice(0, numberOfProducts);
  const productNames = filteredProductsData.map(product => product.productName);
  const numberOfComments = filteredProductsData.map(product => product.numberOfComments);
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
