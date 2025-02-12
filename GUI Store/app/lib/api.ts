import axios from "axios";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const getProductsByCategory = async (categoryId: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const getProductById = async (productId: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
    }
};
