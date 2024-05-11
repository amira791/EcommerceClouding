import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import IconButton from '../Components/Button';
import { FiShoppingBag } from 'react-icons/fi';
import TotalStockValue from '../Components/TotalStockValue';
import MostDemandedProducts from '../Components/MostDemandedProducts';
import MostCommentedProducts from '../Components/MostCommentedProducts';
import MostRatedProducts from '../Components/MostRatedProducts';
import CategoryProductCount from '../Components/CategoryProductCount';
function Dashboard() {


  return (
    <>
      <Navbar/>
      <div classname=' p-60'>
      <div className='px-10 mb-4 flex flex-row justify-between items-center'>
      <IconButton icon={<FiShoppingBag />} path="/products" name="See all products"/>
      <TotalStockValue/>
      </div>
      <div className='flex flex-grow justify-center gap-10'>
      <MostDemandedProducts />
      <MostCommentedProducts /> 
      </div>
      <div className=' py-2 flex flex-grow justify-center gap-10'>
      <CategoryProductCount/>
      <MostRatedProducts />
      </div>
      </div>
    </>
  );
}

export default Dashboard;
