import http from "../utils/http";

export const getUserInfo = async (token: string) => {
  try {
    const response = await http.get(`/users?token=${token}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    throw error;
  }
};
