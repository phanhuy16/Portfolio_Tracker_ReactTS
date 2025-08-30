import {
  BellOutlined,
  EditOutlined,
  GlobalOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  SafetyOutlined,
  SaveOutlined,
  SecurityScanOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Slider,
  Switch,
  Typography,
  Upload,
} from "antd";
import { useState } from "react";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const SettingsPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [is2FAModalVisible, setIs2FAModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [profileEditing, setProfileEditing] = useState(false);

  const [userSettings, setUserSettings] = useState({
    profile: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      bio: "Cryptocurrency enthusiast and long-term investor.",
      timezone: "America/New_York",
      currency: "USD",
      avatar: "",
    },
    notifications: {
      email: true,
      push: true,
      priceAlerts: true,
      newsUpdates: false,
      portfolioSummary: true,
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: "2024-01-01",
      sessionTimeout: 30,
      loginNotifications: true,
    },
    trading: {
      defaultOrderType: "limit",
      confirmLargeOrders: true,
      maxOrderSize: 10000,
      riskLevel: "moderate",
    },
  });

  const onFinish = (values: any) => {
    setLoading(true);
    console.log("Settings:", values);
    setTimeout(() => {
      setLoading(false);
      message.success("Settings updated successfully!");
      setProfileEditing(false);
    }, 1000);
  };

  const handleEnable2FA = () => {
    setIs2FAModalVisible(true);
  };

  const handleChangePassword = () => {
    setIsPasswordModalVisible(true);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title level={2} className="!mb-2 text-gray-900">
            Account Settings
          </Title>
          <Text className="text-gray-600 text-lg">
            Manage your account preferences, security, and trading settings
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          {/* Profile Settings */}
          <Col xs={24} lg={12}>
            <Card
              className="h-full border-0 shadow-md"
              title={
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserOutlined className="text-blue-600" />
                    <span className="text-lg font-semibold">
                      Profile Settings
                    </span>
                  </div>
                  <Button
                    type="text"
                    icon={profileEditing ? <SaveOutlined /> : <EditOutlined />}
                    onClick={() => setProfileEditing(!profileEditing)}
                    className="text-blue-600"
                  >
                    {profileEditing ? "Save" : "Edit"}
                  </Button>
                </div>
              }
            >
              <div className="flex items-center space-x-4 mb-6">
                <Badge
                  count={
                    profileEditing ? (
                      <EditOutlined className="text-blue-600" />
                    ) : (
                      0
                    )
                  }
                >
                  <Avatar
                    size={80}
                    src={userSettings.profile.avatar}
                    icon={<UserOutlined />}
                    className="shadow-lg"
                  />
                </Badge>
                <div>
                  <Title level={4} className="!mb-1">
                    {userSettings.profile.name}
                  </Title>
                  <Text className="text-gray-500 block">
                    {userSettings.profile.email}
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    Member since January 2024
                  </Text>
                </div>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={userSettings.profile}
                disabled={!profileEditing}
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="avatar"
                      label="Profile Picture"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        name="avatar"
                        action="/upload.do"
                        listType="picture"
                        maxCount={1}
                        showUploadList={profileEditing}
                      >
                        {profileEditing && (
                          <Button icon={<UploadOutlined />} size="small">
                            Update Photo
                          </Button>
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      label="Full Name"
                      rules={[
                        { required: true, message: "Please enter your name" },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="phone" label="Phone Number">
                      <Input
                        prefix={<MobileOutlined className="text-gray-400" />}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input prefix={<MailOutlined className="text-gray-400" />} />
                </Form.Item>

                <Form.Item name="bio" label="Bio">
                  <TextArea rows={3} placeholder="Tell us about yourself..." />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="timezone"
                      label="Timezone"
                      rules={[{ required: true }]}
                    >
                      <Select prefix={<GlobalOutlined />}>
                        <Option value="America/New_York">Eastern Time</Option>
                        <Option value="America/Chicago">Central Time</Option>
                        <Option value="America/Denver">Mountain Time</Option>
                        <Option value="America/Los_Angeles">
                          Pacific Time
                        </Option>
                        <Option value="UTC">UTC</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="currency"
                      label="Preferred Currency"
                      rules={[{ required: true }]}
                    >
                      <Select>
                        <Option value="USD">USD - US Dollar</Option>
                        <Option value="EUR">EUR - Euro</Option>
                        <Option value="GBP">GBP - British Pound</Option>
                        <Option value="JPY">JPY - Japanese Yen</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                {profileEditing && (
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      size="large"
                      className="w-full"
                    >
                      Update Profile
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </Card>
          </Col>

          {/* Security Settings */}
          <Col xs={24} lg={12}>
            <Card
              className="h-full border-0 shadow-md"
              title={
                <div className="flex items-center space-x-2">
                  <SecurityScanOutlined className="text-red-600" />
                  <span className="text-lg font-semibold">Security</span>
                </div>
              }
            >
              <div className="space-y-6">
                {/* Password Section */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <LockOutlined className="text-gray-600" />
                      <div>
                        <Text className="font-medium block">Password</Text>
                        <Text className="text-sm text-gray-500">
                          Last changed:{" "}
                          {userSettings.security.lastPasswordChange}
                        </Text>
                      </div>
                    </div>
                    <Button
                      type="primary"
                      danger
                      onClick={handleChangePassword}
                    >
                      Change
                    </Button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <SafetyOutlined
                        className={
                          userSettings.security.twoFactorEnabled
                            ? "text-green-600"
                            : "text-gray-400"
                        }
                      />
                      <div>
                        <Text className="font-medium block">
                          Two-Factor Authentication
                        </Text>
                        <Text className="text-sm text-gray-500">
                          {userSettings.security.twoFactorEnabled
                            ? "Enabled"
                            : "Not enabled"}
                        </Text>
                      </div>
                    </div>
                    <Button
                      type={
                        userSettings.security.twoFactorEnabled
                          ? "default"
                          : "primary"
                      }
                      onClick={handleEnable2FA}
                    >
                      {userSettings.security.twoFactorEnabled
                        ? "Manage"
                        : "Enable"}
                    </Button>
                  </div>
                  {!userSettings.security.twoFactorEnabled && (
                    <Alert
                      message="Enhance your account security"
                      description="Enable 2FA to add an extra layer of protection to your account."
                      type="warning"
                      showIcon
                      className="mt-3"
                    />
                  )}
                </div>

                {/* Session Settings */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Text className="font-medium block mb-3">
                    Session Timeout
                  </Text>
                  <div className="space-y-3">
                    <Slider
                      min={15}
                      max={120}
                      value={userSettings.security.sessionTimeout}
                      onChange={(value) =>
                        setUserSettings((prev) => ({
                          ...prev,
                          security: { ...prev.security, sessionTimeout: value },
                        }))
                      }
                      marks={{
                        15: "15m",
                        30: "30m",
                        60: "1h",
                        120: "2h",
                      }}
                    />
                    <Text className="text-sm text-gray-500">
                      Automatically log out after{" "}
                      {userSettings.security.sessionTimeout} minutes of
                      inactivity
                    </Text>
                  </div>
                </div>

                {/* Login Notifications */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Text className="font-medium block">
                      Login Notifications
                    </Text>
                    <Text className="text-sm text-gray-500">
                      Get notified of new login attempts
                    </Text>
                  </div>
                  <Switch
                    checked={userSettings.security.loginNotifications}
                    onChange={(checked) =>
                      setUserSettings((prev) => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          loginNotifications: checked,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </Card>
          </Col>

          {/* Notifications */}
          <Col xs={24} lg={12}>
            <Card
              className="border-0 shadow-md"
              title={
                <div className="flex items-center space-x-2">
                  <BellOutlined className="text-yellow-600" />
                  <span className="text-lg font-semibold">Notifications</span>
                </div>
              }
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <MailOutlined className="text-blue-600" />
                    <div>
                      <Text className="font-medium block">
                        Email Notifications
                      </Text>
                      <Text className="text-sm text-gray-500">
                        Receive updates via email
                      </Text>
                    </div>
                  </div>
                  <Switch
                    checked={userSettings.notifications.email}
                    onChange={(checked) =>
                      setUserSettings((prev) => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          email: checked,
                        },
                      }))
                    }
                  />
                </div>

                <Divider className="my-2" />

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <BellOutlined className="text-green-600" />
                    <div>
                      <Text className="font-medium block">
                        Push Notifications
                      </Text>
                      <Text className="text-sm text-gray-500">
                        Browser push notifications
                      </Text>
                    </div>
                  </div>
                  <Switch
                    checked={userSettings.notifications.push}
                    onChange={(checked) =>
                      setUserSettings((prev) => ({
                        ...prev,
                        notifications: { ...prev.notifications, push: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <Text className="font-medium block">Price Alerts</Text>
                      <Text className="text-sm text-gray-500">
                        Cryptocurrency price movements
                      </Text>
                    </div>
                  </div>
                  <Switch
                    checked={userSettings.notifications.priceAlerts}
                    onChange={(checked) =>
                      setUserSettings((prev) => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          priceAlerts: checked,
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">N</span>
                    </div>
                    <div>
                      <Text className="font-medium block">News Updates</Text>
                      <Text className="text-sm text-gray-500">
                        Market news and analysis
                      </Text>
                    </div>
                  </div>
                  <Switch
                    checked={userSettings.notifications.newsUpdates}
                    onChange={(checked) =>
                      setUserSettings((prev) => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          newsUpdates: checked,
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">P</span>
                    </div>
                    <div>
                      <Text className="font-medium block">
                        Portfolio Summary
                      </Text>
                      <Text className="text-sm text-gray-500">
                        Weekly portfolio reports
                      </Text>
                    </div>
                  </div>
                  <Switch
                    checked={userSettings.notifications.portfolioSummary}
                    onChange={(checked) =>
                      setUserSettings((prev) => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          portfolioSummary: checked,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </Card>
          </Col>

          {/* Trading Preferences */}
          <Col xs={24} lg={12}>
            <Card
              className="border-0 shadow-md"
              title={
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-green-500 rounded"></div>
                  <span className="text-lg font-semibold">
                    Trading Preferences
                  </span>
                </div>
              }
            >
              <div className="space-y-6">
                <div>
                  <Text className="font-medium block mb-3">
                    Default Order Type
                  </Text>
                  <Select
                    value={userSettings.trading.defaultOrderType}
                    onChange={(value) =>
                      setUserSettings((prev) => ({
                        ...prev,
                        trading: { ...prev.trading, defaultOrderType: value },
                      }))
                    }
                    className="w-full"
                  >
                    <Option value="market">Market Order</Option>
                    <Option value="limit">Limit Order</Option>
                    <Option value="stop">Stop Order</Option>
                    <Option value="stop-limit">Stop-Limit Order</Option>
                  </Select>
                </div>

                <div>
                  <Text className="font-medium block mb-3">
                    Maximum Order Size
                  </Text>
                  <InputNumber
                    value={userSettings.trading.maxOrderSize}
                    onChange={(value) =>
                      setUserSettings((prev) => ({
                        ...prev,
                        trading: { ...prev.trading, maxOrderSize: value || 0 },
                      }))
                    }
                    addonBefore="$"
                    className="w-full"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                </div>

                <div>
                  <Text className="font-medium block mb-3">Risk Level</Text>
                  <Select
                    value={userSettings.trading.riskLevel}
                    onChange={(value) =>
                      setUserSettings((prev) => ({
                        ...prev,
                        trading: { ...prev.trading, riskLevel: value },
                      }))
                    }
                    className="w-full"
                  >
                    <Option value="conservative">Conservative</Option>
                    <Option value="moderate">Moderate</Option>
                    <Option value="aggressive">Aggressive</Option>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <Text className="font-medium block">
                      Confirm Large Orders
                    </Text>
                    <Text className="text-sm text-gray-500">
                      Require confirmation for orders over $1,000
                    </Text>
                  </div>
                  <Switch
                    checked={userSettings.trading.confirmLargeOrders}
                    onChange={(checked) =>
                      setUserSettings((prev) => ({
                        ...prev,
                        trading: {
                          ...prev.trading,
                          confirmLargeOrders: checked,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Modals */}
        <Modal
          title="Enable Two-Factor Authentication"
          visible={is2FAModalVisible}
          onCancel={() => setIs2FAModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIs2FAModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="enable" type="primary">
              Enable 2FA
            </Button>,
          ]}
        >
          <div className="text-center py-8">
            <SafetyOutlined className="text-6xl text-green-600 mb-4" />
            <Title level={4}>Secure Your Account</Title>
            <Text className="text-gray-600">
              Scan the QR code with your authenticator app to enable two-factor
              authentication.
            </Text>
          </div>
        </Modal>

        <Modal
          title="Change Password"
          visible={isPasswordModalVisible}
          onCancel={() => setIsPasswordModalVisible(false)}
          footer={[
            <Button
              key="cancel"
              onClick={() => setIsPasswordModalVisible(false)}
            >
              Cancel
            </Button>,
            <Button key="change" type="primary" danger>
              Change Password
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[{ required: true, min: 8 }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default SettingsPage;
