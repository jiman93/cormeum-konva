'use client';

import React, { PropsWithChildren } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import _ from 'lodash';
import Table, { ColumnsType } from 'antd/es/table';
import Link from 'next/link';

export interface DataType {
  id: string;
  key: string;
  serverName: string;
  value: string;
  description: string;
  groupName: string;
  isDefault: boolean;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Server Name',
    dataIndex: 'serverName',
    key: 'serverName',
  },
  {
    title: 'value',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'groupName',
    dataIndex: 'groupName',
    key: 'groupName',
  },
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'id',
    render: (id) => (
      <Space size="middle" key={id}>
        <Link href={`/patient/${id}`}>
          <Button type="primary">Process</Button>
        </Link>
        <a>Delete</a>
      </Space>
    ),
  },
];

const ConfigListing = ({ data }: { data: DataType[] }) => {
  console.log('ConfigListing', data);

  return <Table columns={columns} dataSource={data} size="small" rowKey="id" />;
};

export default ConfigListing;
