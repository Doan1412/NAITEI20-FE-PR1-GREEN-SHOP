import React, { useEffect, useState } from "react";
import { Button, Input, Form, Breadcrumb, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import http from "../../utils/http";
import { User } from "../../types/user.type";
import { getUserInfo } from "../../api/userApi";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await getUserInfo(token);
          setUserInfo(response[0]);
        } catch {
          message.error("Đã xảy ra lỗi khi tải thông tin người dùng!");
        }
      } else {
        message.error("Vui lòng đăng nhập để xem thông tin cá nhân!");
        navigation("/login");
      }
    };

    fetchUserInfo();
  }, [navigation]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!userInfo) return;
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    if (!userInfo) return;
    try {
      const response = await http.put(`/users/${userInfo.id}`, 
        {
          ...userInfo,
          token
        }
      );
      if (response.status === 200) {
        message.success("Cập nhật thông tin thành công!");
        setIsEditing(false);
      } else {
        message.error("Cập nhật thông tin không thành công!");
      }
    } catch {
      message.error("Đã xảy ra lỗi khi cập nhật thông tin!");
    }
  };

  if (!userInfo) {
    return <p>Đang tải thông tin...</p>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-16">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: <div className="text-green-600">Thông Tin Cá Nhân</div>,
            },
          ]}
        />
      </div>

      <div className="flex min-h-screen">
        <div className="w-full max-w-5xl bg-white">
          <h2 className="text-2xl font-semibold text-green-600 mb-6">
            THÔNG TIN CÁ NHÂN
          </h2>
          <Form layout="vertical">
            <div className="grid grid-cols-2 gap-6">
              <Form.Item label="Họ và tên">
                <Input
                  name="fullName"
                  value={userInfo.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Nhập họ và tên"
                />
              </Form.Item>

              <Form.Item label="Số ĐT">
                <Input
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>

              <Form.Item label="Địa chỉ email">
                <Input
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Nhập email"
                />
              </Form.Item>

              <Form.Item label="Website của bạn">
                <Input
                  name="website"
                  value={userInfo.website}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Nhập website"
                />
              </Form.Item>
            </div>

            <div className="flex gap-5 mt-6">
              {!isEditing ? (
                <Button
                  type="primary"
                  className="rounded-full px-10 py-5"
                  onClick={() => setIsEditing(true)}
                >
                  CHỈNH SỬA
                </Button>
              ) : (
                <>
                  <Button
                    type="primary"
                    className="rounded-full px-10 py-5"
                    onClick={handleSaveChanges}
                  >
                    LƯU THAY ĐỔI
                  </Button>
                  <Button
                    htmlType="button"
                    className="rounded-full px-10 py-5"
                    onClick={() => setIsEditing(false)}
                  >
                    HỦY
                  </Button>
                </>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
