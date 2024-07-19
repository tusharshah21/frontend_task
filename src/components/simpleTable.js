import React, { useState } from 'react';
import './simpleTable.css';
import { Table, Button, Modal, Form, Input} from 'antd';

const SimpleTable = ({ dataSource, onDeleteRecord, onEditRecord }) => {
  const [editingRecord, setEditingRecord] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleUpdation = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      onEditRecord({ ...editingRecord, ...values });
      setVisible(false);
      form.resetFields();
      setEditingRecord(null);
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    setEditingRecord(null);
  };

  const verifyDeletion = (recordId) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this record?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        onDeleteRecord(recordId);
      },
    });
  };

  const columns = [
    {
      key: 1,
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 2,
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 3,
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 4,
      title: 'Actions',
      render: (record) => (
        <>
          <Button 
            type="primary" 
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => verifyDeletion(record.id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="table-container">
      {dataSource.length ? (
        <Table columns={columns} dataSource={dataSource} rowKey="id" />
      ) : (
        'No user data'
      )}
      <Modal
        title="Edit Record"
        visible={visible}
        onOk={handleUpdation}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            initialValue={editingRecord?.name}
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            initialValue={editingRecord?.email}
            rules={[
              { required: true, message: 'Please enter an email' },
              {
                type: 'email',
                message: 'Please enter a valid email address',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SimpleTable;
