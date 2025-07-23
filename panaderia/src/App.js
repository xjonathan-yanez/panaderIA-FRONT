import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <header className="app-header">
          <h1>🥐 Tienda PanaderIA 🥖</h1>
        </header>
        <main className="app-main">
          <div className="products-and-form">
            <ProductList />
            <CheckoutForm />
          </div>
          <Cart />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;