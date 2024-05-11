import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaTrash } from 'react-icons/fa'; 
import Navbar from '../Components/Navbar';
function ProductDetails( ) {
  
const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
const toggleDeletePopup = () => {
  setDeletePopupOpen(!isDeletePopupOpen);
};
  const products = Array.from({ length: 20 }, (_, index) => ({
    idProduct: index + 1,
    name: `Product ${index + 1}`,
    price: `$${(index + 1) * 10}`,
    quantity: index + 1,
    category: `Category ${(index % 5) + 1}`, 
    user: `User ${index + 1}`, 
  }));  
  const reviews = [
    {
      id: 1,
      productId: 1,
      userName: "John Doe",
      userEmail: "john@example.com",
      rating: 4,
      comment: "Great product! I really liked it.",
      date: "2024-04-25"
    },
    {
      id: 2,
      productId: 1,
      userName: "Alice Smith",
      userEmail: "alice@example.com",
      rating: 5,
      comment: "Excellent product! Highly recommend it.",
      date: "2024-04-26"
    },
    {
      id: 3,
      productId: 1,
      userName: "Bob Johnson",
      userEmail: "bob@example.com",
      rating: 3,
      comment: "Good product, but could be better.",
      date: "2024-04-27"
    },
    {
      id: 4,
      productId: 1,
      userName: "Emily Brown",
      userEmail: "emily@example.com",
      rating: 5,
      comment: "Absolutely love it! Perfect product.",
      date: "2024-04-28"
    },
    {
      id: 5,
      productId: 1,
      userName: "Sarah Wilson",
      userEmail: "sarah@example.com",
      rating: 4,
      comment: "Very satisfied with the product.",
      date: "2024-04-29"
    }
  ];
  
  // id product depuis URL
  const idProduct = useParams();
  console.log(idProduct); 
  const product = products.find(product => product.idProduct=== parseInt(idProduct.id));
const productReviews = reviews.filter(review => review.productId === parseInt(idProduct.id));




const deleteReview = () => {
  console.log('Avis supprimé');
  setDeletePopupOpen(false);
};

const averageRating = productReviews.reduce((total, review) => total + review.rating, 0) / productReviews.length;

return (
  <>
  <Navbar/>
  <div className="w-full p-4">
    <Link to="/products" className="text-gray-600 hover:text-gray-800 p-6 text-lg">
        <FaArrowLeft className="inline-block mr-2" />
        Return product list 
      </Link>
    <div className="bg-white rounded-lg shadow-md p-6 mt-4 mx-44">
      <div className="mt-4">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <div className='flex justify-between items-center w-full'>
        
        <p className="text-gray-700  text-xl mb-4 self-center">
          <span className="font-semibold ">Price : </span> {product.price}<br />
          <span className="font-semibold">Quantity : </span> {product.quantity}<br />
          <span className="font-semibold">Category : </span> {product.category}<br />
          <span className="font-semibold">User : </span> {product.user}
        </p>
        <img className="w-1/2 rounded-full" src='/img.jpg' alt={product.name} />
        </div>
        <div className="flex items-center mb-4">
          <span className="m-2 text-2xl text-HardGreen">Average Rating : </span>
          {Array.from({ length: Math.round(averageRating) }, (_, index) => (
            <FaStar key={index} className="text-yellow-500" />
          ))}
        </div>
        <p className='text-2xl font-bold mb-2'>Views : </p>
        {productReviews.map((review, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-4 mb-4">
          <div className=' flex justify-between items-center w-full'>
            <div className="flex items-center justify-start mb-2">
              <div className="flex-shrink-0 mr-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">U</span>
                </div>
              </div>
              <div>
                <p className="font-semibold">{review.userName}</p>
                <p className="text-sm text-gray-600">{review.userEmail}</p>
              </div>
              
            </div>
            <button className=" hover:text-red-600 text-red-500 font-bold py-2 px-4 rounded" onClick={toggleDeletePopup}>
              <FaTrash className="inline-block mr-1" />
            </button>
            </div>

            <p className="text-gray-800 mb-2">{review.comment}</p>
            <div className="flex items-center mb-2">
              {Array.from({ length: review.rating }, (_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>


    {isDeletePopupOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg">
          <p>Êtes-vous sûr de vouloir supprimer cet avis ?</p>
          <div className="mt-4 flex justify-center">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={deleteReview}>
              Oui
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={toggleDeletePopup}>
              Non
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  </>
);
}

export default ProductDetails;