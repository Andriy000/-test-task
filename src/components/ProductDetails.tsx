import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product, Comment } from '../types';
import ProductModal from './ProductModal';
import {
  fetchProductById,
  updateProduct,
  fetchCommentsByProductId,
  addComment,
  deleteCommentById,
} from '../api/api'; 

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchProduct();
    fetchComments();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await fetchProductById(id!);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const data = await fetchCommentsByProductId(id!);
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleUpdateProduct = async (productData: Partial<Product>) => {
    try {
      await updateProduct(id!, productData);
      fetchProduct();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      await addComment(id!, newComment);
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteCommentById(commentId);
      fetchComments(); // Викликати fetchComments для оновлення після видалення
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded shadow-lg p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <button
            onClick={() => setShowEditModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded"
          />
          
          <div>
            <h2 className="text-xl font-bold mb-2">Details</h2>
            <p>Count: {product.count}</p>
            <p>Size: {product.size.width} x {product.size.height}</p>
            <p>Weight: {product.weight}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
              placeholder="Add a comment..."
            />
            <button
              onClick={handleAddComment}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {comments.map((comment) => (
              <div key={comment._id} className="border rounded p-2 flex justify-between">
                <div>
                  <p>{comment.description}</p>
                  <p className="text-sm text-gray-500">{comment.date}</p>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showEditModal && (
        <ProductModal
          product={product}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default ProductDetails;
