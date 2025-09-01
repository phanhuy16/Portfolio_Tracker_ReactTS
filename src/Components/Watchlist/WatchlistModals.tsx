import { Form, Modal, Row, Col, Select, InputNumber, Input } from "antd";
import { Switch } from "antd";
import { WatchlistItem } from "../../Models/Watchlist";

const { Option } = Select;

interface WatchlistModalsProps {
  isAddModalVisible: boolean;
  isEditModalVisible: boolean;
  selectedItem: WatchlistItem | null;
  form: any;
  onAddSubmit: () => void;
  onEditSubmit: () => void;
  onAddCancel: () => void;
  onEditCancel: () => void;
}

export const WatchlistModals: React.FC<WatchlistModalsProps> = ({
  isAddModalVisible,
  isEditModalVisible,
  selectedItem,
  form,
  onAddSubmit,
  onEditSubmit,
  onAddCancel,
  onEditCancel,
}) => {
  return (
    <>
      {/* Add Modal */}
      <Modal
        title="Add to Watchlist"
        open={isAddModalVisible}
        onOk={onAddSubmit}
        onCancel={onAddCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="stockId"
                label="Select Stock"
                rules={[{ required: true, message: "Please select a stock" }]}
              >
                <Select placeholder="Search and select stock" showSearch>
                  <Option value={1}>AAPL - Apple Inc</Option>
                  <Option value={2}>TSLA - Tesla Inc</Option>
                  <Option value={3}>NVDA - NVIDIA Corp</Option>
                  <Option value={4}>META - Meta Platforms</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priority"
                label="Priority Level"
                rules={[{ required: true, message: "Please set priority" }]}
              >
                <Select placeholder="Select priority">
                  <Option value={1}>Low (1)</Option>
                  <Option value={2}>Low-Medium (2)</Option>
                  <Option value={3}>Medium (3)</Option>
                  <Option value={4}>High (4)</Option>
                  <Option value={5}>Very High (5)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="targetPrice" label="Target Price">
                <InputNumber
                  placeholder="0.00"
                  style={{ width: "100%" }}
                  min={0}
                  step={0.01}
                  addonBefore="$"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="stopLoss" label="Stop Loss">
                <InputNumber
                  placeholder="0.00"
                  style={{ width: "100%" }}
                  min={0}
                  step={0.01}
                  addonBefore="$"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="notes" label="Notes">
            <Input.TextArea
              placeholder="Add your notes about this stock..."
              rows={3}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Watchlist Item"
        open={isEditModalVisible}
        onOk={onEditSubmit}
        onCancel={onEditCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="priority" label="Priority Level">
                <Select placeholder="Select priority">
                  <Option value={1}>Low (1)</Option>
                  <Option value={2}>Low-Medium (2)</Option>
                  <Option value={3}>Medium (3)</Option>
                  <Option value={4}>High (4)</Option>
                  <Option value={5}>Very High (5)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="alertTriggered" label="Alert Status">
                <Switch
                  checkedChildren="Triggered"
                  unCheckedChildren="Watching"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="targetPrice" label="Target Price">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  step={0.01}
                  addonBefore="$"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="stopLoss" label="Stop Loss">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  step={0.01}
                  addonBefore="$"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
