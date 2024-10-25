import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import ProductModal from './ProductModal';
import DeleteModal from './DeleteModal';
import {
  fetchProducts as fetchProductsAPI,
  createProduct as createProductAPI,
  deleteProductById as deleteProductAPI,
} from '../api/api';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<'name' | 'count'>('name');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await fetchProductsAPI();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (productData: Omit<Product, '_id' | 'comments'>) => {
    try {
      await createProductAPI(productData);
      fetchProducts();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProductAPI(id);
      fetchProducts();
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === 'name') {
      return a.name.localeCompare(b.name);
    }
    return b.count - a.count;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
        
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value as 'name' | 'count')}
          className="border rounded px-2"
        >
          <option value="name">Sort by Name</option>
          <option value="count">Sort by Count</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <div key={product._id} className="border rounded p-4">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p>Count: {product.count}</p>
            <div className="flex justify-between mt-2">
              <Link 
                to={`/product/${product._id}`}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                View Details
              </Link>
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setShowDeleteModal(true);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <ProductModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddProduct}
        />
      )}

      {showDeleteModal && selectedProduct && (
        <DeleteModal
          productName={selectedProduct.name}
          onConfirm={() => handleDeleteProduct(selectedProduct._id)}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductList;
