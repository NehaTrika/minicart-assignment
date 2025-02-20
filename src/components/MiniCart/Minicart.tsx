import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import styles from './Minicart.module.css';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  link: string;
  quantity: number;
}

const MiniCart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleQuantityChange = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div>
      <div className={styles.miniCartTrigger} onClick={toggleCart}>
        <span>🛒 ({cart.length})</span>
      </div>

      {isOpen && (
        <div className={styles.miniCartDropdown} aria-live="polite">
          <h3>Mini Cart</h3>
          <div className={styles.separator}></div>

          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item: Product) => (
                <li key={item.id} className={styles.cartItem}>
                  <div>
                    <p>{item.name}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <input
                      type="number"
                      value={item.quantity || 1}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.id, e)}
                    />
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className={styles.separator}></div>

          <p className={styles.total}>
            Total: ${cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2)}
          </p>

          <Link to="/cart"> 
            <button>View Full Cart</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
