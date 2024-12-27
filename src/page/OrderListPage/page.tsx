import React, { useEffect, useState } from "react";
import {
  Tag,
  Typography,
  Collapse,
  Table,
  Breadcrumb,
  Modal,
  Rate,
  Input,
  message,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { Order } from "../../types/order.type";
import { CartItem } from "../../types/cartItem.type";
import { Link } from "react-router-dom";
import { VscCodeReview } from "react-icons/vsc";
import { Product } from "../../types/product.type";
import { Comment } from "../../types/comment.type";
import http from "../../utils/http";
import { User } from "../../types/user.type";
import { formatNumberWithDots } from "../../utils";

const { Text } = Typography;
const { Panel } = Collapse;

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      try {
        const response = await http.get(
          `/orders?user.id=${user.id}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleReviewClick = async (product: CartItem) => {
    try {
      const response = await http.get(
        `/products/${product.id}`
      );
      const productData = response.data;
      setSelectedProduct(productData);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
    setIsModalVisible(true);
  };
  

  const handleOk = async () => {
    if (selectedProduct) {
      const user : User = JSON.parse(localStorage.getItem("user") || "{}");
      const existingCommentIndex = selectedProduct.comments
        ? selectedProduct.comments.findIndex(
            (comment) => comment.userName === user.fullName
          )
        : -1;
      const newComment: Comment = {
        id: uuidv4(),
        content: comment,
        userName: user.fullName,
        avatar: user.avatar,
        rating: rating,
      };
      try {
        if (!selectedProduct.comments) {
          selectedProduct.comments = [];
        }
        if (existingCommentIndex >= 0) {
          selectedProduct.comments[existingCommentIndex] = newComment;
        } else {
          selectedProduct.comments.push(newComment);
        }

        await http.patch(`/products/${selectedProduct.id}`, {
          comments: selectedProduct.comments,
        });

        message.success("Đánh giá của bạn đã được gửi!");
        setIsModalVisible(false);
        setComment("");
        setRating(0);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };  
  const handleCancel = () => {
    setIsModalVisible(false);
    setComment("");
    setRating(0);
  };

  const productColumns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="product"
          className="w-32 h-32 object-cover rounded border border-gray-200 shadow-sm"
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: CartItem) => (
        <Link to={`/products/${record.id}`}>
          <Text className="font-medium text-gray-700 hover:text-[#3FB871]">{name}</Text>
        </Link>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number) => (
        <Text className="text-gray-700">{quantity}</Text>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <Text className="text-green-600 font-medium">
          {price?.toLocaleString()} đ
        </Text>
      ),
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_: number, record: CartItem) => (
        <Text className="font-semibold text-green-600">
          {(record.price * record.quantity)?.toLocaleString()} đ
        </Text>
      ),
    },
    {
      title: "Đánh giá",
      key: "review",
      render: (_: number, record: CartItem) => (
        <button onClick={() => handleReviewClick(record)} className="px-4 py-2">
          <VscCodeReview size={25} className="text-green-500" />
        </button>
      ),
    },
  ];

  return (
    <div className="container mx-auto mt-5 min-h-screen w-3/4">
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-green-600 mb-8 uppercase">
          Danh sách đơn hàng
        </h2>
        <div className="flex gap-2 py-1 px-4 border rounded text-[#3FB871]">
          <p className="">Tổng chi tiêu:</p>
          <p>{formatNumberWithDots(orders.reduce( (sum, item) => sum + item.total , 0))} đ</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-lg">Đang tải dữ liệu...</div>
      ) : (
        <Collapse
          accordion
          className="bg-white border border-gray-200 rounded-md"
        >
          {orders.map((order) => (
            <Panel
              key={order.id}
              header={
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-4">
                    <Tag color="blue" className="font-medium">
                      Đơn hàng #{order.id}
                    </Tag>
                    <div className="text-gray-700 font-medium">
                      Tổng:{" "}
                      <span className="text-green-600 font-semibold">
                        {order.total?.toLocaleString()} đ
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span className="text-sm">Ngày đặt hàng</span>
                    </div>
                    <div className="text-gray-400 text-sm text-end">
                      <span className="text-gray-600">
                        {new Date(order.date).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              }
            >
              <Table
                dataSource={order.products}
                columns={productColumns}
                rowKey="id"
                pagination={false}
                className="shadow-sm"
              />
            </Panel>
          ))}
        </Collapse>
      )}

      <Modal
        title="Đánh giá sản phẩm"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Gửi đánh giá"
        cancelText="Hủy"
      >
        <div className="mt-7 flex gap-6">
          <div className="w-1/2 flex flex-col items-center gap-4 border-r pr-6">
            <img
              src={selectedProduct?.images?.[0] || ""}
              alt={selectedProduct?.name}
              className="w-48 h-48 rounded-lg object-cover border border-gray-300 shadow-md"
            />
            <span className="text-xl font-semibold text-gray-800 text-center">
              {selectedProduct?.name}
            </span>
          </div>

          <div className="w-1/2 flex flex-col gap-6">
            <div>
              <span className="block mb-2 font-medium text-gray-700">
                Đánh giá:
              </span>
              <Rate
                allowHalf
                value={rating}
                onChange={(value) => setRating(value)}
                className="text-yellow-500 text-2xl"
              />
            </div>
            <div>
              <span className="block mb-2 font-medium text-gray-700">
                Nhận xét của bạn:
              </span>
              <Input.TextArea
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Hãy chia sẻ trải nghiệm của bạn về sản phẩm này"
                className="border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderListPage;
