import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordAPI } from "../../Services/AuthService";
import { toast } from "react-toastify";

type ForgotPasswordFormInputs = {
  email: string;
};

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const onFinish = async (values: ForgotPasswordFormInputs) => {
    setLoading(true);
    setError("");

    try {
      const response = await forgotPasswordAPI(values.email);
      if (response) {
        setSuccess(true);
        toast.success("Email hướng dẫn đã được gửi!");
      }
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra khi gửi email.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ color: "#1f2937", marginBottom: "16px" }}>
              Email Đã Được Gửi!
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>
              Chúng tôi đã gửi link reset mật khẩu đến email của bạn. Vui lòng
              kiểm tra hộp thư và làm theo hướng dẫn.
            </p>
            <Button
              type="primary"
              onClick={() => navigate("/login")}
              style={{
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Quay Về Đăng Nhập
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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
            Quên Mật Khẩu
          </h2>
          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Nhập email để nhận link reset mật khẩu
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
          name="forgotPassword"
          onFinish={onFinish}
          layout="vertical"
          variant="underlined"
        >
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
              placeholder="Nhập email của bạn"
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
              {loading ? "Đang gửi..." : "Gửi Link Reset"}
            </Button>
          </Form.Item>

          <div
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/login")}
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: "500",
                padding: 0,
              }}
            >
              Quay về đăng nhập
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
