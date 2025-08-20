import React, { useState } from "react";
import { Form, Input, Button, Card, Alert } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  IdcardOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../Context/useAuth";

type Props = {};

type RegisterFormInputs = {
  username: string;
  password: string;
  email: string;
  lastName: string;
  firstName: string;
};

const RegisterPage = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { registerUser } = useAuth();

  const onFinish = async (values: RegisterFormInputs) => {
    setLoading(true);
    setError("");

    try {
      // Simulate validation
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate username already exists
          if (values.username) {
            reject(new Error("Tên đăng nhập đã tồn tại!"));
          } else if (values.email) {
            reject(new Error("Email đã được sử dụng!"));
          } else {
            resolve(true);
          }
        }, 1000);
      });

      registerUser(
        values.username,
        values.password,
        values.email,
        values.firstName,
        values.lastName
      );
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
        bodyStyle={{ padding: "40px 32px" }}
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
            Đăng Ký
          </h2>
          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Tạo tài khoản mới để bắt đầu!
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

        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            label={
              <span style={{ color: "#374151", fontWeight: "500" }}>Email</span>
            }
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#9ca3af" }} />}
              placeholder="Nhập email"
            />
          </Form.Item>
          <Form.Item
            label={
              <span style={{ color: "#374151", fontWeight: "500" }}>
                Tên đăng nhập
              </span>
            }
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
              { min: 3, message: "Tên đăng nhập phải có ít nhất 3 ký tự!" },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#9ca3af" }} />}
              placeholder="Nhập tên đăng nhập"
            />
          </Form.Item>
          <Form.Item
            label={
              <span style={{ color: "#374151", fontWeight: "500" }}>
                Mật khẩu
              </span>
            }
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
              placeholder="Nhập mật khẩu"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "24px" }}>
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
              {loading ? "Đang đăng ký..." : "Đăng Ký"}
            </Button>
          </Form.Item>
          <div
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Đã có tài khoản?{" "}
            <a
              href="/login"
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Đăng nhập ngay
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
