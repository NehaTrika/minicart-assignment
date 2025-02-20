import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import styles from './ProductDetailPage.module.css'; 
import MiniCart from '../components/MiniCart/Minicart';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  link: string;
}

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1); 
  const [error, setError] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false); 

  useEffect(() => {
    const loadProductDetail = async () => {
      const url = `https://trika.vtexcommercestable.com.br/api/io/_v/api/intelligent-search/product_search/?simulationBehavior=default&count=100&page=1&locale=en-US`;
      const url1 = `http://localhost:3000/?target=${url}`;

      try {
        const response = await axios.get(url1, {
          headers: {
            'X-VTEX-API-AppKey': 'vtexappkey-trika-RQVMBT',
            'X-VTEX-API-AppToken': 'NDOGKOCKISYSJCPIFCJCWSSNESUNBXMVLYRTHVSQIFOJWMSUICYPHJXJHHPFLBFUEUUXELNTWPWKKKXQQQKLUKJEYSGIGTRQSDSRIRSWWMJTRXPXORBSNPMBTEHZULPN',
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const products = response.data.products;
          const productDetail = products.find((product: any) => product.productId === productId);

          if (!productDetail) {
            setError('Product data not found.');
            return;
          }

          const mappedProduct = {
            id: productDetail.productId,
            name: productDetail.productName || 'Unnamed Product',
            description: productDetail.description || 'No description available',
            price: productDetail.priceRange?.sellingPrice?.highPrice || 'Price not available',
            imageUrl: productDetail.items?.[0]?.images?.[0]?.imageUrl || '',
            link: productDetail.link || '#',
          };

          setProduct(mappedProduct);
        }
      } catch (err) {
        const message = axios.isAxiosError(err) ? 'Failed to load product details' : 'Something went wrong';
        setError(message);
      }
    };

    if (productId) {
      loadProductDetail();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity,
      });
      setShowPopup(true); 
      setTimeout(() => setShowPopup(false), 3000); 
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  return (
    
    <div className={styles.container}>
      <MiniCart />

      {error ? (
        <p className={styles.error}>{error}</p>
      ) : product ? (
        <div className={styles.productDetail}>
          <div className={styles.imageContainer}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
          </div>
          <div className={styles.productInfo}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p className={styles.price}>Price: ${product.price}</p>

            <div className={styles.quantitySection}>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={handleQuantityChange}
                className={styles.quantityInput}
              />
              <button onClick={handleAddToCart} className={styles.addToCartButton}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}

      {showPopup && (
        <div className={styles.popup}>
          <p>{product?.name} has been added to your cart!</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
