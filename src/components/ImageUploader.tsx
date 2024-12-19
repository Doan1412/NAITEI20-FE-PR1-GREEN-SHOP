import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

interface ImageUploaderProps {
  value?: string[];
  onChange?: (urls: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value = [], onChange }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Cloudinary preset
    setLoading(true);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, // Dynamic endpoint
        formData
      );
      const imageUrl = response.data.secure_url;
      message.success('Tải ảnh lên thành công!');
      onChange?.([...value, imageUrl]);
    } catch (error) {
      console.error('Upload failed:', error);
      message.error('Tải ảnh lên thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: File) => {
    handleUpload(file);
    return false;
  };

  const handleRemove = (url: string) => {
    const updatedUrls = value.filter((item) => item !== url);
    onChange?.(updatedUrls);
  };

  return (
    <div>
      <Upload
        multiple
        showUploadList={false}
        beforeUpload={beforeUpload}
        accept="image/png,image/jpeg,image/jpg,image/gif"
        disabled={loading}
      >
        <Button icon={<UploadOutlined />} loading={loading}>
          {loading ? 'Đang tải...' : 'Tải ảnh lên'}
        </Button>
      </Upload>
      <div style={{ marginTop: 10 }}>
        {value.map((url) => (
          <div key={url} style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
            <img
              src={url}
              alt="Uploaded"
              style={{ maxWidth: '100px', maxHeight: '100px', marginRight: 10 }}
            />
            <Button
              danger
              onClick={() => handleRemove(url)}
              size="small"
            >
              Xóa
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
