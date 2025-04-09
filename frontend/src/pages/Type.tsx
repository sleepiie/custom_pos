import React, { useEffect, useState } from "react";
import { GetType } from "../../wailsjs/go/main/App";
import { Space, Table, Tag } from "antd";
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

const Type: React.FC = () => {
  const [typedata, settypedata] = useState<Type[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns: TableProps<Type>["columns"] = [
    {
      title: "Type",
      dataIndex: "Name",
      key: "Name",
    },
  ];

  useEffect(() => {
    const fetchType = async () => {
      try {
        // เรียก method GetStock จาก backend
        const data = await GetType();
        settypedata(data as Type[]);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch type data");
        setLoading(false);
      }
    };

    fetchType();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Stock</h2>
      <Table
        columns={columns}
        dataSource={typedata}
        loading={loading}
        pagination={{ pageSize: 20 }}
      />
    </div>
  );
};

export default Type;
