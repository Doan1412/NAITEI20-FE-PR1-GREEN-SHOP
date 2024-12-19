import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import ProductTable from "../../components/ProductTable";

const ProductManagement: React.FC = () => {
  return (
    <div className="container w-[1100px] mx-auto mb-40">
      <div className="mb-5">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: <div className="text-green-600">Danh sách sản phẩm</div>,
            },
          ]}
        />
      </div>
      <h2 className="text-2xl font-semibold text-green-600 mb-3 uppercase">Danh sách sản phẩm</h2>
      <ProductTable />
    </div>
  );
};

export default ProductManagement;
