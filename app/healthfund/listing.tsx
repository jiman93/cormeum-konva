'use client';

import React, { PropsWithChildren } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';
import { patientList } from 'lib/actions';
import _ from 'lodash';
import Table, { ColumnsType } from 'antd/es/table';
import Link from 'next/link';

export interface DataType {
  id: string;
  name: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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

const HealthfundListing = ({ data }: { data: DataType[] }) => {
  console.log('HealthfundListing', data);

  return <Table columns={columns} dataSource={data} size="small" rowKey="id" />;
};

export default HealthfundListing;
