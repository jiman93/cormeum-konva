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
  fullName: string;
  esId: string;
  phone: string;
  email: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ES Number',
    dataIndex: 'esId',
    key: 'esId',
  },
  {
    title: 'Name',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    render: (text) => <a href={`tel:${text}`}>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (text) => <a href={`mailto:${text}`}>{text}</a>,
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

const PatientListing = ({ data }: { data: DataType[] }) => {
  return <Table columns={columns} dataSource={data} size="small" rowKey="id" />;
};

export default PatientListing;
