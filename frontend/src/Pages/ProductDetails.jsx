import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaTrash } from 'react-icons/fa'; 
import Navbar from '../Components/Navbar';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();

  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null); // State to track selected review ID
  const toggleDeletePopup = (reviewId = null) => {
    setDeletePopupOpen(!isDeletePopupOpen);
    setSelectedReviewId(reviewId); // Set the review ID to the state
  };

  const [product, setProduct] = useState({
    name: 'Product 1',
    price: 10000,
    quantity: 20,
    category: 'Category 1',
    avg_rating : 5.0,
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/products/${id}`)
      .then(response => {
        setProduct(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });

    axios.get(`http://localhost:4000/api/v1/product/reviews/${id}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });
  }, [id]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      productId: 1,
      username: "John Doe",
      email: "john@example.com",
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
  ]);

  const deleteReview = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/reviews/${selectedReviewId}`);
      setDeletePopupOpen(false);
      setReviews(reviews.filter(review => review.id !== selectedReviewId)); // Remove deleted review from state
    } catch (error) {
      console.error('Error deleting review:', error);
      throw new Error('Error deleting review');
    }
  };

  // const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;

  return (
    <>
      <Navbar />
      <div className="w-full p-4">
        <Link to="/products" className="text-gray-600 hover:text-gray-800 p-6 text-lg">
          <FaArrowLeft className="inline-block mr-2" />
          Return product list
        </Link>
        <div className="bg-white rounded-lg shadow-md p-6 mt-4 mx-44">
          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className='flex justify-between items-center w-full'>
              <p className="text-gray-700 text-xl mb-4 self-center">
                <span className="font-semibold">Price: </span> {product.price}<br />
                <span className="font-semibold">Quantity: </span> {product.quantity}<br />
                <span className="font-semibold">Category: </span> {product.category}<br />
              </p>
              <img className="w-1/2 rounded-full" src='/img.jpg' alt={product.name} />
            </div>
            <div className="flex items-center mb-4">
              <span className="m-2 text-2xl text-HardGreen">Average Rating: </span>
              {Array.from({ length: Math.round(product.avg_rating) }, (_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
            </div>
            <p className='text-2xl font-bold mb-2'>Reviews: </p>
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className='flex justify-between items-center w-full'>
                  <div className="flex items-center justify-start mb-2">
                    <div className="flex-shrink-0 mr-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600">U</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{review.username}</p>
                      <p className="text-sm text-gray-600">{review.email}</p>
                    </div>
                  </div>
                  <button className="hover:text-red-600 text-red-500 font-bold py-2 px-4 rounded" onClick={() => toggleDeletePopup(review.idreview)}>
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
              <p>Are you sure you want to delete this review?</p>
              <div className="mt-4 flex justify-center">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={deleteReview}>
                  Yes
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={toggleDeletePopup}>
                  No
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
