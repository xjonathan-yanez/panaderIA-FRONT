import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/api';

const CheckoutForm = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [customer, setCustomer] = useState({ name: '', email: '', address: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío. Añade productos antes de finalizar el pedido.');
      return;
    }

    const order = {
      customer,
      items: cartItems,
      total: cartTotal,
      date: new Date().toISOString(),
    };

    try {
      await submitOrder(order);
      alert('¡Pedido realizado con éxito!');
      clearCart();
      setCustomer({ name: '', email: '', address: '' });
    } catch (error) {
      alert('Hubo un error al procesar tu pedido. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  return (
    <div className="checkout-form">
      <h3>Datos del Cliente</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Nombre completo"
          required
        />
        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />
        <textarea
          name="address"
          value={customer.address}
          onChange={handleChange}
          placeholder="Dirección de envío"
          required
        />
        <button type="submit" disabled={cartItems.length === 0}>
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;