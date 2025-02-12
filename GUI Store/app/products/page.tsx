import React, { useEffect, useState } from "react";
import { getCategories, getProductsByCategory } from "../lib/api";
import ProductCard from "../components/ProductCard";

interface Category {
  id: number;  
  name: string;
}

interface Product {
  id: number;
  title: string;  
  price: number;
  images: string[];  
}

const ProductsPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories: Category[] = await getCategories();
        console.log('Fetched Categories:', fetchedCategories);
        setCategories(fetchedCategories);

        if (fetchedCategories.length > 0) {
          const firstCategoryId = fetchedCategories[0].id;
          setSelectedCategory(firstCategoryId);
          await fetchProducts(firstCategoryId);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = async (categoryId: number) => {
    try {
      setLoading(true);
      const fetchedProducts: Product[] = await getProductsByCategory(categoryId);
      console.log('Fetched Products:', fetchedProducts);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <ul style={styles.categoryList}>
        {categories.map((category) => (
          <li key={category.id}>
            <button
              style={{
                ...styles.categoryButton,
                backgroundColor: selectedCategory === category.id ? "#4caf50" : "#fff",
                color: selectedCategory === category.id ? "#fff" : "#000",
              }}
              onClick={() => {
                setSelectedCategory(category.id);
                fetchProducts(category.id);
              }}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      
      {loading ? (
        <p>Memuat produk...</p>
      ) : (
        <div style={styles.productsGrid}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Tidak ada produk untuk kategori ini.</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  categoryList: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    listStyleType: "none",
    padding: 0,
  },
  categoryButton: {
    padding: "8px 15px",
    border: "1px solid #ddd",
    cursor: "pointer",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
};

export default ProductsPage;