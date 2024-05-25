import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from React Icons
import axios from 'axios';


function ProductCard({ idProduct, name, price, quantity, category, user }) {

  const [isPopupdeleteOpen, setPopupDeleteOpen] = useState(false);
  const [isPopupUpdateOpen, setPopupUpdateOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState({ idProduct, name, price, quantity, category });
  const deletePopup = () => {
    setPopupDeleteOpen(!isPopupdeleteOpen);
  };
  const UpdatePopup = () => {
    setPopupUpdateOpen(!isPopupUpdateOpen);
  };

  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });
  }, []);


  // Function to handle delete action
  const handleDelete = async (event) => {
    console.log(idProduct)
    console.log('Delete product with ID:', idProduct);
    try {
      await axios.delete(`http://localhost:4000/api/v1/products/${idProduct}`);
      setPopupDeleteOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Error deleting product');
    }

  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/api/v1/updateProduct/`, updatedProduct);
      setPopupDeleteOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Error updating product');
    }

    setPopupUpdateOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  return (
    <div className="relative">
      <Link to={`/product-details/${idProduct}`}>
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg justify-center items-center bg-white transform transition-transform hover:scale-105 relative">
          <img className="w-full" src='img.jpg' alt={name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{name}</div>
            <p className="text-HardGreen text-base">
              Price: {price}<br />
              Quantity: {quantity} <br />
            </p>
          </div>
        </div>
      </Link>
      <div className="absolute top-2 right-2">
        <button className="bg-SoftGreen hover:bg-HardGreen text-white font-bold py-2 px-4 rounded mr-2" onClick={UpdatePopup}>
          <FaEdit />
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={deletePopup}>
          <FaTrash />
        </button>
      </div>


      {/* Popup delete */}
      {isPopupdeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-8 rounded-lg bg-opacity-70">
            <p>Are you sure you want to delete this product?</p>
            <div className="mt-4 flex justify-center">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleDelete}>
                Delete
              </button>
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={deletePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* update popup */}
      {isPopupUpdateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"> {/* Increase z-index for the popup */}
          <div className="bg-white bg-opacity-70 p-8 rounded-lg w-1/2 self-center">
            <h2 className="text-2xl font-bold mb-4 text-HardOrange">Update {updatedProduct.name}</h2> {/* Update title */}
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="name" className="block text-HardGreen font-semibold mb-1">Name:</label>
                <input type="text" id="name" name="name" value={updatedProduct.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="Name" />
              </div>
              <div className="mb-2">
                <label htmlFor="price" className="block text-HardGreen font-semibold mb-1">Price:</label>
                <input type="text" id="price" name="price" value={updatedProduct.price} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="Price" />
              </div>
              <div className="mb-2">
                <label htmlFor="quantity" className="block text-HardGreen font-semibold mb-1">Quantity:</label>
                <input type="number" id="quantity" name="quantity" value={updatedProduct.quantity} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="Quantity" />
              </div>
              <div className="mb-2">
                <label htmlFor="category" className="block text-HardGreen font-semibold mb-1">Category:</label>
                <select id="category" name="category" value={updatedProduct.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.idCategorie} value={category.idCategorie}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>


              <button type="submit" onClick={handleSubmit} className="bg-HardOrange bg-opacity-80 hover:bg-opacity-100 text-white font-bold py-2 px-4 rounded mr-2">
                Update
              </button>
              <button type="button" onClick={UpdatePopup} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </form>
          </div>
        </div>

      )}
    </div>
  );
}

export default ProductCard;
