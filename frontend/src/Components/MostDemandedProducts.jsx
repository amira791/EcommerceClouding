import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js/auto';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend);

function MostDemandedProducts() {
  const [productsData, setProductsData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfProducts, setNumberOfProducts] = useState(5);

  useEffect(() => {
    // Check if both startDate and endDate are set
    if (startDate !== null && endDate !== null) {
      getData(startDate, endDate);
    }
  }, [startDate, endDate]); 

  const getData = (start_date, end_date)=>{
    axios.get(`http://localhost:4000/api/v1/demanded/${start_date}/${end_date}`)
      .then(response => {
        setProductsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });
  }
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleNumberOfProductsChange = (event) => {
    setNumberOfProducts(Number(event.target.value));
  };

  const filteredProducts = productsData.filter(product => {
    const startDateMs = startDate ? new Date(startDate).getTime() : 0;
    const endDateMs = endDate ? new Date(endDate).getTime() : Infinity;
    const productDateMs = new Date(product.date).getTime();
    return productDateMs >= startDateMs && productDateMs <= endDateMs;
  });

  const productNames = productsData.slice(0, numberOfProducts).map(product => product.product_name);
  const numberOfSales = productsData.slice(0, numberOfProducts).map(product => product.total_quantity);

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
