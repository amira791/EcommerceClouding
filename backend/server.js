import express from 'express';
import cors from 'cors';
import { getProducts, getProduct, addProduct, deleteProduct, getFilteredProductsByCategory, getFilteredProductsByPriceRange, getFilteredProductsByQualityRange, getCategoryIdByName } from './data_functions/supabase.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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
    const { name, quantity, price, categoryId } = req.body; // Corrected to match the variable name
    const { data, error } = await addProduct({ name, quantity, price, categoryId }); // Corrected to match the variable name
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
    const { error } = await deleteProduct(productId);
    if (error) {
      throw new Error(error.message);
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

// Filter products by category
app.get('/api/v1/products/filterByCategory', async (req, res) => {
  try {
    const { categoryName } = req.query;
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

app.get('/api/v1/products/filterByPrice', async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

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


// Endpoint for filtering products by category
app.get('/api/v1/products/filterByCategory/:catgId', async (req, res) => {
  try {
    const { catgId } = req.params; // Extract category ID from URL params
    const { data, error } = await getFilteredProductsByCategory(catgId);
    if (error) {
      throw new Error(error.message);
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching filtered products by category:', error);
    res.status(500).json({ error: 'Error fetching filtered products by category' });
  }
});


// Endpoint for filtering products by price range
app.get('/api/v1/products/filterByPrice/:min/:max', async (req, res) => {
  try {
    const { min, max } = req.params; // Extract min and max price from URL params
    const { data, error } = await getFilteredProductsByPriceRange(parseFloat(min), parseFloat(max));
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
app.get('/api/v1/products/filterByQuality/:min/:max', async (req, res) => {
  try {
    const { min, max } = req.params; // Extract min and max quality from URL params
    const { data, error } = await getFilteredProductsByQualityRange(parseInt(min), parseInt(max));
    if (error) {
      throw new Error(error.message);
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching filtered products by quality range:', error);
    res.status(500).json({ error: 'Error fetching filtered products by quality range' });
  }
});




app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
