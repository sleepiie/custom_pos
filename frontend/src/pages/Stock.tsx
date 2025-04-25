import React, { useEffect, useState } from "react";
import { GetStock, DeleteStock } from "../../wailsjs/go/main/App";
import { Space, Table, Tag, Button, Modal } from "antd";
import type { TableProps } from "antd";
interface Type {
  Id: number;
  Name: string;
}
interface StockItem {
  Id: number;
  Name: string;
  Quantity: number;
  Type: Type;
  ImeI: string;
}

const Stock: React.FC = () => {
  const [stockData, setStockData] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns: TableProps<StockItem>["columns"] = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Type",
      dataIndex: ["Type", "Name"],
      key: "Type",
    },
    {
      title: "ImeI",
      dataIndex: "ImeI",
      key: "ImeI",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record.Id)}>
          Delete
        </Button>
      ),
    },
  ];
  const fetchStock = async () => {
    try {
      const data = await GetStock();
      setStockData(data as StockItem[]);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch stock data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      Modal.confirm({
        title: "Are you sure you want to delete this category?",
        content: "This action cannot be undone.",
        onOk: async () => {
          try {
            await DeleteStock(id);
            await fetchStock();
          } catch (err) {
            setError("Failed to delete category");
          }
        },
      });
    } catch (err) {
      setError("Failed to delete category");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Stock</h2>
      <Table
        columns={columns}
        dataSource={stockData}
        loading={loading}
        pagination={{ pageSize: 20 }}
      />
    </div>
  );
};

export default Stock;
