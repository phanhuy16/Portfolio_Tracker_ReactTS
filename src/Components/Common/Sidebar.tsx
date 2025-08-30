import React from "react";
import { Menu, Tooltip } from "antd";
import {
  PieChartOutlined,
  DollarCircleOutlined,
  TransactionOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

type Props = {
  collapsed?: boolean;
};

const Sidebar = ({ collapsed = false }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/portfolio",
      icon: <PieChartOutlined />,
      label: "Portfolio",
    },
    {
      key: "/portfolio/dashboard",
      icon: <PieChartOutlined />,
      label: "Dashboard",
    },
    {
      key: "/portfolio/stocks",
      icon: <PieChartOutlined />,
      label: "Stocks",
    },
    {
      key: "/portfolio/assets",
      icon: <DollarCircleOutlined />,
      label: "Assets",
    },
    {
      key: "/portfolio/transactions",
      icon: <TransactionOutlined />,
      label: "Transactions",
    },
    {
      key: "/portfolio/analytics",
      icon: <BarChartOutlined />,
      label: "Analytics",
    },
    {
      key: "/portfolio/watchlist",
      icon: <PieChartOutlined />,
      label: "Watchlist",
    },
    {
      type: "divider" as const,
    },
    {
      key: "/portfolio/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  // Wrap menu items with tooltips when collapsed
  const wrappedItems = collapsed
    ? menuItems.map((item) => {
        if (item.type === "divider") return item;
        return {
          ...item,
          label: (
            <Tooltip title={item.label} placement="right">
              <span>{item.label}</span>
            </Tooltip>
          ),
        };
      })
    : menuItems;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Logo Section */}
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          padding: collapsed ? "0" : "0 24px",
          borderBottom: "1px solid #303030",
          background: "#001529",
        }}
      >
        {collapsed ? (
          <div
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #1890ff, #722ed1)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            P
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 32,
                height: 32,
                background: "linear-gradient(135deg, #1890ff, #722ed1)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px",
                marginRight: 12,
              }}
            >
              P
            </div>
            <span
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Portfolio
            </span>
          </div>
        )}
      </div>

      {/* Menu Section */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={wrappedItems}
          onClick={handleMenuClick}
          inlineCollapsed={collapsed}
          style={{
            border: "none",
            background: "#001529",
          }}
        />
      </div>

      {/* Footer Section (Optional) */}
      {!collapsed && (
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #303030",
            background: "#000c17",
            color: "#8c8c8c",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          Portfolio Tracker v1.0
        </div>
      )}
    </div>
  );
};

export default Sidebar;
