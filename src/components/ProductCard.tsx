import React from "react";
import { Button, Rate } from "antd";
import { Product } from "../types/product.type";
import { SearchOutlined } from "@ant-design/icons";
import { NavLink, Router } from "react-router";
interface ProductCardProps {
  product: Product;
  className?: string;
  showDiscount?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className, showDiscount = true }) => {

  return (
    <NavLink className={`w-64 bg-white shadow-md rounded-md ${className} relative`} to={`/products/${product?.id}`}>
      {product?.discount > 0 && showDiscount && <div className="text-sm top-4 left-4 absolute bg-[red] text-white px-2 py-1 rounded-full w-[40px] h-[40px] z-10 flex justify-center items-center">{product?.discount}%</div>}
      <div className="relative group duration-300 transition-all">
        <img
          src={product?.images?.[0] || ''}
          alt={product?.name}
          className="w-full h-60 object-cover rounded-md card-image"
        />
        <div className="hidden absolute inset-0 bg-[#000] z-10 bg-opacity-40 group-hover:block rounded">
          <div className="rounded-full w-[40px] h-[40px] text-sm bg-[#22c55e] text-white flex justify-center items-center mt-4 ml-4">New</div>
          <div className="flex items-center justify-center mt-[30%] gap-3">
            <Button type="primary"className="px-5 py-2 rounded-2xl">Mua ngay</Button>
            <div className="rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center"><SearchOutlined style={{fontSize: "12px"}} /></div>
          </div>
        </div>
      </div>

      <div className="my-4 text-center card-content">
        <h3 className="text-lg font-semibold text-gray-700">{product?.name}</h3>
        <div className="flex items-center justify-center mt-2">
          <Rate disabled defaultValue={product?.rating} />
        </div>
        <div className="mt-2">
          <span className="text-red-500 text-lg font-bold">
            {product?.price.toLocaleString()} đ
          </span>
          {product?.oldPrice && <span className="text-gray-500 line-through text-sm ml-2">
            {product?.oldPrice.toLocaleString()} đ
          </span>}
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
