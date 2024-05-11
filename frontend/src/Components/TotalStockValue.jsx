
import React from 'react';
import { FaDollarSign } from 'react-icons/fa';

function TotalStockValue({ }) {

  return (
    <div className="bg-SoftGreen p-4 rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Total Stock Value</h3>
        <FaDollarSign className="text-white" />
      </div>
      <p className="text-white mt-2">Total stock value of all products: 1567589 items </p>
    </div>
  );
}

export default TotalStockValue;
