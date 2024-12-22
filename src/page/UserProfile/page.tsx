import React, { useEffect, useState } from "react";
import { Button, Input, Form, Breadcrumb, message, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CameraOutlined } from "@ant-design/icons";
import http from "../../utils/http";
import { User } from "../../types/user.type";
import { getUserInfo } from "../../api/userApi";
import axios from "axios";
import Avatar from "../../assets/images/avatar.png";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await getUserInfo(token);
          setUserInfo(response[0]);
          form.setFieldsValue(response[0]);
        } catch {
          message.error("Đã xảy ra lỗi khi tải thông tin người dùng!");
        }
      } else {
        message.error("Vui lòng đăng nhập để xem thông tin cá nhân!");
        navigation("/login");
      }
    };

    fetchUserInfo();
  }, [form, navigation]);

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

  const handleAvatarChange = async (file: File) => {
    if (!file) {
      message.error("Vui lòng chọn ảnh để tải lên!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      if (response.data.secure_url) {
        setUserInfo({ ...userInfo, avatar: response.data.secure_url } as User);
        message.success("Tải lên avatar thành công!");
      } else {
        message.error("Tải lên avatar thất bại!");
      }
    } catch {
      message.error("Đã xảy ra lỗi khi tải lên avatar!");
    }
  };

  const beforeUpload = (file: File) => {
    handleAvatarChange(file);
    return false;
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    if (!userInfo) return;

    try {
      const isValid = await form.validateFields();
      if (isValid) {
        const response = await http.put(`/users/${userInfo.id}`, {
          ...userInfo,
          token,
        });
        if (response.status === 200) {
          message.success("Cập nhật thông tin thành công!");
          setIsEditing(false);
        } else {
          message.error("Cập nhật thông tin không thành công!");
        }
      }
    } catch {
      message.error("Vui lòng kiểm tra lại thông tin của bạn!");
    }
  };

  if (!userInfo) {
    return <p>Đang tải thông tin...</p>;
  }

  return (
    <div className="w-full max-w-5xl min-h-screen mx-auto">
      <div className="mb-16">
        <Breadcrumb
          items={[
            { title: <Link to="/">Home</Link> },
            { title: <div className="text-green-600">Thông Tin Cá Nhân</div> },
          ]}
        />
      </div>

      <div className="flex min-h-screen">
        <div className="w-full max-w-5xl bg-white">
          <h2 className="text-2xl font-semibold text-green-600 mb-6">
            THÔNG TIN CÁ NHÂN
          </h2>
          <Form form={form} layout="vertical">
            <Form.Item>
              <div className="flex flex-col items-center gap-4 relative">
                <img
                  src={userInfo?.avatar || Avatar}
                  alt="Avatar"
                  referrerPolicy="no-referrer" 
                  className="w-40 h-40 object-cover rounded-full border"
                />
                {isEditing && (
                  <Upload
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    className="absolute bottom-0 left-[53%]"
                  >
                    <Button
                      icon={<CameraOutlined />}
                      shape="circle"
                      size="large"
                      className="bg-green-600 text-white"
                    />
                  </Upload>
                )}
              </div>
            </Form.Item>

            <div className="grid grid-cols-2 gap-6">
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: "Họ và tên là bắt buộc!" }]}
              >
                <Input
                  name="fullName"
                  value={userInfo.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Nhập họ và tên"
                />
              </Form.Item>

              <Form.Item
                label="Số ĐT"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Số điện thoại là bắt buộc!" },
                  { pattern: /^[0-9]+$/, message: "Số điện thoại không hợp lệ!" },
                ]}
              >
                <Input
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>

              <Form.Item
                label="Địa chỉ email"
                name="email"
                rules={[
                  { required: true, message: "Email là bắt buộc!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Nhập email"
                />
              </Form.Item>

              <Form.Item label="Website của bạn" name="website">
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
