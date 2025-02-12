"use client";

import Navbar from "./components/Navbar";
import ProductsPage from "./products/page"; 

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={styles.main}>
        <h1>Selamat Datang di GUI Store 🛍</h1>
        <ProductsPage /> 
      </main>
    </>
  );
}

const styles: { main: React.CSSProperties } = {
  main: {
    padding: "20px",
    textAlign: "center",
  },
};
