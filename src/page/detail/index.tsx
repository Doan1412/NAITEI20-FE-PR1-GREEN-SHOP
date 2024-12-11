import React, { useEffect, useState } from 'react'
import { Button, Divider, Input, message, Rate, Tabs, TabsProps } from 'antd'
import { HeartFilled, SearchOutlined, RightOutlined, LeftOutlined, ShareAltOutlined } from "@ant-design/icons"
import http from '../../utils/http'
import { formatNumberWithDots } from '../../utils';
import { useNavigate, useParams } from 'react-router';
import { Product } from '../../types/product.type';
import { ShareSocial } from 'react-share-social' 
import ProductCard from '../../components/ProductCard';
import CommentItem from '../../components/CommentItem';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

// interface IDetailProduct {
//   product:
// }

function DetailProduct() {
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1);
  const [hoverImage, setHoverImage] = useState<string>('s');
  const [activeImage, setActiveImage] = useState<string>('/images/spx2-4.png');
  const { id } = useParams();
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [currentPagination, setCurrentPagination] = React.useState(1);
  const [showProduct, setShowProduct] = React.useState<Product[]>([]);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const getDetailProduct = async () => {
    try {
      const response = await http.get(`/products/${id}`);
      setProduct(response.data);
      setActiveImage(response.data.images[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const getListProduct = async () => {
    try {
      const response = await http.get('/products');
      setListProduct(response.data);
      setShowProduct(response.data.slice((currentPagination - 1) * 4, currentPagination * 4));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDetailProduct()
    getListProduct()
  }, []);

  useEffect(() => {
    setShowProduct(listProduct.slice((currentPagination - 1) * 4, currentPagination * 4));
  }, [currentPagination]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      message.error('Please login to add product to cart');
      navigate('/login');
      return;
    }
    if (product) {
      addToCart(product, quantity);
    } else {
      message.error('Product not found');
    }
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <p className="text-[#3FB871] px-8">THÔNG TIN SẢN PHẨM</p>,
      children: <ul className="flex flex-col gap-4 pl-8 text-[#898989] text-sm">
        <li className="flex items-center gap-2">
          <span>Tên phổ thông: </span>
          <span>{product?.commonName}</span>
        </li>
        <li className="flex items-center gap-2">
          <span>Tên khoa học:</span>
          <span>{product?.scientificName}</span>
        </li>
        <li className="flex items-center gap-2">
          <span>Họ thực vật:</span>
          <span>{product?.plantFamily}</span>
        </li>
        <li className="flex items-center gap-2">
          <span>Chiều cao:</span>
          <span>{product?.height}</span>
        </li>
        <li>{product?.origin}</li>
        <li>{product?.describe}</li>
      </ul>,
    },
    {
      key: '2',
      label: 'KHÁCH HÀNG ĐÁNH GIÁ',
      children: (
        product?.comments.map((comment) => (<CommentItem key={comment.id} comment={comment} />))
      ),
    }
  ];

  return (
    <div className="py-[40px]">
      <div className="flex gap-8 max-w-[1140px] mx-[auto]">
        <div className="flex flex-col gap-2">
          <img src={hoverImage || activeImage} width={520} className="w-[520px] h-[400px]" alt={product?.name} />
          <div className="flex items-center gap-3 mt-8">
            {
              product?.images.map((image, index) => (
                <img
                  src={image}
                  alt="image"
                  key={index}
                  width={80}
                  height={80}
                  className={`object-cover rounded transition w-[80px] h-[80px] cursor-pointer hover:scale-110 ${activeImage === image && 'border-2 border-[#3FB871]'}`}
                  onClick={() =>setActiveImage(image)}
                  onMouseLeave={() => setHoverImage('')}
                  onMouseEnter={() => setHoverImage(image)}
                />
              ))
            }
          </div>
        </div>
        <div className="w-2/3">
          <p>{product?.name}</p>
          <Rate disabled defaultValue={product?.rating} />
          <div className="flex items-center gap-3">
            <p className="text-[#E50914]">{formatNumberWithDots(product?.price || 0)} VND</p>
            { product?.oldPrice && (<div className="text-xs line-through text-[#898989]">{formatNumberWithDots(product?.oldPrice)} VND</div>)}
          </div>
          <Divider/>
          <p className="text-xs text-[#898989]">{product?.description}</p>
          <Divider/>
          <div className="flex items-center gap-3">
            <span>Số lượng</span>
            <div className="flex items-center gap-2">
              <Button onClick={() => setQuantity(prev =>  Math.max(prev - 1, 0))}>-</Button>
              <Input
                className="w-[50px] [&::-webkit-inner-spin-button]:appearance-none" 
                type='number'
                value={quantity}
                onChange={e => {
                  const value = parseInt(e.target.value);
                  if (value >= 0) {
                    setQuantity(value);
                  }
                }}
              />
              <Button onClick={() => setQuantity(prev => prev + 1)}>+</Button>
            </div>
          </div>
          <Divider/>
          <div className="flex items-center gap-3 relative">
            <Button className="bg-[#3FB871] text-white rounded-3xl px-7 py-5" onClick={handleAddToCart}>Mua ngay</Button>
            <div className="p-1 border w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer transition hover:bg-[#3FB871] group">
              <SearchOutlined style={{fontSize: '12px'}} className="group-hover:text-white" />
            </div>
            <div className="p-1 border w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#3FB871] group">
              <HeartFilled style={{fontSize: '12px'}} className="group-hover:text-white" />
            </div>
            <div className="p-1 border w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#3FB871] group">
              <ShareAltOutlined />
            </div>
            <ShareSocial 
              url ={`http://localhost:5173/products/${id}`}
              socialTypes={['facebook']}
              style={{
                root: {
                  padding: 0,
                  height: '40px',
                  width: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  left: '230px',
                  top: '-1px',
                  opacity: 0
                },
                copyContainer: {
                  display: 'none'
                }
              }}
            />
          </div>
        </div>
      </div >
      <div className="max-w-[1140px] mx-auto py-[50px]">
        <Tabs tabPosition="top" defaultActiveKey="1" items={items} />
      </div>
      {/* List products */}
      <div className="flex justify-between items-center w-full relative max-w-[1140px] mx-auto">
        <div className="flex items-center gap-2 absolute top-2 right-0 z-10">
          <Button 
            className="border border-gray-300 px-2.5 rounded-full"
            onClick={() => setCurrentPagination(prev => Math.max(prev - 1, 1))}
            disabled={currentPagination === 1}
          >
            <LeftOutlined style={{
              fontSize: "0.7em"
            }} />
          </Button>
          <Button
            className="border border-gray-300 px-2.5 rounded-full"
            onClick={() => setCurrentPagination(prev => Math.min(prev + 1, Math.ceil(listProduct.length / 8)))}
            disabled={currentPagination === Math.ceil(listProduct.length / 8)}
          >
            <RightOutlined style={{
              fontSize: "0.7em"
            }} />
          </Button>
        </div>
        <Tabs
            className="w-full"
            defaultActiveKey="1"
            items={[
              {
                label: 'Sản phẩm khuyến mãi',
                key: '1',
                children:
                (<div className="flex flex-wrap gap-9">
                  {showProduct.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>),
              },
            ]}
          />
      </div>
    </div>
  )
}

export default DetailProduct
