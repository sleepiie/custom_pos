import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table, Alert } from "antd";
import type { TableProps } from "antd";
import {
  GetStock,
  GetRecentBuy,
  GetRecentSell,
} from "../../wailsjs/go/main/App";

interface BuyItem {
  Stock: StockItem;
  Price: number;
  Quantity: number;
  Date: string;
}

interface SellItem {
  Stock: StockItem;
  Price: number;
  Quantity: number;
  Date: string;
}

interface StockItem {
  Id: number;
  Name: string;
}

const Analysis: React.FC = () => {
  const [buys, setBuys] = useState<BuyItem[]>([]);
  const [sells, setSells] = useState<SellItem[]>([]);
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [loadingBuys, setLoadingBuys] = useState(true);
  const [loadingSells, setLoadingSells] = useState(true);
  const [loadingStocks, setLoadingStocks] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const stockdata = await GetStock();
      setStocks(stockdata as StockItem[]);
      setLoadingStocks(false);

      const buydata = await GetRecentBuy(10);
      setBuys(buydata as BuyItem[]);
      setLoadingBuys(false);

      const selldata = await GetRecentSell(10);
      setSells(selldata as SellItem[]);
      setLoadingSells(false);
    } catch (err) {
      setError("Failed to fetch stock data");
      setLoadingStocks(false);
      setLoadingBuys(false);
      setLoadingSells(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const buyColumns: TableProps<BuyItem>["columns"] = [
    {
      title: "สินค้า",
      dataIndex: ["Stock", "Name"],
      key: "Name",
      width: "40%",
    },
    {
      title: "ราคา",
      dataIndex: "Price",
      key: "Price",
      render: (price: number) => `${price.toFixed(2)} บาท`,
      width: "30%",
    },
    {
      title: "จำนวน",
      dataIndex: "Quantity",
      key: "Quantity",
      width: "30%",
    },
  ];

  const sellColumns: TableProps<SellItem>["columns"] = [
    {
      title: "สินค้า",
      dataIndex: ["Stock", "Name"],
      key: "Name",
      width: "40%",
    },
    {
      title: "ราคา",
      dataIndex: "Price",
      key: "Price",
      render: (price: number) => `${price.toFixed(2)} บาท`,
      width: "30%",
    },
    {
      title: "จำนวน",
      dataIndex: "Quantity",
      key: "Quantity",
      width: "30%",
    },
  ];

  return (
    <div style={{ padding: "8px", width: "100%" }}>
      <h2>Analysis</h2>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: "16px" }}
        />
      )}
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card style={{ width: "100%" }}>
            <p>This is an analysis page.</p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card style={{ width: "100%" }}>
            <p>This is an analysis page.</p>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "24px", width: "100%" }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <h3>รายการซื้อล่าสุด</h3>
          <Table
            columns={buyColumns}
            dataSource={buys}
            loading={loadingBuys || loadingStocks}
            pagination={false}
            style={{ width: "100%" }}
            size="small"
            scroll={{ x: "max-content" }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <h3>รายการขายล่าสุด</h3>
          <Table
            columns={sellColumns}
            dataSource={sells}
            loading={loadingSells || loadingStocks}
            pagination={false}
            style={{ width: "100%" }}
            size="small"
            scroll={{ x: "max-content" }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Analysis;
