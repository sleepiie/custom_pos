import React , {useEffect , useState} from 'react';
import {GetStock} from "../../wailsjs/go/main/App";

interface StockItem {
  id: number;
  created_at: string;
}

const Stock: React.FC = () => {
  const [stockData, setStockData] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>create at</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;