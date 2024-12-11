import React from "react";
import { Rate } from "antd";
import { Product } from "../types/product.type";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-64 bg-white shadow-md rounded-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover rounded-md"
      />
      <div className="my-4 text-center">
        <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
        <div className="flex items-center justify-center mt-2">
          <Rate disabled defaultValue={product.rating} />
        </div>
        <div className="mt-2">
          <span className="text-red-500 text-lg font-bold">
            {product.price.toLocaleString()} đ
          </span>
          <span className="text-gray-500 line-through text-sm ml-2">
            {product.oldPrice.toLocaleString()} đ
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-2">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
