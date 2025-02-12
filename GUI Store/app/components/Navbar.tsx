"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../lib/api";
import { Menu, ShoppingCart, Search } from "lucide-react";

const Navbar = () => {
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        };
        fetchCategories();
    }, []);

    return (
        <nav style={styles.navbar}>
            <div style={styles.navContainer}>
                <div style={styles.logo}>
                    <Link href="/" style={styles.logoText}>GUI Store</Link>
                </div>

                <div style={styles.categorySection}>
                    <button style={styles.categoryButton}>
                        <Menu size={20} />
                        <span style={styles.categoryText}>Kategori</span>
                    </button>
                </div>

                <div style={styles.searchBar}>
                    <Search size={20} style={styles.searchIcon} />
                    <input 
                        type="text" 
                        placeholder="Cari di GUI Store" 
                        style={styles.input} 
                    />
                </div>

                <div style={styles.rightSection}>
                    <Link href="/cart" style={styles.cartLink}>
                        <ShoppingCart size={24} />
                    </Link>

                    <div style={styles.authButtons}>
                        <Link href="/login">
                            <button style={styles.loginButton}>Masuk</button>
                        </Link>
                        <Link href="/register">
                            <button style={styles.registerButton}>Daftar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
    },
    navContainer: {
        display: "flex",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "10px 16px",
        gap: "16px",
    },
    logo: {
        marginRight: "16px",
    },
    logoText: {
        color: "#42b549",
        fontSize: "24px",
        fontWeight: "bold",
        textDecoration: "none",
    },
    categorySection: {
        marginRight: "16px",
    },
    categoryButton: {
        display: "flex",
        alignItems: "center",
        border: "none",
        background: "none",
        cursor: "pointer",
        gap: "8px",
    },
    categoryText: {
        fontWeight: "bold",
    },
    searchBar: {
        flex: 1,
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    searchIcon: {
        position: "absolute",
        left: "10px",
        color: "#888",
    },
    input: {
        width: "100%",
        padding: "10px 10px 10px 40px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontSize: "16px",
    },
    rightSection: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },
    cartLink: {
        color: "#333",
    },
    authButtons: {
        display: "flex",
        gap: "8px",
    },
    loginButton: {
        padding: "8px 16px",
        border: "1px solid #42b549",
        color: "#42b549",
        backgroundColor: "white",
        borderRadius: "8px",
        fontWeight: "bold",
    },
    registerButton: {
        padding: "8px 16px",
        border: "none",
        color: "white",
        backgroundColor: "#42b549",
        borderRadius: "8px",
        fontWeight: "bold",
    },
};

export default Navbar;