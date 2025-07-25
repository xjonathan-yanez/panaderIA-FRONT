const API_URL = process.env.REACT_APP_API_URL;

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }
  return await response.json();
};

export const submitOrder = async (order) => {
  const response = await fetch(`${API_URL}/pedido`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error('Error al enviar el pedido');
  }
  return await response.json();
};