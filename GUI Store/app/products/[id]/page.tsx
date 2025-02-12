'use client';

import React, { useEffect, useState } from 'react';
import { getProductById } from '@/app/lib/api';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    name: string;
  };
}

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productId = parseInt(params.id, 10);
        const fetchedProduct = await getProductById(productId);
        
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [params.id]);

  const handleNextImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % product.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div style={styles.container}>
      <div style={styles.imageSection}>
        <div style={styles.imageContainer}>
          {product.images.length > 1 && (
            <button style={styles.navButton} onClick={handlePrevImage}>{'<'}</button>
          )}
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.title} 
            style={styles.mainImage} 
          />
          {product.images.length > 1 && (
            <button style={styles.navButton} onClick={handleNextImage}>{'>'}</button>
          )}
        </div>
        {product.images.length > 1 && (
          <div style={styles.thumbnails}>
            {product.images.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`Thumbnail ${index + 1}`}
                style={{
                  ...styles.thumbnail,
                  opacity: index === currentImageIndex ? 1 : 0.5
                }}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
      
      <div style={styles.detailSection}>
        <h1 style={styles.title}>{product.title}</h1>
        <p style={styles.category}>Category: {product.category.name}</p>
        <p style={styles.price}>Rp {product.price.toLocaleString()}</p>
        <p style={styles.description}>{product.description}</p>
        <div style={styles.actions}>
          <button style={styles.addToCartButton}>Add to Cart</button>
          <button style={styles.buyNowButton}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    padding: '20px',
    maxWidth: '1200px',
    margin: 'auto',
    gap: '30px'
  },
  imageSection: {
    flex: 1,
    textAlign: 'center'
  },
  imageContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainImage: {
    maxWidth: '100%',
    maxHeight: '500px',
    objectFit: 'contain'
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    padding: '10px',
    cursor: 'pointer'
  },
  thumbnails: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px'
  },
  thumbnail: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    cursor: 'pointer',
    border: '2px solid #ddd'
  },
  detailSection: {
    flex: 1
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px'
  },
  category: {
    color: '#666',
    marginBottom: '10px'
  },
  price: {
    fontSize: '20px',
    color: '#4caf50',
    fontWeight: 'bold',
    marginBottom: '15px'
  },
  description: {
    marginBottom: '20px',
    lineHeight: '1.6'
  },
  actions: {
    display: 'flex',
    gap: '15px'
  },
  addToCartButton: {
    padding: '10px 20px',
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  buyNowButton: {
    padding: '10px 20px',
    background: '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default ProductDetailPage;