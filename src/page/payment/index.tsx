import { useEffect } from 'react'
import { FaTrashCan } from 'react-icons/fa6';
import { CartItem } from '../../types/cartItem.type';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, Button, message, Table, Typography } from 'antd'
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import http from '../../utils/http';
import { useLoadingStore } from '../../stores/loadingStore';

function Payment() {
  const { Text } = Typography;
  const { getPaymentList, deleteCartItem, deletePaymentList, deleteItemsInCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const cart = getPaymentList();
  const { setIsLoading } = useLoadingStore();
  const vat = 0.1;
  const totalBeforeTax = cart.reduce(
    (sum, item) => sum + item.price * item.quantity ,
    0
  );
  const tax = totalBeforeTax * vat;
  const totalAfterTax = totalBeforeTax + tax;

  useEffect(() => {
    setIsLoading(true);
    if (!isLoggedIn) {
      message.error("Vui lòng đăng nhập để tiếp tục thanh toán!");
      navigate("/login");
    }
    setTimeout(() => setIsLoading(false), 100);
  }, [isLoggedIn, navigate]);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      message.info("Giỏ hàng trống, không thể thanh toán!");
      return;
    }

    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      await http.post("/orders", {
        user: {
          id: user.id!,
          fullName: user.fullName!,
        },
        products: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total: totalAfterTax,
        date: new Date().toISOString(),
      });
      deletePaymentList();
      deleteItemsInCart(cart);
      message.success("Thanh toán thành công! Đơn hàng của bạn đã được lưu.");
      navigate("/success_purchase");
    } catch (error) {
      console.error("Lỗi khi lưu đơn hàng:", error);
      message.error("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
    } finally {
      setTimeout(() => setIsLoading(false), 100);
    }
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
      render: (quantity: number) => (
        <p>x{quantity}</p>
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
    <h2 className="text-2xl font-semibold text-green-600 mb-16 uppercase">
      Đơn hàng
    </h2>
    <Table
      dataSource={cart}
      columns={columns}
      rowKey="id"
      pagination={false}
      rowSelection={{ type: 'checkbox', columnWidth: 48 }}
    />

    <div className="ml-auto">
      <div className="mt-8 p-4 border border-gray-200 rounded-lg w-[500px] ml-auto">
        <div className="flex justify-between items-center mb-2">
          <span>Tổng tiền (chưa thuế):</span>
          <span>{totalBeforeTax.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Thuế (VAT 10%):</span>
          <span>{tax?.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Tổng phải thanh toán:</span>
          <span>{totalAfterTax?.toLocaleString()} đ</span>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="primary"
          className="mt-10 px-5"
          onClick={handleCheckout}
        >
          Thanh toán
        </Button>
      </div>
    </div>
  </div>
  )
}

export default Payment;
