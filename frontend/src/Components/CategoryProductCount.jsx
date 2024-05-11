import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js/auto';

ChartJS.register(Title, Tooltip, Legend);

function CategoryProductCount() {
  const [categoryData] = useState([
    { categoryName: 'Category A', productCount: 25 },
    { categoryName: 'Category B', productCount: 18 },
    { categoryName: 'Category C', productCount: 30 },
    { categoryName: 'Category D', productCount: 15 },
    { categoryName: 'Category E', productCount: 22 },
    { categoryName: 'Category A', productCount: 25 },
    { categoryName: 'Category B', productCount: 18 },
    { categoryName: 'Category C', productCount: 30 },
    { categoryName: 'Category D', productCount: 15 },
    { categoryName: 'Category E', productCount: 22 },
    { categoryName: 'Category A', productCount: 25 },
    { categoryName: 'Category B', productCount: 18 },
    { categoryName: 'Category C', productCount: 30 },
    { categoryName: 'Category D', productCount: 15 },
    { categoryName: 'Category E', productCount: 22 },
  ]);


  const [numberOfProducts, setNumberOfProducts] = useState(5);
  const handleNumberOfProductsChange = (event) => {
    setNumberOfProducts(Number(event.target.value));
  };
  
  const categoryNames = categoryData.map(category => category.categoryName);
  const productCounts = categoryData.map(category => category.productCount).slice(0, numberOfProducts);
  const data = {
    labels: categoryNames.slice(0, numberOfProducts),
    datasets: [
      {
        label: 'Product Count',
        data: productCounts,
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
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Product Count by Category',
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
        <label htmlFor="numberOfProducts" className=" text-HardGreen mr-2">Number of Products:</label>
        <select id="numberOfProducts" value={numberOfProducts} onChange={handleNumberOfProductsChange} className=' outline-none bg-SoftOrange'>
          {[5, 10, 15].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div className="mt-2">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default CategoryProductCount;
