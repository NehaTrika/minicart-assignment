import React from 'react';
import styles from './ProductCard.module.css'


interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  link: string;
  quantity?: number;
  onAddToCart: (product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    link: string;
    quantity: number;
  }) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, imageUrl, description, link, quantity = 1, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart({ id, name, price, imageUrl, description, link, quantity });
  };

  return (
    <div>
      <img src={imageUrl} alt={name} />
      <h2 className={styles.productTitle}>{name}</h2>
      <p className={styles.productPrice}>${price.toFixed(2)}</p>
      <button onClick={handleAddToCart} className={styles.addToCartButton}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
