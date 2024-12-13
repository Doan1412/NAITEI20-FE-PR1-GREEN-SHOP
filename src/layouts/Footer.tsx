import React from 'react'
import { SendOutlined, PhoneOutlined, MailOutlined, RightOutlined, CreditCardOutlined } from "@ant-design/icons"
import { Button, Input, Space } from 'antd'
import { footerData , titleFooterData} from "../mock/footer.data"
import Logo from "../assets/images/logo.png";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTumblr, FaTwitter, FaVimeoV } from 'react-icons/fa';

interface IItemFooter {
  content: string
}

interface IColFooter {
  title: string;
  items: string[];
}
const ItemFooter = ({content}: IItemFooter) => {
  return (
    <div className="flex items-center gap-1 pb-3 ">
      <RightOutlined className="text-[10px] color-[#898989]" />
      <span className="text-sm">{content}</span>
    </div>
  )
}

const ColFooter = ({title, items}: IColFooter) => {
  return (
    <div>
      <div className="pb-4 text-[#3FB871] font-semibold">{title}</div>
      <ul>
        {
          items.map((item, index) => 
            <li key={index}>
              <ItemFooter content={item} />
            </li>
          )
        }
      </ul>
    </div>
  )
}

function Footer() {
  return (
    <div className="bg-[#313131] text-[#A5A5A5]">
      <div className="border-b border-[#898989] py-5">
        <div className="flex justify-between max-w-[1140px] mx-[auto]">
          <div className="w-1/3">
            <p className="text-[#898989] text-sm font-semibold pb-2">KÊNH THÔNG TIN TỪ CHÚNG TÔI:</p>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex h-8 w-8 items-center justify-center hover:bg-blue-600 hover:text-white"
              >
                <FaFacebookF />
              </Link>
              <Link
                to="/"
                className="flex h-8 w-8 items-center justify-center hover:bg-blue-400 hover:text-white"
              >
                <FaTwitter />
              </Link>
              <Link
                to="/"
                className="flex h-8 w-8 items-center justify-center hover:bg-tumblr hover:text-white"
              >
                <FaTumblr />
              </Link>
              <Link
                to="/"
                className="flex h-8 w-8 items-center justify-center hover:bg-vimeo hover:text-white"
              >
                <FaVimeoV />
              </Link>
            </div>
          </div>
          <div className="flex items-end gap-4 w-2/3">
            <span className="text-[#898989] text-sms font-semibold">ĐĂNG KÝ NHẬN EMAIL TỪ CHÚNG TÔI</span>
            <Space.Compact style={{ width: '100%' }}>
              <Input />
              <Button type="primary" size="large"><SendOutlined /></Button>
            </Space.Compact>
          </div>
        </div>
      </div>
      <div className="border-b border-[#898989] py-8">
        <div className="flex justify-between max-w-[1140px] mx-[auto]">
          <div className="flex flex-col gap-4 w-[30%]">
            <img src={Logo} alt="logo" />
            <p className="text-sm">Green shop được thành lập từ 8/2010 được sự tin tưởng của khác hàng trong suốt thời gian hoạt động đến nay cửa hàng ngày một phát triển</p>
            <div>
              <PhoneOutlined style={{color: "#3FB871"}} />
              <span className="text-sm pl-2">{'Điện thoại:  (84-4)66.558.868'}</span>
            </div>
            <div>
              <MailOutlined style={{color: "#3FB871"}} />
              <span className="text-sm pl-2">Email:  infor@dkt.com.vn</span>
            </div>
          </div>
          <div className="flex gap-10 w-2/3">
            {
              footerData.map((data, index) => <ColFooter key={index} title={data.title} items={data.items}  />)
            }
          </div>
        </div>          
      </div>
      <div className="border-b border-[#898989] py-5">
        <div className="flex justify-between max-w-[1140px] mx-[auto]">
          <ul className="flex items-center gap-5">
            {
              titleFooterData.map((item, index) => <li key={index} className="text-sm">{item}</li>)
            }
          </ul>
          <div className="flex gap-3">
            <CreditCardOutlined />
            <CreditCardOutlined />
            <CreditCardOutlined />
            <CreditCardOutlined />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
