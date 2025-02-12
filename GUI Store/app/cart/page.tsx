"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const mockCartItems: CartItem[] = [
          {
            id: 1,
            name: 'White T-Shirt',
            size: 'M',
            color: 'Sand Grey',
            price: 49.3,
            quantity: 1,
            imageUrl: '/white-tshirt.jpg'
          },
          {
            id: 2,
            name: 'Cutter Hoodie Flannel',
            size: 'XL',
            color: 'Rectangle Flannel',
            price: 112.4,
            quantity: 1,
            imageUrl: '/hoodie.jpg'
          },
          {
            id: 3,
            name: 'Denim Longslave',
            size: 'M',
            color: 'Blue Denim',
            price: 49.3,
            quantity: 1,
            imageUrl: '/denim-longslave.jpg'
          }
        ];

        setCartItems(mockCartItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Maximillian M</h2>
        <span style={styles.onlineStatus}>Online</span>
      </div>

      <div style={styles.sectionTitle}>
        <h3>List Order Product</h3>
        <span style={styles.clearAll}>Clear All</span>
      </div>

      {cartItems.map((item) => (
        <div key={item.id} style={styles.cartItem}>
          <div style={styles.itemImage}>
            <Image 
              src={item.imageUrl} 
              alt={item.name} 
              width={80} 
              height={80} 
              style={{objectFit: 'cover'}}
            />
          </div>
          <div style={styles.itemDetails}>
            <div style={styles.itemHeader}>
              <div>
                <h4 style={styles.itemName}>{item.name}</h4>
                <p style={styles.itemVariant}>
                  Size: {item.size}, Colors: {item.color}
                </p>
              </div>
              <button 
                onClick={() => removeItem(item.id)} 
                style={styles.removeButton}
              >
                <Trash2 size={20} color="red" />
              </button>
            </div>
            <div style={styles.itemFooter}>
              <span style={styles.itemPrice}>${item.price.toFixed(2)}</span>
              <div style={styles.quantityControl}>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={styles.quantityButton}
                >
                  <Minus size={16} />
                </button>
                <span style={styles.quantity}>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={styles.quantityButton}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div style={styles.paymentDetails}>
        <h3>Detail Payment</h3>
        <div style={styles.paymentRow}>
          <span>Subtotal</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div style={styles.paymentRow}>
          <span>Discount</span>
          <span>$0</span>
        </div>
        <div style={styles.paymentRow}>
          <span>Sales Tax</span>
          <span>$10.2</span>
        </div>
        <div style={styles.totalAmount}>
          <span>Total Amount</span>
          <span>${(calculateSubtotal() + 10.2).toFixed(2)}</span>
        </div>
      </div>

      <div style={styles.paymentMethods}>
        <div style={styles.paymentMethodButtons}>
          <button style={styles.paymentMethodButton}>Cash</button>
          <button style={styles.paymentMethodButton}>Credit</button>
          <button style={styles.paymentMethodButton}>Oris</button>
        </div>
        <button style={styles.payButton}>Pay</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  onlineStatus: {
    color: 'green',
    fontWeight: 'bold',
  },
  sectionTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  clearAll: {
    color: '#42b549',
    cursor: 'pointer',
  },
  cartItem: {
    display: 'flex',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  itemImage: {
    width: '100px',
    height: '100px',
  },
  itemDetails: {
    flex: 1,
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    margin: 0,
    fontSize: '16px',
  },
  itemVariant: {
    color: '#666',
    margin: '5px 0 0',
    fontSize: '14px',
  },
  removeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  itemFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    padding: '5px 10px',
  },
  quantityButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  quantity: {
    fontWeight: 'bold',
  },
  paymentDetails: {
    marginTop: '20px',
    borderTop: '1px solid #ddd',
    paddingTop: '15px',
  },
  paymentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  totalAmount: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginTop: '15px',
  },
  paymentMethods: {
    marginTop: '20px',
  },
  paymentMethodButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  paymentMethodButton: {
    flex: 1,
    margin: '0 5px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    background: 'none',
  },
  payButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#42b549',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
  },
};

export default CartPage;