import React from 'react'
import IconButton from './Button'
import { FiHome } from 'react-icons/fi';
function Header() {
  return (
    <>
    <div className="flex justify-center items-center py-20 px-72">
      <div className="flex-1 text-center w-1/3">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-HardGreen leading-snug mb-20">
            Welcome to 
            <span className="bg-HardGreen rounded-lg text-HardOrange transform -rotate-[-8deg] inline-block px-2 m-6">
              Administrator
            </span>
            space for managing 
            <span className="bg-HardGreen rounded-lg text-HardOrange transform -rotate-[8deg] inline-block px-2 m-6">
              Products {" "}
            </span>
          </h1>
          <IconButton icon={<FiHome/>} path="/dashboard" name="Direct to dashboard !"/>
        </div>
       </div>
    </div>
    </>
  )
}

export default Header