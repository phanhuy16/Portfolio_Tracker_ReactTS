import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import AppHeader from "../../Components/Common/Header";
import Sidebar from "../../Components/Common/Sidebar";

const { Content, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive breakpoint
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const siderWidth = collapsed ? 80 : 220;
  const headerHeight = 64;

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      {/* Sidebar */}
      <Sider
        width={siderWidth}
        collapsed={collapsed}
        collapsible
        onCollapse={setCollapsed}
        trigger={null}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1001,
          overflow: "auto",
          boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
          transition: "all 0.2s ease-in-out",
        }}
        breakpoint="lg"
        collapsedWidth={isMobile ? 0 : 80}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>

      {/* Main Layout */}
      <Layout
        style={{
          marginLeft: isMobile ? 0 : siderWidth,
          transition: "margin-left 0.2s ease-in-out",
        }}
      >
        {/* Fixed Header */}
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: isMobile ? 0 : siderWidth,
            height: headerHeight,
            zIndex: 1000,
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            borderBottom: "1px solid #f0f0f0",
            transition: "left 0.2s ease-in-out",
          }}
        >
          <AppHeader
            username="John Doe"
            collapsed={collapsed}
            onToggleSidebar={() => setCollapsed(!collapsed)}
            isMobile={isMobile}
          />
        </div>

        {/* Scrollable Content */}
        <Content
          style={{
            marginTop: headerHeight,
            padding: isMobile ? "16px 12px" : "24px 24px",
            minHeight: `calc(100vh - ${headerHeight}px)`,
            background: "#f0f2f5",
          }}
        >
          {/* Content Wrapper */}
          <div
            style={{
              padding: isMobile ? "16px" : "24px",
              background: "#fff",
              minHeight: `calc(100vh - ${
                headerHeight + (isMobile ? 44 : 88)
              }px)`,
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f0f0",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>

      {/* Mobile Overlay */}
      {isMobile && !collapsed && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 1000,
          }}
          onClick={() => setCollapsed(true)}
        />
      )}
    </Layout>
  );
};

export default MainLayout;
