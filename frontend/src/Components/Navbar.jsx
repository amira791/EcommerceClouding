// Navbar.js
import React from 'react';
import { FiShoppingCart, FiUser, FiBell, FiHelpCircle } from 'react-icons/fi';
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav className=" bg-HardOrange py-4 px-6 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <span className="text-white text-xl font-bold">AliBaba Light</span>
        <FiShoppingCart className="text-white text-2xl ml-2" />
      </div>
      <div className="flex items-center">
      <Link to="/dashboard">
        <FiHome className="text-white text-3xl mr-4" />
        </Link>
        <FiBell className="text-white text-3xl mr-4" />
        <FiHelpCircle className="text-white text-3xl mr-4" />
        <div className="mr-4 flex items-center gap-2">
          <FiUser className="text-white text-3xl border-white border-[2px] rounded-full p-1" />
          <span className="text-white text-lg ml-1">Administrator</span>
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar;
