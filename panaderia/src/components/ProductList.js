import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.nombre}</h3>
          <p>${product.precio.toFixed(2)}</p>
          <button onClick={() => addToCart(product)}>Agregar</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;