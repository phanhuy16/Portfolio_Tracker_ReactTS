// components/QuickTradeModal.tsx
import { Modal, Form, InputNumber, Select } from "antd";

const { Option } = Select;

interface QuickTradeModalProps {
  visible: boolean;
  symbol: string | null;
  price: number | null;
  onSubmit: (tradeData: any) => void;
  onCancel: () => void;
}

export const QuickTradeModal = ({
  visible,
  symbol,
  price,
  onSubmit,
  onCancel,
}: QuickTradeModalProps) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={`Quick Trade - ${symbol}`}
      visible={visible}
      onOk={onSubmit}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      width={500}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="type" label="Order Type" rules={[{ required: true }]}>
          <Select placeholder="Select order type">
            <Option value="buy">Buy</Option>
            <Option value="sell">Sell</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please enter quantity" }]}
        >
          <InputNumber
            placeholder="Number of shares"
            style={{ width: "100%" }}
            min={1}
          />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price per Share"
          rules={[{ required: true }]}
          initialValue={price}
        >
          <InputNumber
            placeholder="0.00"
            style={{ width: "100%" }}
            min={0}
            step={0.01}
            addonBefore="$"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
