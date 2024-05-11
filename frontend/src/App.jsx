import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import List from './Pages/List';
import ProductDetails from './Pages/ProductDetails';
import Load from './Pages/Load';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Load />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<List />} />
        <Route path="/product-details/:id" element={<ProductDetails/>} />
      </Routes>
    </Router>
  );
}
export default App;
