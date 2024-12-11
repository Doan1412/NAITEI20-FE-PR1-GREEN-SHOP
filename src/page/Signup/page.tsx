import React, { useState } from "react";
import { Button, Input, Form, Checkbox, Breadcrumb, message } from "antd";
import { Link, useNavigate } from "react-router";
import { User } from "../../types/user.type";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { v4 as uuidv4 } from "uuid";
import http from "../../utils/http";

const Register = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState<User>({
    id: 0,
    fullName: "",
    phoneNumber: "",
    email: "",
    website: "",
    password: "",
    confirmPassword: "",
    subscribe: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      subscribe: checked,
    });
  };

  const handleRegister = async () => {
    const {
      fullName,
      phoneNumber,
      email,
      website,
      password,
      confirmPassword,
    } = formData;

    if (!fullName || !phoneNumber || !email || !password || !confirmPassword || !website) {
      message.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      message.error("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const response = await http.post("/users", {
        ...formData,
        token: uuidv4(),
        role: "user"
      });

      if (response.status === 201) {
        message.success("Đăng ký thành công!");
        setFormData({
          id: 0,
          fullName: "",
          phoneNumber: "",
          email: "",
          website: "",
          password: "",
          confirmPassword: "",
          subscribe: false,
        });
        navigation("/login");
      } else {
        message.error("Đăng ký không thành công!");
      }
    } catch {
      message.error("Đã xảy ra lỗi khi đăng ký!");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-16">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: <div className="text-green-600">Đăng kí</div>,
            },
          ]}
        />
      </div>

      <div className="flex min-h-screen">
        <div className="w-full max-w-5xl bg-white">
          <h2 className="text-2xl font-semibold text-green-600 mb-6">
            THÔNG TIN CÁ NHÂN
          </h2>
          <Form layout="vertical" onFinish={handleRegister}>
            <div className="grid grid-cols-2 gap-6">
              <Form.Item label="Họ và tên">
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Nhập họ và tên"
                />
              </Form.Item>

              <Form.Item label="Số ĐT">
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>

              <Form.Item label="Địa chỉ email">
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                />
              </Form.Item>

              <Form.Item label="Website của bạn">
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="Nhập website"
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Checkbox
                checked={formData.subscribe}
                onChange={handleCheckboxChange}
              >
                Đăng ký nhận thông tin qua email
              </Checkbox>
            </Form.Item>

            <h2 className="text-2xl font-semibold text-green-600 mb-6 mt-16">
              THÔNG TIN TÀI KHOẢN
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <Form.Item label="Mật khẩu">
                <Input.Password
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Nhập mật khẩu"
                />
              </Form.Item>

              <Form.Item label="Nhập lại mật khẩu">
                <Input.Password
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Nhập lại mật khẩu"
                />
              </Form.Item>
            </div>

            <div className="flex gap-5 mt-6">
              <Button htmlType="button" className="rounded-full px-10 py-5">
                QUAY LẠI
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="rounded-full px-10 py-5"
              >
                ĐĂNG KÝ
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
