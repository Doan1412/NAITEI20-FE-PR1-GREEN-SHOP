import React from "react";
import UserManagementTable from "../../components/UserManagementTable";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const UserManagement: React.FC = () => {
  return (
    <div className="container w-[1100px] mx-auto mb-40">
      <div className="mb-5">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: <div className="text-green-600">Danh sách người dùng</div>,
            },
          ]}
        />
      </div>
      <h2 className="text-2xl font-semibold text-green-600 mb-10 uppercase"> Danh sách người dùng </h2>
      <UserManagementTable />
    </div>
  );
};

export default UserManagement;
