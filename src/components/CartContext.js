import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // localstorage pro čtení a načítání dat
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // localstorage pro ukládání dat
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Přidání produktu do košíku
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Odstranění produktu z košíku
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Aktualizace množství produktu v košíku
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Vyprázdnění košíku
  const clearCart = () => {
    setCart([]);
  };

  // Celkový počet položek v košíku
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Celková cena košíku
  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Kontrola, zda je produkt v košíku
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}