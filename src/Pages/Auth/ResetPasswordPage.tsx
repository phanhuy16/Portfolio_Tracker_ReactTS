import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { Alert, Button, Card, Form, Input } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordAPI } from "../../Services/AuthService";
import { toast } from "react-toastify";

type ResetPasswordFormInputs = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!email || !token) {
      toast.error("Link reset không hợp lệ!");
      navigate("/login");
    }
  }, [email, token, navigate]);

  const onFinish = async (values: ResetPasswordFormInputs) => {
    setLoading(true);
    setError("");

    try {
      if (!email || !token) {
        throw new Error("Thông tin reset không hợp lệ");
      }

      const response = await resetPasswordAPI(email, token, values.newPassword);
      if (response) {
        toast.success("Đổi mật khẩu thành công!");
        navigate("/login");
      }
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra khi đổi mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Vui lòng nhập mật khẩu mới!"));
    }

    const errors = [];
    if (value.length < 6) errors.push("Mật khẩu phải có ít nhất 6 ký tự");
    if (!/[A-Z]/.test(value))
      errors.push("Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa");
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value))
      errors.push("Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt");

    if (errors.length > 0) {
      return Promise.reject(new Error(errors.join(", ")));
    }
    return Promise.resolve();
  };

  const validateConfirmPassword = ({ getFieldValue }: any) => ({
    validator(_: any, value: string) {
      if (!value || getFieldValue("newPassword") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
    },
  });

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
            Đổi Mật Khẩu
          </h2>
          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Nhập mật khẩu mới của bạn
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
          name="resetPassword"
          onFinish={onFinish}
          layout="vertical"
          variant="underlined"
          autoComplete="off"
        >
          <Form.Item
            label={
              <span style={{ color: "#374151", fontWeight: "500" }}>
                Mật khẩu mới
              </span>
            }
            name="newPassword"
            rules={[{ validator: validatePassword }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
              placeholder="Nhập mật khẩu mới"
              autoComplete="new-password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ color: "#374151", fontWeight: "500" }}>
                Xác nhận mật khẩu
              </span>
            }
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              validateConfirmPassword,
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
              placeholder="Nhập lại mật khẩu mới"
              autoComplete="new-password"
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
              {loading ? "Đang đổi..." : "Đổi Mật Khẩu"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
