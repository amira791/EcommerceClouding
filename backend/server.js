import express from 'express';
import cors from 'cors';
import { getCategories ,getProducts, getProduct,getProductReviews, deleteReview,addProduct, deleteProduct,calculateTotalStockValue, calculateCategoryProductCount,getFilteredProductsByCategory, getFilteredProductsByPriceRange, getFilteredProductsByQualityRange, getCategoryIdByName , get_most_commented_products,get_most_demanded_products,get_most_rated_products, updateProduct } from './data_functions/supabase.js';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Endpoint to fetch all categories
app.get('/api/v1/categories', async (req, res) => {
  try {
    const { data, error } = await getCategories();
    if (error) {
      throw new Error(error.message);
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

// Endpoint to fetch all products
app.get('/api/v1/products', async (req, res) => {
  try {
    const { data, error } = await getProducts();
    if (error) {
      throw new Error(error.message);
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Endpoint to fetch a single product by ID
app.get('/api/v1/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const { data, error } = await getProduct(productId);
    if (error) {
      throw new Error(error.message); // Throw the error message
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching product:', error); // Log the full error
    res.status(500).json({ error: 'Error fetching product' });
  }
});

// Endpoint to add a new product
app.post('/api/v1/products', async (req, res) => {
  try {
    const { name, quantity, price, category } = req.body; // Corrected to match the variable name
    const { data, error } = await addProduct( name, quantity, price, category ); // Corrected to match the variable name
    if (error) {
      throw new Error(error.message);
    }
    res.json(data);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Error adding product' });
  }
});


// Endpoint to delete a product by ID
app.delete('/api/v1/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const error = await deleteProduct(productId); // Call the deleteProduct function and get the error if any

    if (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ error: 'Error deleting product' });
    }

    // Respond with success message if there is no error
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});


app.post('/api/v1/updateProduct', async (req, res) => {

  try {
    const { idProduct, name,quantity, price, category } = req.body;
    const { data, error } =  await updateProduct(idProduct, name , quantity, price , category); // Corrected to match the variable name
    if (error) {
      throw new Error(error.message);
    }
    res.json(data);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }

});


// Endpoint to get  product reviews
app.get('/api/v1/product/reviews/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const { data, error } =  await getProductReviews(productId); // Corrected to match the variable name
    if (error) {
      throw new Error(error.message);
    }
    res.json(data);
  } catch (error) {
    console.error('Error getting product reviews:', error);
    res.status(500).json({ error: 'Error getting product reviews' });
  }

});

// Endpoint to delete a review by ID
app.delete('/api/v1/reviews/:id', async (req, res) => {
  const reviewId = req.params.id;
  try {
    const error = await deleteReview(reviewId); // Call the deleteReview function and get the error if any

    if (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ error: 'Error deleting review' });
    }
    // Respond with success message if there is no error
    res.status(200).json({ message: 'review deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting review' });
  }
});

// Endpoint to calculate total stock value
app.get('/api/v1/total-stock-value', async (req, res) => {
  try {
    const totalValue = await calculateTotalStockValue();
    res.json({ totalValue });
  } catch (error) {
    console.error('Error calculating total stock value:', error);
    res.status(500).json({ error: 'Error calculating total stock value' });
  }
});

// Endpoint to calculate category product count
app.get('/api/v1/category-product-count', async (req, res) => {
  try {
    const result = await calculateCategoryProductCount();
    res.json(result);
  } catch (error) {
    console.error('Error calculating category product count:', error);
    res.status(500).json({ error: 'Error calculating category product count' });
  }
});

// Endpoint for filtering products by category
app.get('/api/v1/products/filterByCategory/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params; // Extract category ID from URL params
    const { data, error } = await getFilteredProductsByCategory(categoryName);
    if (error) {
      throw new Error(error.message);
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching filtered products by category:', error);
    res.status(500).json({ error: 'Error fetching filtered products by category' });
  }
});

app.get('/api/v1/products/filterByPrice/:maxPrice', async (req, res) => {
  try {
    const { maxPrice } = req.params;

    // Check if minPrice and maxPrice are provided
    if (!minPrice || !maxPrice) {
      throw new Error('minPrice and maxPrice are required query parameters');
    }

    // Convert minPrice and maxPrice to floating-point numbers
    const parsedMinPrice = parseFloat(minPrice);
    const parsedMaxPrice = parseFloat(maxPrice);

    // Check if parsedMinPrice and parsedMaxPrice are valid numbers
    if (isNaN(parsedMinPrice) || isNaN(parsedMaxPrice)) {
      throw new Error('minPrice and maxPrice must be valid numbers');
    }

    const { data, error } = await getFilteredProductsByPriceRange(parsedMinPrice, parsedMaxPrice);

    if (error) {
      throw new Error(error.message);
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching filtered products by price range:', error);
    res.status(500).json({ error: 'Error fetching filtered products by price range' });
  }
});



// Endpoint for filtering products by quality range
app.get('/api/v1/products/filterByQuality/:max', async (req, res) => {
  try {
    const { max } = req.params; // Extract min and max quality from URL params
    const { data, error } = await getFilteredProductsByQualityRange(parseInt(max));
    if (error) {
      throw new Error(error.message);
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching filtered products by quality range:', error);
    res.status(500).json({ error: 'Error fetching filtered products by quality range' });
  }
});

// liste des produit plus commente
app.get('/api/v1/commented', async (req, res) => {

    const { data, error } = await get_most_commented_products();
    if (error) {
      console.error(error)
    }
    res.json(data);
  
});

// liste des produit plus demandé 
app.get('/api/v1/demanded/:start_date/:end_date' , async(req,res) =>{
  const { start_date, end_date } = req.params;
  const {data,error} = await get_most_demanded_products(start_date , end_date)
  res.json(data)
  console.log(error)
})

// liste des produit plus évalué 
app.get('/api/v1/rated' , async(req,res) =>{
  const {data,error} = await get_most_rated_products()
  if(error)console.log(error)
  res.json(data)
 
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
