
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://xesgkalniwhmgijjfcrn.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhlc2drYWxuaXdobWdpampmY3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2Njc2MTcsImV4cCI6MjAyODI0MzYxN30.xNG-RpuLXsXcNG4laLujuC8oCwq0ZW0OWInqQYP2iik"
const supabase = createClient(supabaseUrl, supabaseKey)

async function getReviewsByProdductId(id){
    let { data, error } = await supabase
  .from('reviews')
  .select()
  .eq('productid', id)
  return { data, error }
}
async function addReview(info){
    try {
      const { data, error } = await supabase.from('reviews').insert([
          {
            productid: info.productid,
            userid: info.userid,
            rating: info.rating,
            date: info.date ,
            comment: info.comment
          }
        ]);  
      return { data, error };
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error.message);
      return { data: null, error: error.message };
    }
  }
  

export {getReviewsByProdductId , addReview}