import React, { useState } from "react";
import { Button, Input, Form, Checkbox, Breadcrumb, message } from "antd";
import { Link, useNavigate } from "react-router";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { v4 as uuidv4 } from "uuid";
import http from "../../utils/http";

const Register = () => {
  const navigation = useNavigate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
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
    const { fullName, phoneNumber, email, website, password, confirmPassword } =
      formData;

    if (
      !fullName ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword ||
      !website
    ) {
      message.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      message.error("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const isValid = await form.validateFields();
      if (isValid) {
        const existingUserResponse = await http.get(`/users?email=${email}`);
        if (existingUserResponse.data.length > 0) {
          message.error("Email này đã được đăng ký!");
          return;
        }
        const response = await http.post("/users", {
          ...formData,
          token: uuidv4(),
          role: "user",
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
              <Form.Item
                label="Họ và tên"
                rules={[{ required: true, message: "Họ và tên là bắt buộc!" }]}
              >
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Nhập họ và tên"
                />
              </Form.Item>

              <Form.Item
                label="Số ĐT"
                rules={[
                  { required: true, message: "Số điện thoại là bắt buộc!" },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>

              <Form.Item
                label="Địa chỉ email"
                rules={[
                  { required: true, message: "Email là bắt buộc!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                />
              </Form.Item>

              <Form.Item
                label="Website của bạn"
                rules={[{ required: true, message: "Vui lòng nhập website!" }]}
              >
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
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  {
                    pattern:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Mật khẩu phải có ít nhất 8 ký tự, một chữ cái viết hoa, một số và một ký tự đặc biệt!",
                  },
                ]}
              >
                <Input.Password
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Nhập mật khẩu"
                />
              </Form.Item>

              <Form.Item
                label="Nhập lại mật khẩu"
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Mật khẩu và xác nhận mật khẩu không khớp!"
                      );
                    },
                  }),
                ]}
              >
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
