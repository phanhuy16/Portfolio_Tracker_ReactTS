import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Alert, Button, Card, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { useAuth } from "../../Context/useAuth";

type Props = {};

type LoginFormInputs = {
  username: string;
  password: string;
};

const LoginPage = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { loginUser } = useAuth();

  const onFinish = async (values: LoginFormInputs) => {
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate login validation
          if (!values.username || !values.password) {
            reject(new Error("Tên đăng nhập hoặc mật khẩu không chính xác!"));
          } else {
            resolve(true);
          }
        }, 1000);
      });

      loginUser(values.username, values.password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: 400,
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          border: "none",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "8px",
            }}
          >
            Đăng Nhập
          </h2>
          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Chào mừng bạn quay trở lại!
          </p>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{
              marginBottom: "24px",
              borderRadius: "8px",
              border: "none",
            }}
            closable
            onClose={() => setError("")}
          />
        )}

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label={
              <span style={{ color: "#374151", fontWeight: "500" }}>
                Tên đăng nhập
              </span>
            }
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            label={
              <span style={{ color: "#374151", fontWeight: "500" }}>
                Mật khẩu
              </span>
            }
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ color: "#6b7280" }}>
                  Ghi nhớ đăng nhập
                </Checkbox>
              </Form.Item>
              <a
                href="/forgot-password"
                style={{ color: "#667eea", textDecoration: "none" }}
              >
                Quên mật khẩu?
              </a>
            </div>
          </Form.Item>

          <Form.Item style={{ marginBottom: "16px" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                border: "none",
                fontSize: "16px",
                fontWeight: "500",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
              }}
            >
              {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </Button>
          </Form.Item>
          <div
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Chưa có tài khoản?{" "}
            <a
              href="/register"
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Đăng ký ngay
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
