import React, { useState } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product?: Product;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    imageUrl: product?.imageUrl || '',
    count: product?.count !== undefined ? product.count : '',
    size: {
      width: product?.size?.width !== undefined ? product.size.width : '',
      height: product?.size?.height !== undefined ? product.size.height : '',
    },
    weight: product?.weight || '',
  });

  const [isImageUrlValid, setIsImageUrlValid] = useState(true);

  const validateUrl = (url: string) => {
    const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]{2,}(\/.*)?$/;
    return urlPattern.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.imageUrl || formData.count <= 0 || !isImageUrlValid) {
      return;
    }
    onSubmit(formData);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setIsImageUrlValid(validateUrl(url));
    setFormData({ ...formData, imageUrl: url });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          {product ? 'Edit Product' : 'Add Product'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Image URL</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              className={`w-full border rounded px-2 py-1 ${!isImageUrlValid ? 'border-red-500' : ''}`}
              required
            />
            {!isImageUrlValid && (
              <p className="text-red-500 text-sm">
                Please enter a valid URL (https://example.com/image.jpg).
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">Count</label>
            <input
              type="number"
              value={formData.count}
              onChange={(e) => setFormData({ ...formData, count: Number(e.target.value) })}
              className="w-full border rounded px-2 py-1"
              required
              min="1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Width</label>
              <input
                type="number"
                value={formData.size.width}
                onChange={(e) => setFormData({
                  ...formData,
                  size: { ...formData.size, width: Number(e.target.value) }
                })}
                className="w-full border rounded px-2 py-1"
                required
                min="1"
              />
            </div>
            <div>
              <label className="block mb-1">Height</label>
              <input
                type="number"
                value={formData.size.height}
                onChange={(e) => setFormData({
                  ...formData,
                  size: { ...formData.size, height: Number(e.target.value) }
                })}
                className="w-full border rounded px-2 py-1"
                required
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Weight</label>
            <input
              type="text"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
