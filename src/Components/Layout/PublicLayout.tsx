import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import HeaderHome from "../Common/HeaderHome";

type Props = {};

const PublicLayout = (props: Props) => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            background: "#fff",
            padding: "0 50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            Portfolio Tracker
          </Title>
          {isLoggedIn() ? (
            <Dropdown
              menu={{ items: userMenuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: 6,
                  transition: "background-color 0.2s",
                }}
              >
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  style={{ marginRight: 8 }}
                />
                <span style={{ color: "#000" }}>{user?.username}</span>
              </div>
            </Dropdown>
          ) : (
            <div>
              <Link to={"login"}>
                <Button type="primary" style={{ marginRight: 16 }}>
                  Login
                </Button>
              </Link>

              <Link to={"register"}>
                <Button type="default">Signup</Button>
              </Link>
            </div>
          )}
        </Header>

        <Content style={{ padding: "50px 48px" }}>
         
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Portfolio Tracker ©{new Date().getFullYear()} - Your Investment
          Companion
        </Footer>
      </Layout> */}
      <HeaderHome />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
