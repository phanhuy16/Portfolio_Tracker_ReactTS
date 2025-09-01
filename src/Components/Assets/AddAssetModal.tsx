// components/AddAssetModal.tsx
import { Modal, Form, Row, Col, Input, Select, InputNumber } from "antd";

const { Option } = Select;

interface AddAssetModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: any;
}

const AddAssetModal: React.FC<AddAssetModalProps> = ({
  visible,
  onOk,
  onCancel,
  form,
}) => {
  return (
    <Modal
      title="Add New Asset"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={600}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Asset Name"
              rules={[{ required: true, message: "Please enter asset name" }]}
            >
              <Input placeholder="e.g., Bitcoin" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="symbol"
              label="Symbol"
              rules={[{ required: true, message: "Please enter symbol" }]}
            >
              <Input placeholder="e.g., BTC" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="type"
              label="Asset Type"
              rules={[{ required: true, message: "Please select type" }]}
            >
              <Select placeholder="Select type">
                <Option value="crypto">Cryptocurrency</Option>
                <Option value="stock">Stock</Option>
                <Option value="bond">Bond</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: "Please enter quantity" }]}
            >
              <InputNumber
                placeholder="0.00"
                style={{ width: "100%" }}
                min={0}
                step={0.01}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="avgPrice"
          label="Average Purchase Price"
          rules={[{ required: true, message: "Please enter average price" }]}
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

export default AddAssetModal;
