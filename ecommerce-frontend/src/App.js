import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Loginpage from './pages/LoginPage';
import RegisterPage from './pages/registration';
import ProductDetailsPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/checkout';
import AdminPanelPage from './pages/AdminPage';

const App=()=> {
  return (
    <Router>
      <Routes>
        <Route path='/'element={<HomePage/>}/>
        <Route path='/login'element={<Loginpage/>}/>
        <Route path='/register'element={<RegisterPage/>}/>
        <Route path='/product/:id'element={<ProductDetailsPage/>}/>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
