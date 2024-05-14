import React, { useState, useEffect } from 'react';
import { FaDollarSign } from 'react-icons/fa';

function TotalStockValue() {
  const [totalValue, setTotalValue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTotalStockValue() {
      try {
        const response = await fetch('/api/v1/total-stock-value');
        if (!response.ok) {
          throw new Error('Failed to fetch total stock value');
        }
        const data = await response.json();
        setTotalValue(data.totalValue);
      } catch (error) {
        console.error('Error fetching total stock value:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTotalStockValue();
  }, []);

  return (
    <div className="bg-SoftGreen p-4 rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Total Stock Value</h3>
        <FaDollarSign className="text-white" />
      </div>
      {loading ? (
        <p className="text-white mt-2">Loading...</p>
      ) : (
        <p className="text-white mt-2">
          Total stock value of all products: {totalValue ? `$${totalValue}` : '99999'}
        </p>
      )}
    </div>
  );
}

export default TotalStockValue;
