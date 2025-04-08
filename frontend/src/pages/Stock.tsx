import React , {useEffect , useState} from 'react';
import {GetStock} from "../../wailsjs/go/main/App";

interface StockItem {
  Id: number;
  Name: string;
  Type: string;
  Quantity: number;
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
            <th>Name</th>
            <th>Type</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((item) => (
            <tr key={item.Id}>
              <td>{item.Id}</td>
              <td>{item.Name}</td>
              <td>{item.Type}</td>
              <td>{item.Quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;