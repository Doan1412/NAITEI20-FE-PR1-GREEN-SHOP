import React, { Key, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  InputNumber,
  message,
  Table,
  Typography,
} from "antd";
import { useCart } from "../../contexts/CartContext";
import { CartItem } from "../../types/cartItem.type";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";
import { TableRowSelection } from "antd/es/table/interface";

const CartPage: React.FC = () => {
  const { Text } = Typography; 
  const { cart, updateQuantity, deleteCartItem, deleteAllCartItem, addToPaymentList } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      message.error("Vui lòng đăng nhập để tiếp tục thanh toán!");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleCheckout = async () => {
    if (selectedRows.length === 0) {
      message.info('Vui lòng chọn sản phẩm muốn thanh toán');
      return;
    }

    addToPaymentList(selectedRows);
    navigate("/payments");
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="product" className="w-32 h-32" />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: CartItem) => (
        <Link to={`/products/${record.id}`}>
          <Text className="font-medium text-gray-700">{name}</Text>
        </Link>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price?.toLocaleString()} đ`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number, record: CartItem) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => updateQuantity(record.id, value!)}
        />
      ),
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_: number, record: CartItem) =>
        `${(record.price * record.quantity)?.toLocaleString()} đ`,
    },
    {
      title: "Xóa",
      key: "action",
      render: (_: number, record: CartItem) => (
        <Button danger onClick={() => deleteCartItem(record.id)} className="border-none px-2">
          <FaTrashCan />
        </Button>
      ),
    },
  ];

  const onSelectChange = (
    newSelectedRowKeys: Key[],
    selectedRows: CartItem[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<CartItem> = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: 'checkbox',
    columnWidth: 48,
  }

  return (
    <div className="container w-[1100px] mx-auto mb-40">
      <div className="mb-16">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: <div className="text-green-600">Giỏ hàng</div>,
            },
          ]}
        />
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-green-600 uppercase">
          Giỏ hàng
        </h2>
        <div className="flex justify-end gap-4 my-12">
          {
          cart.length > 0 &&  
            <Button danger onClick={deleteAllCartItem}>
              Xóa giỏ hàng
            </Button>
          }
          <Link to="/">
            <Button type="primary">Tiếp tục mua</Button>
          </Link>
        </div>
      </div>
      <Table
        dataSource={cart}
        columns={columns}
        rowKey="id"
        pagination={false}
        onChange={() => console.log()}
        rowSelection={rowSelection}
      />

      <div className="ml-auto">
        {
          cart.length > 0 && <div className="flex justify-end">
            <Button
              type="primary"
              className="mt-10 px-5"
              onClick={handleCheckout}
            >
              Thanh toán
            </Button>
          </div>
        }
      </div>
    </div>
  );
};

export default CartPage;
