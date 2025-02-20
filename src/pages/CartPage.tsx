import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; 
import MiniCart from '../components/MiniCart/Minicart'; 
import styles from './CartPage.module.css'; 

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart(); 
  const [isModalOpen, setIsModalOpen] = useState(false); 


  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2); // Calculate total considering quantity
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckout = () => {
    setIsModalOpen(true); 
  };

  const calculateMiniCartSummary = () => {
    const totalItems = cart.reduce((count, item) => count + (item.quantity || 1), 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);
    return { totalItems, totalPrice };
  };

  const { totalItems, totalPrice } = calculateMiniCartSummary();


  return (
    <div className={styles.container}>
      <MiniCart />
      <h1 className={styles.cartHeader}>Your Shopping Cart</h1>
      <div className={styles.cartSummary}>
        <span>Items in Cart: {totalItems}</span>
        <span>Total: ${totalPrice}</span>
      </div>
      {cart.length === 0 ? (
        <p className={styles.cartEmptyMessage}>Your cart is empty.</p>
      ) : (
        <div>
          <ul className={styles.cartItemList}>
            {cart.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img src={item.imageUrl} alt={item.name} />
                <div >
                  <p className={styles.cartItemName}>{item.name}</p>
                  <p className={styles.cartItemPrice}>${item.price.toFixed(2)}</p>
                  <input
                    type="number"
                    value={item.quantity || 1}
                    min="1"
                    onChange={(e) => handleQuantityChange(item.id, e)}
                    className={styles.quantityInput}
                  />
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                  <p className={styles.cartItemSubtotal}>Subtotal: ${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.checkoutSection}>
            <div className={styles.separator}></div>

            <h3 className={styles.totalPrice}>Total: ${calculateTotal()}</h3>
            <button
              onClick={handleCheckout}
              className={styles.checkoutButton}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      

      {isModalOpen && (
        <div className={styles.modalOpen}>
          <div className={styles.modalContent}>
            <p>Thank you for shopping!</p>
            <button onClick={closeModal} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
