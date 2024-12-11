import { Button, Form, FormProps, Input } from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

const Contact = () => {

  const onFinish: FormProps['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="my-10">
      <img src="/images/map.png" alt="map" />
      <div className="w-3/4 mx-[auto] mt-10">
        <h2 className="font-semibold text-[#00b96b] mb-6">THÔNG TIN LIÊN HỆ</h2>
        <div className="flex items-start justify-center w-full">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="w-1/2"
            layout="vertical"
          >
            <Form.Item
              label="Họ và tên"
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
            >
              <Input name="username" />
            </Form.Item>
            <Form.Item name="email" label="Địa chỉ Email" rules={[{ required: true, type: 'email',  message: 'Vui lòng nhập địa chỉ email' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Bình luận" name="comment" rules={[{ required: true, message: 'Vui lòng nhập bình luận!' }]}>
              <Input.TextArea allowClear rows={5}/>
            </Form.Item>
            <Form.Item className="align-start">
              <Button type="primary" htmlType="submit" size="large" style={{width:"100%", textAlign: 'start', margin: 0}}>
                Gửi
              </Button>
            </Form.Item>
          </Form>
          <div className="w-1/2">
            <img src="/images/logo.png" alt="shop name" />
            <p>DKT được thành lập với niềm đam mê và khát vọng thành công trong lĩnh vực Thương mại điện tử. Chúng tôi đã và đang khẳng định vị trí hàng đầu bằng những sản phẩm</p>
            <div className="mt-6">
              <div className="flex items-center gap-3">
                <PhoneOutlined style={{color:'#00b96b'}} />
                <span>Điện thoại: 066.558.868</span>
              </div>
              <div className="flex items-center gap-3">
                <MailOutlined style={{color:'#00b96b'}} />
                <span>Email: infor@dkt.com.vn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
