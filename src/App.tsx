import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';

const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/products" element={<HomePage/>} />
        

      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
