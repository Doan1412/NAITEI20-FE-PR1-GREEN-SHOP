import { Button, Input, Modal, Space } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { usePopupStore } from '../stores/popupStore';

function PopupWelcom() {
  const popupStore = usePopupStore() 

  return (
    <Modal
      open={popupStore.isShowPopup}
      footer={<></>}
      onCancel={() => popupStore.setIsShowPopup(false)}
      width={700}
      styles={{
        content: {
          backgroundColor: '#fff4e8',
          padding: '1rem'
        }
      }}
    >
      <div className="flex gap-4 justify-center items-center">
        <img src="./images/popup.png" alt="flower" className="w-1/2 py-6" />
        <div className="flex flex-col gap-2">
          <h2 className="text-[1.125rem]">Nhận tin tức từ chúng tôi</h2>
          <h2 className="font-semibold text-[#3FB871] text-lg">ĐĂNG KÝ EMAIL NGAY HÔM NAY</h2>
          <Space.Compact style={{ width: '100%' }}>
            <Input />
            <Button type="primary"><SendOutlined /></Button>
          </Space.Compact>
          <p className="text-sm">Đăng ký email ngay hôm nay để nhận các thông tin về sự kiện và các chương trình giảm giá từ chúng tôi</p>
        </div>
      </div>

    </Modal>
  )
}

export default PopupWelcom;
