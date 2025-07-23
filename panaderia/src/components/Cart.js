import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, cartTotal } = useCart();

  return (
    <aside className="cart">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <span>{item.nombre} (x{item.quantity})</span>
                <span>${(item.precio * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr />
          <div className="cart-total">
            <strong>Total:</strong>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </>
      )}
    </aside>
  );
};

export default Cart;