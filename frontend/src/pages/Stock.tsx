import React , {useEffect , useState} from 'react';
import {GetStock} from "../../wailsjs/go/main/App";
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

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



  const columns: TableProps<StockItem>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Type',
      dataIndex: ['Type', 'Name'],
      key: 'Type',
    },
    {
      title: 'ImeI',
      dataIndex: 'ImeI',
      key: 'ImeI',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
    },

  ];

  useEffect(()=>{
    const fetchStock = async () => {
      try {
        // เรียก method GetStock จาก backend
        const data = await GetStock();
        setStockData(data as StockItem[]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stock data');
        setLoading(false);
      }
    };

    fetchStock();
  },[]);

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