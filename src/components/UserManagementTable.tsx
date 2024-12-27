import React, { useEffect, useState } from "react";
import { Table, message, Modal, Tooltip, Input, Select } from "antd";
import http from "../utils/http";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { User } from "../types/user.type";
import { Order } from "../types/order.type";

const { confirm } = Modal;
const { Option } = Select;
const { Search } = Input;

const UserManagementTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, ordersRes] = await Promise.all([
        http.get("/users"),
        http.get("/orders"),
      ]);

      const filteredUsers = usersRes.data.filter(
        (user: User) => user.role !== "admin"
      );
      setUsers(filteredUsers);
      setOrders(ordersRes.data);
    } catch {
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const calculateOrderStats = (userId: string) => {
    const userOrders = orders.filter((order) => order.user.id === userId);
    const totalOrders = userOrders.length;
    const totalAmount = userOrders.reduce((sum, order) => sum + order.total, 0);
    return { totalOrders, totalAmount };
  };

  const toggleUserStatus = async (user: User) => {
    const updatedStatus =
      user.status === "active" || !user.status ? "banned" : "active";
    try {
      await http.patch(`/users/${user.id}`, {
        status: updatedStatus,
      });
      message.success(
        `User has been ${updatedStatus === "active" ? "activated" : "banned"}.`
      );
      fetchData();
    } catch {
      message.error("Failed to update user status");
    }
  };

  const showConfirm = (user: User) => {
    const action = user.status === "active" ? "ban" : "activate";
    confirm({
      title: `Are you sure you want to ${action} this user?`,
      okText: "Yes",
      cancelText: "No",
      onOk() {
        toggleUserStatus(user);
      },
      onCancel() {
        message.info("Action cancelled");
      },
    });
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusFilterChange = (value: string) => {
    setFilterStatus(value);
  };

  const filteredData = users.filter((user) => {
    const matchesSearchText = user.fullName
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const userStatus = user.status?.toLowerCase() || "active";
    const matchesStatus =
      !filterStatus || filterStatus === "all" || userStatus === filterStatus.toLowerCase();
    return matchesSearchText && matchesStatus;
  });
  

  const columns = [
    {
      title: "No",
      key: "index",
      render: (_: number, record: User, index: number) => {
        return (currentPage - 1) * 10 + index + 1;
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a: User, b: User) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a: User, b: User) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    {
      title: "Total Orders",
      key: "totalOrders",
      render: (_: number, record: User) => {
        const stats = calculateOrderStats(record.id.toString());
        return stats.totalOrders;
      },
      sorter: (a: User, b: User) => {
        const aStats = calculateOrderStats(a.id.toString());
        const bStats = calculateOrderStats(b.id.toString());
        return aStats.totalOrders - bStats.totalOrders;
      },
    },
    {
      title: "Total Amount Spent",
      key: "totalAmount",
      render: (_: number, record: User) => {
        const stats = calculateOrderStats(record.id.toString());
        return stats.totalAmount.toLocaleString() + " VND";
      },
      sorter: (a: User, b: User) => {
        const aStats = calculateOrderStats(a.id.toString());
        const bStats = calculateOrderStats(b.id.toString());
        return aStats.totalAmount - bStats.totalAmount;
      },
    },
    {
      title: "Action",
      key: "status",
      render: (_: number, record: User) => {
        const currentStatus = record.status || "active";
        return (
          <div className="flex items-center gap-2">
            {currentStatus === "banned" ? (
              <Tooltip title="Mở khóa người dùng">
                <CheckCircleOutlined
                  style={{
                    fontSize: "25px",
                    color: "#52c41a",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    showConfirm({ ...record, status: currentStatus })
                  }
                />
              </Tooltip>
            ) : (
              <Tooltip title="Chặn người dùng">
                <CloseCircleOutlined
                  style={{
                    fontSize: "25px",
                    color: "#ff4d4f",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    showConfirm({ ...record, status: currentStatus })
                  }
                />
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex gap-5">
        <Search
          placeholder="Search by full name"
          onSearch={handleSearch}
          style={{ marginBottom: 16, width: 300 }}
        />
        <div style={{ marginBottom: 16 }}>
          <Select
            placeholder="Filter by status"
            onChange={handleStatusFilterChange}
            allowClear
            style={{ width: 200 }}
          >
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="active">Active</Option>
            <Option value="banned">Banned</Option>
          </Select>
        </div>
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: 10,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default UserManagementTable;
