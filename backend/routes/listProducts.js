import express from 'express'
import cors from 'cors'
import { getProducts, getProduct, addProduct,deleteProduct, getFilteredProducts} from './model/supabase.js'
import { getCategories } from './model/categorie.js'
import { getReviewsByProdductId } from './model/reviews.js'
import { getUser } from './model/user.js'
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
// la liste des products 
app.get('/api/v1', async (req, res) => {
  const {data,error} = await getProducts()
  res.json(data)
})
app.get('/api/v1/product', async (req, res) => {
    const id = req.query.id  
    const {data,error} = await getProduct(id)
    res.json(data)
  })
  
app.post('/api/v1/product', async(req,res)=>{
 const {data, error} = await addProduct(req.body)
 res.json(data)
})
app.delete('/api/v1/product', async (req, res) => {
    const id = req.query.id

    // Exécutez la logique pour supprimer le produit correspondant de votre base de données
    try {
        // Supprimez le produit avec l'ID spécifié
        await deleteProduct(id);
        res.status(200).json({ message: 'Le produit a été supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
    }
});

// liste des produits filtree 
// http://localhost:3000/api/productsFiltree?categoryName=Livres&minPrice=20&maxPrice=100&minQuality=9&maxQuality=100
app.get('/api/productsFiltree', async (req, res) => {
  const filterParams = {
      categoryName: req.query.categoryName,
      minPrice: parseInt(req.query.minPrice),
      maxPrice: parseInt(req.query.maxPrice),
      minQuality: parseInt(req.query.minQuality) ,
      maxQuality: parseInt(req.query.maxQuality)
  };
  const { data, error } = await getFilteredProducts(filterParams);
  if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des produits filtrés.' });
  }
  res.json(data);
});




// la liste des Categories
app.get('/api/categories', async (req, res) => {
  const {data,error} = await getCategories()
  res.json(data)
})

// getReviewsByProdductId
// http://localhost:3000/api/productReviews?id=1
app.get('/api/productReviews', async (req, res) => {
  const id = req.query.id  
  const {data,error} = await getReviewsByProdductId(id)
  res.json(data)
})

// getuser by id 
app.get('/api/users', async (req, res) => {
  const id = req.query.id  
  const {data,error} = await getUser(id)
  res.json(data)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})