import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qplsbysryzkhjorhivri.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwbHNieXNyeXpraGpvcmhpdnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4Njg3ODcsImV4cCI6MjAyOTQ0NDc4N30.Ciw2ExRcTDcwU4RrhwaHo14bAoa_5GmqlZuinhJLH_4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function getCategories() {
  try {
      const { data, error } = await supabase
          .from('categories')
          .select();

      if (error) {
          throw new Error(error.message);
      }

      return { data, error: null };
  } catch (error) {
      console.error('Error fetching categories:', error.message);
      return { data: null, error: 'Error fetching categories' };
  }
}

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
async function addProduct(product_name, product_quantity, product_price, category_name) {
  try {
      const { data, error } = await supabase
      .rpc('insert_product', {
        category_name, 
        product_name, 
        product_price, 
        product_quantity
      })

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

  async function calculateTotalStockValue() {
    try {
        const { data, error } = await supabase.rpc('CalculateTotalStockValue');
        if (error) {
            console.error('Error calculating total stock value:', error.message);
            return null;
        }
        return data;
    } catch (error) {
        console.error('Error calculating total stock value:', error.message);
        return null;
    }
}
  async function get_most_commented_products() {

    // let { data, error } = await supabase
    // .rpc('most_commented_products')
    // if (error) console.error(error)
    // else console.log(data)

    try {
      const { data, error } = await supabase.rpc('most_commented_products');
      if (error) {
        throw new Error(error.message);
      }
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching most commented products:', error.message);
      return { data: data, error: error };
    }
  }
  
  
  async function get_most_rated_products(){
    try {
     
      let { data, error } = await supabase
      .rpc('most_rated_products')
      if (error) {
        throw new Error(error.message);
      }
      return { data, error: null };
    } catch (error) {
      console.error('Erreur lors de recuperation des produits plus commentes', error.message);
      return { data: null, error: error.message };
    }
  }
  
  async function get_most_demanded_products( start_date, end_date ){
   
    try {
      const {data , error} = await supabase.rpc('most_demanded_products', { start_date, end_date })
      if (error) {
        throw new Error(error.message);
      }
      return { data, error: null };
    } catch (error) {
      console.error('Erreur lors de recuperation des produits plus commentes', error.message);
      return { data: null, error: error.message };
    }
  }
  
  
export { 
  getCategories,
  getProducts, 
  getProduct, 
  addProduct, 
  deleteProduct,
  calculateTotalStockValue,
  supabase, 
  getFilteredProductsByCategory, 
  getFilteredProductsByPriceRange, 
  getFilteredProductsByQualityRange, 
  getCategoryIdByName,
  get_most_demanded_products,
  get_most_rated_products,
  get_most_commented_products
 };
