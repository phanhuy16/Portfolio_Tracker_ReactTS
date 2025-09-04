// src/components/TransactionFormModal/TransactionFormModal.tsx
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  message,
} from "antd";
import { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import {
  COMMISSION_RATES,
  CreateTransactionRequest,
  Transaction,
  calculateCommissionByPercentage,
  calculateTotalAmount,
  calculateTotalCost,
} from "../../Models/Transaction";
import {
  formatDateForPicker,
  formatTransactionDateForAPI,
  getCurrentVietnamDate,
  isValidTransactionDate,
} from "../../utils/dateUtils";

const { Option } = Select;
const { TextArea } = Input;

interface TransactionFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateTransactionRequest) => Promise<void>;
  editingTransaction?: Transaction | null;
  loading?: boolean;
}

export const TransactionFormModal: React.FC<TransactionFormModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  editingTransaction,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [usePercentageCommission, setUsePercentageCommission] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isEditing = !!editingTransaction;

  // Reset form when modal opens/closes or editing transaction changes
  useEffect(() => {
    if (visible) {
      if (editingTransaction) {
        console.log("edit", editingTransaction);
        form.setFieldsValue({
          // stockId: editingTransaction.stockId,
          transactionType: editingTransaction.transactionType,
          quantity: editingTransaction.quantity,
          price: editingTransaction.price,
          commission: editingTransaction.commission || 0,
          transactionDate: formatDateForPicker(
            editingTransaction.transactionDate
          ),
          notes: editingTransaction.notes || "",
        });
      } else {
        form.resetFields();
        // Set default values for new transaction
        form.setFieldsValue({
          transactionDate: getCurrentVietnamDate(),
          transactionType: 1, // Default to Buy (number)
          commission: 0,
        });
      }
      setUsePercentageCommission(false);
    }
  }, [visible, editingTransaction, form]);

  const handleSubmit = async (values: any) => {
    try {
      setSubmitting(true);

      // Validate transaction date
      if (!isValidTransactionDate(values.transactionDate)) {
        message.error("Ngày giao dịch không hợp lệ");
        return;
      }

      // Format the data properly - transactionType is already a number
      const transactionData: CreateTransactionRequest = {
        stockId: values.stockId,
        transactionType: values.transactionType, // Already a number from Select
        quantity: values.quantity,
        price: values.price,
        commission: values.commission || 0,
        transactionDate: formatTransactionDateForAPI(values.transactionDate),
        notes: values.notes || "",
      };

      console.log(values);

      await onSubmit(transactionData);

      // Reset form only on successful submission
      form.resetFields();
      setUsePercentageCommission(false);
    } catch (error) {
      console.error("Error submitting transaction:", error);
      message.error("Có lỗi xảy ra khi lưu giao dịch");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setUsePercentageCommission(false);
    onCancel();
  };

  // Watch form values for calculations
  const quantity = Form.useWatch("quantity", form);
  const price = Form.useWatch("price", form);
  const commission = Form.useWatch("commission", form) || 0;
  const transactionType = Form.useWatch("transactionType", form) || 1;

  // Calculations
  const totalAmount =
    quantity && price ? calculateTotalAmount(quantity, price) : 0;
  const totalCost =
    quantity && price
      ? calculateTotalCost(quantity, price, commission, transactionType)
      : 0;

  // Handle commission percentage calculation
  const handleCommissionRateChange = (rate: number) => {
    if (totalAmount > 0) {
      const calculatedCommission = calculateCommissionByPercentage(
        totalAmount,
        rate
      );
      form.setFieldsValue({ commission: calculatedCommission });
    } else {
      message.warning(
        "Vui lòng nhập số lượng và giá trước khi tính phí theo tỷ lệ"
      );
    }
  };

  // Custom date validator
  const validateTransactionDate = (_: any, value: Dayjs) => {
    if (!value) {
      return Promise.reject(new Error("Vui lòng chọn ngày giao dịch"));
    }

    if (!isValidTransactionDate(value)) {
      return Promise.reject(
        new Error("Ngày giao dịch không hợp lệ hoặc quá xa trong tương lai")
      );
    }

    return Promise.resolve();
  };

  return (
    <Modal
      title={
        <div className="text-xl font-semibold text-gray-900">
          {isEditing ? "Chỉnh sửa giao dịch" : "Tạo giao dịch mới"}
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={800}
      destroyOnClose
      className="transaction-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-6"
        requiredMark={false}
        preserve={false}
      >
        {/* Row 1: Stock ID and Transaction Type */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="stockId"
              label={
                <span className="font-medium text-gray-700">Mã cổ phiếu</span>
              }
              rules={[
                { required: true, message: "Vui lòng nhập mã cổ phiếu" },
                {
                  type: "number",
                  min: 1,
                  message: "Mã cổ phiếu phải là số dương",
                },
              ]}
            >
              <InputNumber
                min={1}
                className="w-full h-10"
                placeholder="Nhập mã cổ phiếu"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="transactionType"
              label={
                <span className="font-medium text-gray-700">
                  Loại giao dịch
                </span>
              }
              rules={[
                { required: true, message: "Vui lòng chọn loại giao dịch" },
              ]}
            >
              <Select placeholder="Chọn loại giao dịch" className="h-10">
                <Option value={1}>
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Mua
                  </span>
                </Option>
                <Option value={2}>
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Bán
                  </span>
                </Option>
                <Option value={3}>
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Cổ tức
                  </span>
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Row 2: Quantity and Price */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="quantity"
              label={
                <span className="font-medium text-gray-700">Số lượng</span>
              }
              rules={[
                { required: true, message: "Vui lòng nhập số lượng" },
                {
                  type: "number",
                  min: 0.01,
                  message: "Số lượng phải lớn hơn 0",
                },
              ]}
            >
              <InputNumber
                min={0.01}
                step={0.01}
                className="w-full h-10"
                placeholder="Nhập số lượng"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label={
                <span className="font-medium text-gray-700">
                  Giá mỗi cổ phiếu (₫)
                </span>
              }
              rules={[
                { required: true, message: "Vui lòng nhập giá" },
                { type: "number", min: 0.01, message: "Giá phải lớn hơn 0" },
              ]}
            >
              <InputNumber
                min={0.01}
                step={1000}
                className="w-full h-10"
                placeholder="Nhập giá"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Commission Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-gray-700">Phí hoa hồng</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Tính theo %</span>
              <Switch
                checked={usePercentageCommission}
                onChange={setUsePercentageCommission}
                size="small"
              />
            </div>
          </div>

          {usePercentageCommission && (
            <div className="mb-3">
              <div className="text-sm text-gray-600 mb-2">
                Chọn mức phí thông dụng:
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(COMMISSION_RATES).map(([broker, rate]) => (
                  <Button
                    key={broker}
                    size="small"
                    type="dashed"
                    onClick={() => handleCommissionRateChange(rate)}
                    className="text-xs"
                  >
                    {broker}: {rate}%
                  </Button>
                ))}
              </div>
            </div>
          )}

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="commission"
                label={
                  <span className="font-medium text-gray-700">
                    Phí hoa hồng (₫)
                  </span>
                }
                rules={[
                  { type: "number", min: 0, message: "Phí phải từ 0 trở lên" },
                ]}
              >
                <InputNumber
                  min={0}
                  step={1000}
                  className="w-full h-10"
                  placeholder="Nhập phí hoa hồng"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              {totalAmount > 0 && (
                <div className="mt-8">
                  <div className="text-sm text-gray-600">
                    Tỷ lệ phí:{" "}
                    <strong>
                      {((commission / totalAmount) * 100).toFixed(3)}%
                    </strong>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </div>

        {/* Total Amount Display */}
        {totalAmount > 0 && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  Tổng giá trị giao dịch:
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {totalAmount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  {transactionType === 1
                    ? "Tổng chi phí (bao gồm phí):"
                    : transactionType === 2
                    ? "Số tiền nhận được (sau trừ phí):"
                    : "Số tiền cổ tức:"}
                </div>
                <div
                  className={`text-xl font-bold ${
                    transactionType === 1
                      ? "text-red-600"
                      : transactionType === 2
                      ? "text-green-600"
                      : "text-purple-600"
                  }`}
                >
                  {totalCost.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            </div>
            {commission > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Phí hoa hồng:{" "}
                  <strong>
                    {commission.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strong>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transaction Date */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="transactionDate"
              label={
                <span className="font-medium text-gray-700">
                  Ngày giao dịch
                </span>
              }
              rules={[{ validator: validateTransactionDate }]}
            >
              <DatePicker
                showTime={{
                  format: "HH:mm",
                  defaultValue: getCurrentVietnamDate(),
                }}
                className="w-full h-10"
                placeholder="Chọn ngày và giờ giao dịch"
                format="DD/MM/YYYY HH:mm"
                showNow={true}
                allowClear={false}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Notes */}
        <Form.Item
          name="notes"
          label={
            <span className="font-medium text-gray-700">
              Ghi chú (tùy chọn)
            </span>
          }
        >
          <TextArea
            rows={3}
            placeholder="Nhập ghi chú về giao dịch này..."
            className="resize-none"
            maxLength={500}
            showCount
          />
        </Form.Item>

        {/* Form Actions */}
        <Form.Item className="mb-0 text-right pt-4 border-t border-gray-200">
          <Space size="middle">
            <Button
              onClick={handleCancel}
              className="min-w-[100px] h-10"
              disabled={loading || submitting}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading || submitting}
              className="min-w-[120px] h-10 bg-blue-600 hover:bg-blue-700"
            >
              {isEditing ? "Cập nhật" : "Tạo mới"}
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <style>{`
        .transaction-modal .ant-form-item-label > label {
          font-weight: 500;
        }
        .transaction-modal .ant-input,
        .transaction-modal .ant-input-number,
        .transaction-modal .ant-select-selector,
        .transaction-modal .ant-picker {
          border-radius: 8px;
        }
        .transaction-modal .ant-form-item {
          margin-bottom: 20px;
        }
        .transaction-modal .ant-switch {
          background-color: #d9d9d9;
        }
        .transaction-modal .ant-switch-checked {
          background-color: #1890ff;
        }
      `}</style>
    </Modal>
  );
};
