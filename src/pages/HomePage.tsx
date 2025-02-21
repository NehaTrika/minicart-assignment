import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './HomePage.module.css'; 
import MiniCart from '../components/MiniCart/Minicart';
import { useCart } from '../context/CartContext';
import { API_BASE_URL } from '../contants';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  link: string;
  quantity?: number;
}


const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [addedProductName, setAddedProductName] = useState<string>('');
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      const url = `${API_BASE_URL}/api/io/_v/api/intelligent-search/product_search//?simulationBehavior=default&count=100&page=1&locale=en-US`;

      try {

        // headers: {
        //   'X-VTEX-API-AppKey': 'vtexappkey-trika-RQVMBT',
        //   'X-VTEX-API-AppToken': 'NDOGKOCKISYSJCPIFCJCWSSNESUNBXMVLYRTHVSQIFOJWMSUICYPHJXJHHPFLBFUEUUXELNTWPWKKKXQQQKLUKJEYSGIGTRQSDSRIRSWWMJTRXPXORBSNPMBTEHZULPN',
        //   'Content-Type': 'application/json',
        // }

        const response = await axios.get(url);

        if (response.status === 200) {
          const mappedProducts = response.data.products.map((product: any) => ({
            id: product.productId,
            name: product.productName,
            description: product.description,
            price: product.priceRange.sellingPrice.highPrice,
            imageUrl: product.items[0] && product.items[0].images[0] ? product.items[0].images[0].imageUrl : '',
            link: product.link,
            quantity: 1, 
          }));

          setProducts(mappedProducts);
        }
      } catch (err) {
        setError('Failed to load products');
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: product.quantity ?? 1 });
    setAddedProductName(product.name); 
    setShowPopup(true);  
    setTimeout(() => setShowPopup(false), 3000); 
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to Our Store</h1>
      <MiniCart />
      <div className={styles.productList}>
        {error ? (
          <p>{error}</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <ProductCard
                {...product}
                onAddToCart={() => handleAddToCart(product)}
              />
              <Link to={`/product/${product.id}`} className={styles.productDetailLink}>
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {showPopup && (
        <div className={styles.popup}>
          <p>{addedProductName} has been added to your cart!</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
