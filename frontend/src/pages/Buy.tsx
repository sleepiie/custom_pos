import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Alert, Modal } from "antd";
import { AddStock, GetType } from "../../wailsjs/go/main/App";

interface Type {
  Id: number;
  Name: string;
}

interface StockForm {
  name: string;
  imei: string;
  typeId: number;
  quantity: number;
  pricebuy: number;
  pricesell: number;
}

const Buy: React.FC = () => {
  const [form] = Form.useForm();
  const [types, setTypes] = useState<Type[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await GetType();
        setTypes(data as Type[]);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลประเภทได้");
      }
    };
    fetchTypes();
  }, []);

  const handleSubmit = async (values: StockForm) => {
    setLoading(true);
    setError(null);
    try {
      await AddStock(
        values.name,
        values.imei,
        values.typeId,
        values.quantity,
        values.pricebuy,
        values.pricesell,
      );
      Modal.success({
        title: "Success",
        content: "เพิ่มสินค้าในสต็อกเรียบร้อยแล้ว!",
      });
      form.resetFields();
    } catch (err: any) {
      setError(err.message || "ไม่สามารถเพิ่มสินค้าได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "24px" }}>เพิ่มสินค้าใหม่ในสต็อก</h2>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: "16px" }}
        />
      )}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: "",
          imei: "",
          typeId: undefined,
          quantity: 1,
          price: 0,
        }}
      >
        <Form.Item
          label="ชื่อสินค้า"
          name="name"
          rules={[{ required: true, message: "กรุณากรอกชื่อสินค้า" }]}
        >
          <Input placeholder="กรอกชื่อสินค้า" />
        </Form.Item>
        <Form.Item
          label="IMEI"
          name="imei"
          rules={[{ required: true, message: "กรุณากรอก IMEI" }]}
        >
          <Input maxLength={15} placeholder="กรอก IMEI" />
        </Form.Item>
        <Form.Item
          label="ประเภท"
          name="typeId"
          rules={[{ required: true, message: "กรุณาเลือกประเภท" }]}
        >
          <Select placeholder="เลือกประเภท">
            {types.map((type) => (
              <Select.Option key={type.Id} value={type.Id}>
                {type.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="จำนวน"
          name="quantity"
          rules={[
            { required: true, message: "กรุณากรอกจำนวน" },
            {
              validator: (_, value) =>
                value >= 1
                  ? Promise.resolve()
                  : Promise.reject(new Error("จำนวนต้องมากกว่าหรือเท่ากับ 1")),
            },
          ]}
          normalize={(value) => (value ? parseInt(value, 10) : value)}
        >
          <Input type="number" placeholder="กรอกจำนวน" min={1} />
        </Form.Item>
        <Form.Item
          label="ราคาซื้อ"
          name="pricebuy"
          rules={[
            { required: true, message: "กรุณากรอกราคา" },
            {
              validator: (_, value) =>
                value >= 0
                  ? Promise.resolve()
                  : Promise.reject(new Error("ราคาต้องไม่เป็นลบ")),
            },
          ]}
          normalize={(value) => (value ? parseFloat(value) : value)}
        >
          <Input type="number" step="0.01" placeholder="กรอกราคา" min={0} />
        </Form.Item>
        <Form.Item
          label="ราคาขาย"
          name="pricesell"
          rules={[
            { required: true, message: "กรุณากรอกราคา" },
            {
              validator: (_, value) =>
                value >= 0
                  ? Promise.resolve()
                  : Promise.reject(new Error("ราคาต้องไม่เป็นลบ")),
            },
          ]}
          normalize={(value) => (value ? parseFloat(value) : value)}
        >
          <Input type="number" step="0.01" placeholder="กรอกราคา" min={0} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            เพิ่มสินค้า
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Buy;
