import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fxkxxuygclgsveyvqfub.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4a3h4dXlnY2xnc3ZleXZxZnViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4MDQwNDYsImV4cCI6MjAyOTM4MDA0Nn0.IwKaizZsrDPfoxlTDS-o-rfcHmjUNFjcKjP9pRfyU58';

const supabase = createClient(supabaseUrl, supabaseKey);

async function getProducts() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select();

        if (error) {
            throw new Error(error.message);
        }

        return { data, error: null };
    } catch (error) {
        console.error('Error fetching products:', error.message);
        return { data: null, error: 'Error fetching products' };
    }
}

async function getProduct(id){
    let { data, error } = await supabase
  .from('products')
  .select()
  .eq('idproduct', id)
  return { data, error }
}

async function getCategoryIdByName(categoryName) {
    try {
        const { data, error } = await supabase
            .from('categories') // Use lowercase 'categories' as the table name
            .select('idCategory')
            .eq('name', categoryName)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data.idCategory;
    } catch (error) {
        console.error('Error fetching category ID:', error.message);
        throw new Error('Error fetching category ID');
    }
}




// Corrected function to add a new product
async function addProduct(info) {
    try {
        const { data, error } = await supabase.from('products').insert([
            {
                name: info.name,
                quantity: info.quantity,
                price: info.price,
                idcategory: info.categoryId  // Corrected to match the variable name
            }
        ]);  
        return { data, error };
    } catch (error) {
        console.error('Error adding product:', error.message);
        return { data: null, error: error.message };
    }
}


  
  async function deleteProduct(id){
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('idproduct', id)
  }
  
  
  async function getFilteredProductsByCategory(categoryId) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('idcategory', categoryId);
      
      if (error) {
        return { error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching filtered products by category:', error.message);
      return { error: 'Error fetching filtered products by category' };
    }
  }
  
  
  async function getFilteredProductsByPriceRange(minPrice, maxPrice) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .lte('price', maxPrice)
      .gte('price', minPrice);
  
    if (error) {
      return { error: 'Erreur lors de la récupération des produits filtrés par prix.' };
    }
  
    return { data, error: null };
  }
  
  async function getFilteredProductsByQualityRange(minQuality, maxQuality) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .gte('quantity', minQuality)
      .lte('quantity', maxQuality);
  
    if (error) {
      return { error: 'Erreur lors de la récupération des produits filtrés par qualité.' };
    }
  
    return { data, error: null };
  }
  
  
export { getProducts, getProduct, addProduct, deleteProduct,supabase, getFilteredProductsByCategory, getFilteredProductsByPriceRange, getFilteredProductsByQualityRange, getCategoryIdByName };
