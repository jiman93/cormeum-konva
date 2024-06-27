'use client';

import { Input } from 'antd';

const PatientDetails = ({ data }: any) => {
  console.log('data', data);
  return (
    <div>
      <Input placeholder="Basic usage" />
      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
};

export default PatientDetails;
