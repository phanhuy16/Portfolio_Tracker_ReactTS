import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/useAuth";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { useNavigate } from "react-router";

const HeaderHome = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  // Theo dõi vị trí scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <a onClick={logout}>Logout</a>,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 transition-all duration-500 ease-out">
      <nav
        className={`mx-auto px-6 flex items-center justify-between transition-all duration-500 bg-transparent backdrop-blur-sm border border-white/10 shadow-lg rounded-full py-3${
          isScrolled ? " max-w-3xl" : " max-w-4xl"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-3 transition-all duration-500">
          <div className="text-green-400 transition-all duration-500 text-lg">
            ✨
          </div>
          <span className="font-bold transition-all duration-500 text-lg text-white">
            CryptoTrade
          </span>
        </div>

        {/* Navigation Menu - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="transition-all duration-300 hover:text-green-400 text-sm text-white"
          >
            Features
          </a>
          <a
            href="#prices"
            className="transition-all duration-300 hover:text-green-400 text-sm text-white"
          >
            Prices
          </a>
          <a
            href="#testimonials"
            className="transition-all duration-300 hover:text-green-400 text-sm text-white"
          >
            Testimonials
          </a>

          {/* Auth Section */}
          {isLoggedIn() ? (
            <Dropdown
              menu={{ items: userMenuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div className="flex items-center cursor-pointer px-3 py-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/50 hover:border-green-500/50">
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  className="mr-2 bg-green-500"
                />
                <span className="text-white text-sm font-medium">
                  {user?.username}
                </span>
              </div>
            </Dropdown>
          ) : (
            <button className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 px-4 py-2 text-sm">
              Start Trading
            </button>
          )}
        </div>

        {/* Mobile Section */}
        <div className="md:hidden flex items-center space-x-4">
          {isLoggedIn() ? (
            <Dropdown
              menu={{ items: userMenuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div className="flex items-center cursor-pointer">
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  className="bg-green-500"
                />
              </div>
            </Dropdown>
          ) : (
            <button
              className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 px-4 py-2 text-sm"
              onClick={() => {
                navigate("/login");
              }}
            >
              Start Trading
            </button>
          )}

          <button
            className="text-white p-2"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                showMobileMenu ? "rotate-45" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {showMobileMenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden mt-4 mx-4">
          <div className="bg-gray-900/95 backdrop-blur-lg border border-white/10 rounded-2xl py-6 px-6 shadow-2xl">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-white hover:text-green-400 transition-colors py-2 text-lg font-medium"
                onClick={() => setShowMobileMenu(false)}
              >
                Features
              </a>
              <a
                href="#prices"
                className="text-white hover:text-green-400 transition-colors py-2 text-lg font-medium"
                onClick={() => setShowMobileMenu(false)}
              >
                Prices
              </a>
              <a
                href="#testimonials"
                className="text-white hover:text-green-400 transition-colors py-2 text-lg font-medium"
                onClick={() => setShowMobileMenu(false)}
              >
                Testimonials
              </a>

              {!isLoggedIn() && (
                <div className="pt-4 border-t border-gray-700">
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-white font-semibold rounded-full py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25">
                    Start Trading
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderHome;
