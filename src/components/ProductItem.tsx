import { Button, Rate } from 'antd';
import { Product } from '../types/product.type';
import { useCart } from '../contexts/CartContext';
import { NavLink } from 'react-router-dom';
interface ProductItemProps {
  product: Product;
}
const ProductItem = ({ product }: ProductItemProps) => {
  const { handleBuyNow } = useCart();

  return (
    <div className="w-full border rounded flex items-start">
      <img src={product.images[0]} alt={product.name} className="w-56 h-56 mr-4" />
      <div className='p-4'>
        <NavLink to={`/products/${product?.id}`}>
          <h3 className="text-lg">{product.name}</h3>
          <Rate disabled defaultValue={product.rating} className="text-xs"/>
          <p className='text-sm mt-1'>{product.description}</p>
          <p className="text-red-500 mt-2">{product?.price?.toLocaleString()} ₫</p>
        </NavLink>
        <Button type="primary" className="mt-3 rounded-full px-5" onClick={(e) => handleBuyNow(product, e)}>
          Mua Ngay
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
