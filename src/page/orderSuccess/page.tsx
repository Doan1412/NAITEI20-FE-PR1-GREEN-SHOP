import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Image from "../../assets/images/order_success.avif";

const SuccessPage: React.FC = () => {
  return (
    <div className="container w-[600px] mx-auto my-20 text-center bg-white p-10 rounded-lg">
      <div className="mb-8">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-3xl font-semibold text-green-600 mb-4">
          Mua hàng thành công!
        </h2>
      </div>
      <p className="text-lg text-gray-600 mb-8">
        Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được xác nhận và đang được xử lý.
      </p>
      <div className="mb-8">
        <img
          src={Image}
          alt="Success"
          className="mx-auto rounded-lg"
        />
      </div>
      <div>
        <Link to="/">
          <Button
            type="primary"
            size="large"
            className="mt-6 px-10 py-3 text-white bg-green-500 hover:bg-green-600"
          >
            Quay về trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
