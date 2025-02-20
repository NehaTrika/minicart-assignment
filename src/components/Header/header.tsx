import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./header.module.css";

const Header: React.FC = () => {
  const { cart } = useCart();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Store</div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/cart" className={styles.link}>Cart ({itemCount})</Link>
        <Link to="/products" className={styles.link}>Products</Link>
      </nav>
    </header>
  );
};

export default Header;
