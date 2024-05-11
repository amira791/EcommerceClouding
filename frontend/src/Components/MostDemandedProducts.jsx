import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js/auto';

ChartJS.register(Title, Tooltip, Legend);

function MostDemandedProducts({ }) {
    const products = [
        { name: 'Product A', numberOfSales: 50, date: '2024-04-04' },
        { name: 'Product B', numberOfSales: 40, date: '2024-04-02' },
        { name: 'Product C', numberOfSales: 30, date: '2024-04-03' },
        { name: 'Product D', numberOfSales: 25, date: '2024-04-04' },
        { name: 'Product E', numberOfSales: 20, date: '2024-04-05' },
        { name: 'Product F', numberOfSales: 18, date: '2024-04-06' },
        { name: 'Product G', numberOfSales: 15, date: '2024-04-07' },
        { name: 'Product H', numberOfSales: 12, date: '2024-04-08' },
        { name: 'Product I', numberOfSales: 10, date: '2024-04-09' },
        { name: 'Product J', numberOfSales: 8, date: '2024-04-10' },
        { name: 'Product K', numberOfSales: 6, date: '2024-04-11' },
        { name: 'Product L', numberOfSales: 4, date: '2024-04-12' },
        { name: 'Product M', numberOfSales: 3, date: '2024-04-13' },
        { name: 'Product N', numberOfSales: 2, date: '2024-04-14' },
        { name: 'Product O', numberOfSales: 1, date: '2024-04-15' }
      ];
      
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfProducts, setNumberOfProducts] = useState(5); // Default to 5 products

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const handleNumberOfProductsChange = (event) => {
    setNumberOfProducts(Number(event.target.value));
  };
  const filteredProducts = products.filter(product => {
    const startDateMs = startDate ? new Date(startDate).getTime() : 0;
    const endDateMs = endDate ? new Date(endDate).getTime() : Infinity;
    const productDateMs = new Date(product.date).getTime();
    return productDateMs >= startDateMs && productDateMs <= endDateMs;
  });

  const productNames = filteredProducts.slice(0, numberOfProducts).map(product => product.name);
  const numberOfSales = filteredProducts.slice(0, numberOfProducts).map(product => product.numberOfSales);

  const data = {
    labels: productNames, 
    datasets: [
      {
        label: 'Number of Sales',
        data: numberOfSales, 
        backgroundColor: 'rgba(207, 113, 60, 0.7)',
        borderColor: 'rgba(207, 113, 60, 0.7)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true, 
        ticks: {
          precision: 0, 
        },
      },
    },
  };

  return (
    <div className="bg-white bg-opacity-70 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold text-HardGreen mb-2">Most Demanded Products</h3>
      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="startDate" className="text-HardGreen  mr-2">Start Date:</label>
          <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} className="outline-none bg-SoftOrange "/>
        </div>
        <div>
          <label htmlFor="endDate" className="text-HardGreen  mr-2">End Date:</label>
          <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} className="outline-none bg-SoftOrange "/>
        </div>
        <div>
          <label htmlFor="numberOfProducts" className="text-HardGreen  mr-2">Number of Products:</label>
          <select id="numberOfProducts" value={numberOfProducts} onChange={handleNumberOfProductsChange} className=" outline-none bg-SoftOrange ">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default MostDemandedProducts;
