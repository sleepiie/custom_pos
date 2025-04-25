import React, { useEffect, useState } from "react";
import { GetType, AddType, DeleteCategory } from "../../wailsjs/go/main/App";
import { Space, Table, Tag, Button, Flex, Modal, Alert, Input } from "antd";
import type { TableProps } from "antd";

interface Type {
  Id: number;
  Name: string;
}

const Type: React.FC = () => {
  const [typedata, settypedata] = useState<Type[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState<string>("");
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const updateType = (e: any) => setType(e.target.value);

  const columns: TableProps<Type>["columns"] = [
    {
      title: "Type",
      dataIndex: "Name",
      key: "Name",
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

  const fetchType = async () => {
    try {
      const data = await GetType();
      settypedata(data as Type[]);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch type data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchType();
  }, []);

  const showModal = () => {
    setType("");
    setIsModalOpen(true);
    setModalError(null);
  };

  const handleAdd = async () => {
    if (!type.trim()) {
      setModalError("Category name cannot be empty");
      return;
    }
    try {
      setModalLoading(true);
      await AddType(type);
      await fetchType();
      setIsModalOpen(false);
      setType("");
    } catch (err: any) {
      setModalError(err || "Failed to add category");
    } finally {
      setModalLoading(false);
    }
  };

  const handleCancel = () => {
    setType("");
    setIsModalOpen(false);
    setModalError(null);
  };

  const handleDelete = async (id: number) => {
    try {
      Modal.confirm({
        title: "Are you sure you want to delete this category?",
        content: "This action cannot be undone.",
        onOk: async () => {
          try {
            await DeleteCategory(id);
            await fetchType();
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
      <h2>Category</h2>
      <Button type="primary" style={{ padding: "13px" }} onClick={showModal}>
        Add Category
      </Button>
      <Table
        columns={columns}
        dataSource={typedata}
        loading={loading}
        pagination={{ pageSize: 20 }}
        style={{ marginTop: 15 }}
      />
      <Modal
        title="Add Category"
        open={isModalOpen}
        onOk={handleAdd}
        onCancel={handleCancel}
      >
        {modalError && (
          <Alert
            message={modalError}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <Input
          id="inputtype"
          className="input"
          value={type}
          onChange={updateType}
          autoComplete="off"
          name="input"
          type="text"
          placeholder="Enter Category Name"
        />
      </Modal>
    </div>
  );
};

export default Type;
