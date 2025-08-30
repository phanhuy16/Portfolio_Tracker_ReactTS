// Components/Common/Header.jsx
import { Layout, Avatar, Dropdown, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

interface Props {
  username?: string;
  collapsed?: boolean;
  onToggleSidebar?: () => void;
  isMobile?: boolean;
}

const AppHeader = ({
  username = "User",
  collapsed = false,
  onToggleSidebar,
  isMobile = false,
}: Props) => {
  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "profile":
        // Handle profile navigation
        console.log("Navigate to profile");
        break;
      case "logout":
        // Handle logout
        console.log("Logout user");
        break;
    }
  };

  return (
    <Header
      style={{
        backgroundColor: "#fff",
        padding: "0 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
        lineHeight: "64px",
        boxShadow: "none",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      {/* Left Section */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Sidebar Toggle Button */}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleSidebar}
          style={{
            fontSize: "16px",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
          }}
        />

        {/* App Title */}
        <div
          style={{
            fontSize: isMobile ? "18px" : "20px",
            fontWeight: "600",
            color: "#1f1f1f",
            display: isMobile ? "none" : "block",
          }}
        >
          Portfolio Tracker
        </div>

        {/* Mobile Title */}
        {isMobile && (
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1f1f1f",
            }}
          >
            Portfolio
          </div>
        )}
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Notifications (Hidden on mobile) */}
        {!isMobile && (
          <Button
            type="text"
            icon={<BellOutlined />}
            style={{
              fontSize: "16px",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}

        {/* User Menu */}
        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: handleMenuClick,
          }}
          trigger={["click"]}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              border: "1px solid transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
              e.currentTarget.style.borderColor = "#d9d9d9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            <Avatar
              size={isMobile ? 32 : 36}
              icon={<UserOutlined />}
              style={{
                marginRight: isMobile ? 0 : 8,
                backgroundColor: "#1890ff",
              }}
            />
            {!isMobile && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    color: "#1f1f1f",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "20px",
                  }}
                >
                  {username}
                </span>
                <span
                  style={{
                    color: "#8c8c8c",
                    fontSize: "12px",
                    lineHeight: "16px",
                  }}
                >
                  Admin
                </span>
              </div>
            )}
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
