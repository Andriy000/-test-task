import axios from 'axios';
import { Product, Comment } from '../types';

const API_BASE_URL = 'https://backend-test-task-production.up.railway.app/api';

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await axios.get(`${API_BASE_URL}/product/getById/${id}`);
  return response.data;
};

export const updateProduct = async (id: string, productData: Partial<Product>) => {
  await axios.put(`${API_BASE_URL}/product/update/${id}`, productData);
};

export const fetchCommentsByProductId = async (productId: string): Promise<Comment[]> => {
  const response = await axios.get(`${API_BASE_URL}/product/${productId}/comments`);
  return response.data;
};

export const addComment = async (productId: string, description: string) => {
  await axios.post(`${API_BASE_URL}/product/${productId}/comments`, { description });
};

export const deleteCommentById = async (commentId: string) => {
  await axios.delete(`${API_BASE_URL}/product/comments/${commentId}`);
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_BASE_URL}/product/getProduct`);
  return response.data;
};

export const createProduct = async (productData: Omit<Product, '_id' | 'comments'>) => {
  await axios.post(`${API_BASE_URL}/product/create`, productData);
};

export const deleteProductById = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/product/delete/${id}`);
};