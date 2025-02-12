import React from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div 
      style={styles.card} 
      onClick={handleClick}
    >
      <img 
        src={product.images[0]} 
        alt={product.title} 
        style={styles.image} 
      />
      <div style={styles.details}>
        <h3 style={styles.name}>{product.title}</h3>
        <p style={styles.price}>Rp {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'scale(1.05)',
    }
  },
  image: {
    maxWidth: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  details: {
    marginTop: '10px',
  },
  name: {
    margin: '0 0 10px 0',
    fontSize: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  price: {
    fontWeight: 'bold',
    color: '#4caf50',
  }
};

export default ProductCard;