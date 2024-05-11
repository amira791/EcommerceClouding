
import React from 'react';
import { Link } from 'react-router-dom';

function IconButton({ icon, path , name}) {
  return (
    <Link to={path}>
      <button className="rounded-lg bg-SoftGreen hover:bg-HardGreen text-white text-xl font-bold py-3 px-4 ">
        <div className='flex gap-3 justify-between items-center'>{name}{icon}</div>
      </button>
    </Link>
  );
}

export default IconButton;
