export const vouchers: Voucher[] = [
  {
    id: 1,
    code: 'DISCOUNT10',
    discount: 10, // giảm giá 10%
    expiration_date: '2024-12-31',
    description: 'Giảm giá 10% cho tất cả các đơn hàng',
  },
  {
    id: 2,
    code: 'FREESHIP',
    discount: 0, // miễn phí vận chuyển
    expiration_date: '2024-12-31',
    description: 'Miễn phí vận chuyển cho đơn hàng trên 200k',
  },
  {
    id: 3,
    code: 'WELCOME20',
    discount: 20, // giảm giá 20%
    expiration_date: '2024-12-31',
    description: 'Giảm giá 20% cho đơn hàng đầu tiên',
  },
  {
    id: 4,
    code: 'BLACKFRIDAY50',
    discount: 50, // giảm giá 50%
    expiration_date: '2024-11-30',
    description: 'Giảm giá 50% cho tất cả sản phẩm trong dịp Black Friday',
  },
];
