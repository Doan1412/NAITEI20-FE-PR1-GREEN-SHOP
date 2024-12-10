import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaTumblr,
  FaVimeoV,
  FaUser,
  FaUserPlus,
  FaShoppingBasket,
  FaBars,
  FaPhoneAlt,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import BgHeader from "../assets/images/bg-header.png";
import { useAuth } from "../contexts/AuthContext";

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="mb-5">
      <div className="bg-black text-gray-400">
        <div className="container mx-auto w-[75%]">
          <div className="flex flex-row justify-between text-[13px]">
            <div className="flex flex-row items-center gap-10">
              <div className="flex flex-row items-center gap-2 md:block">
                <span>Open time: 8:00 - 18:00 Monday - Sunday</span>
              </div>
              <div className="hidden flex-row items-center gap-5 text-[11px] md:flex">
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
            <div className="flex flex-row gap-5">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-1 hover:text-green-500"
                  >
                    <FaUser />
                    <span>Đăng nhập</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center gap-1 hover:text-green-500"
                  >
                    <FaUserPlus />
                    <span>Đăng kí</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center justify-center gap-1">
                    <FaUser />
                    <span>Thông tin cá nhân</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center justify-center gap-1 hover:text-red-500"
                  >
                    <FaUser />
                    <span>Đăng xuất</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${BgHeader})` }}
        className="bg-cover bg-center p-5 text-[13px] md:p-0"
      >
        <div className="container mx-auto w-[83%]">
          <div className="flex items-center gap-32">
            <div className="flex basis-full flex-row items-center md:basis-5/12">
              <Link
                to="/"
                className="flex w-full flex-row items-center justify-center"
              >
                <img src={Logo} alt="logo" />
              </Link>
            </div>
            <div className="flex items-center w-2/5 mb-7 gap-4">
              <div>
                <div className="mb-1 text-center flex">
                  <FaPhoneAlt className="mt-1 mr-2 ml-10" />
                  <span>Hỗ trợ</span>:
                  <Link to="/" className="hover:text-green-500">
                    (04) 6674 2332
                  </Link>
                  <span> - </span>
                  <Link to="/" className="hover:text-green-500">
                    (04) 3786 8904
                  </Link>
                </div>
                <div className="w-[400px] flex">
                  <input
                    type="text"
                    name="search"
                    placeholder="search"
                    className="h-10 w-full rounded-l-[50px] border border-solid border-[/e1e1e1] px-5 pb-1 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="flex h-10 w-10 items-center justify-center rounded-r-[50px] border border-solid border-[/e1e1e1] bg-white"
                  >
                    <FaSearch />
                  </button>
                </div>
              </div>
              {isLoggedIn && (
                <div className="flex justify-end mt-5 min-w-[20%]">
                  <div className="group relative flex flex-row items-center">
                    <Link
                      to="/cart"
                      className="flex items-center justify-center gap-1 hover:text-green-500"
                    >
                      <FaShoppingBasket className="text-[15px]" />0{" "}
                      <span>Sản phẩm</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#009f5f] text-white">
        <div className="container w-[75%] mx-auto">
          <nav className="flex flex-row items-center justify-between">
            <div className="hidden md:block">
              <ul className="flex gap-20">
                <li className="py-[13px]">
                  <FaBars size={25} />
                </li>
                <li className="bg-active py-[13px]">
                  <Link to="/" className="hover:text-white">
                    <span>Trang chủ</span>
                  </Link>
                </li>
                <li className="py-[13px] hover:bg-active hover:text-white">
                  <Link to="/">
                    <span>Giới thiệu</span>
                  </Link>
                </li>
                <li className="group relative py-[13px] hover:bg-active hover:text-white">
                  <Link to="/">
                    <span>Sản phẩm</span>
                  </Link>
                </li>
                <li className="group relative py-[13px] hover:bg-active hover:text-white">
                  <Link to="/">
                    <span>Sản phẩm mới</span>
                  </Link>
                </li>
                <li className="group relative py-[13px] hover:bg-active hover:text-white">
                  <Link to="/">
                    <span>Tin tức</span>
                  </Link>
                </li>
                <li className="group relative py-[13px] hover:bg-active hover:text-white">
                  <Link to="/">
                    <span>Liên hệ</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
