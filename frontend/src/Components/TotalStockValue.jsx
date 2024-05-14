import React, { useState, useEffect } from 'react';
import { FaDollarSign } from 'react-icons/fa';
import axios from 'axios';

function TotalStockValue() {
  const [totalValue, setTotalValue] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/total-stock-value')
    .then(response => {
      setTotalValue(response.data.totalValue);
    })
    .catch(error => {
      console.error('Error fetching data from the server:', error);
    });
  
  }, []);

  return (
    <div className="bg-SoftGreen p-4 rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Total Stock Value</h3>
        <FaDollarSign className="text-white" />
      </div>
      
        <p className="text-white mt-2">
          Total stock value of all products: {totalValue ? `$${totalValue}` : '99999'}
        </p>
    </div>
  );
}

export default TotalStockValue;
