import React, { useEffect } from 'react'
import { Product } from '../types/product.type';
import http from '../utils/http';
import ProductCard from '../components/ProductCard';
import "../assets/styles/home.scss";
import { Button, Tabs } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function Home() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [promotionalProduct, setPromotionalProduct] = React.useState<Product[]>([]);
  const [bestSellerProduct, setBestSellerProduct] = React.useState<Product[]>([]);
  const [currentPagination, setCurrentPagination] = React.useState(1);
  const [showProduct, setShowProduct] = React.useState<Product[]>([]);
  const [proCurentPagination, setProCurrentPagination] = React.useState(1);
  const [showPromotionalProduct, setShowPromotionalProduct] = React.useState<Product[]>([]);

  const getListProduct = async () => {
    try {
      const res = await http.get('/products');
      setProducts(res.data);
      const promotionalProductData = res.data.filter((product: Product) => product.discount > 0);
      const bestSellerProductData = res.data.sort((a: Product, b: Product) => b.sales - a.sales);
      setPromotionalProduct(promotionalProductData);
      setBestSellerProduct(bestSellerProductData);
      setShowPromotionalProduct(promotionalProductData.slice((proCurentPagination - 1) * 6, proCurentPagination * 6));
      setShowProduct(res.data.slice((currentPagination - 1) * 8, currentPagination * 8));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getListProduct();
  }, [])

  useEffect(() => {
    setShowProduct(products.slice((currentPagination - 1) * 8, currentPagination * 8));
  },[currentPagination])

  useEffect(() => {
    setShowPromotionalProduct(promotionalProduct.slice((proCurentPagination - 1) * 6, proCurentPagination * 6));
  },[proCurentPagination])

  return (
    <div className="max-w-[1140px] mx-auto mb-20">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Sản phẩm nổi bật',
            key: '1',
            children:
            (<div className="flex flex-items justify-center gap-8">
              <div>
                <ProductCard product={products[0]} className="card-large mb-5" />
                <div className="flex items-center gap-8">
                  <ProductCard product={products[1]} />
                  <ProductCard product={products[2]} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-8 mb-5">
                  <ProductCard product={products[3]} />
                  <ProductCard product={products[5]} />
                </div>
                <ProductCard product={products[5]} className="card-large" />
              </div>
            </div>),
          },
        ]}
      />

      <div className="flex gap-8">
        <Tabs
          className='w-[23%]'
          defaultActiveKey="1"
          items={[
            {
              label: 'Sản phẩm mua nhiều',
              key: '1',
              children:
              (<div className="">
                {bestSellerProduct.slice(0,6).map((product) => <ProductCard showDiscount={false} key={product.id} product={product} className="flex w-full most-purchased-card" />)}
              </div>),
            },
          ]}
        />
        <div className="w-[76%] relative">
          <div className="flex items-center gap-2 absolute top-2 right-0 z-10">
            <Button 
              className="border border-gray-300 px-2.5 rounded-full"
              onClick={() => setProCurrentPagination(prev => Math.max(prev - 1, 1))}
              disabled={proCurentPagination === 1}
            >
              <LeftOutlined style={{
                fontSize: "0.7em"
              }} />
            </Button>
            <Button
              className="border border-gray-300 px-2.5 rounded-full"
              onClick={() => setProCurrentPagination(prev => Math.min(prev + 1, Math.ceil(promotionalProduct.length / 6)))}
              disabled={proCurentPagination === Math.ceil(promotionalProduct.length / 6)}
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
                  {showPromotionalProduct.map((product) => <ProductCard key={product.id} product={product} showDiscount />)}
                </div>),
              },
            ]}
          />
        </div>
      </div>
      <div className="my-10 relative">
        <img src="/images/banner-home.jpg" className="w-full h-[200px] object-cover rounded-lg" alt="banner" />
        <div className="absolute top-10 right-10 text-white flex flex-col items-center gap-2 border border-2 border-white py-6 px-16">
          <p className="text-3xl">SƯƠNG RỒNG</p>
          <p className="text-4xl font-semibold">ĐÀ LẠT</p>
        </div>
      </div>
      <div className="flex justify-between items-center w-full relative">
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
            onClick={() => setCurrentPagination(prev => Math.min(prev + 1, Math.ceil(products.length / 8)))}
            disabled={currentPagination === Math.ceil(products.length / 8)}
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

export default Home;
