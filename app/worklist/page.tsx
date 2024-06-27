'use client';

import { Col, Descriptions, Divider, Radio, Row, Select, Space, Typography } from 'antd';
import { PropsWithChildren } from 'react';
import Listing from './listing';

const Worklist: React.FC = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Row className="justify-center">
        <Typography.Title level={5}>Reporting Work List</Typography.Title>
      </Row>
      <Row>
        <Col span="12">
          <Space size="middle" direction="vertical">
            <Space>
              <Typography.Text>Report Type</Typography.Text>
              <Select
                defaultValue="vascular"
                className="w-60"
                onChange={(v) => console.log(`selected:${v}`)}
                options={[
                  { value: 'echo', label: 'Echo', disabled: true },
                  { value: 'vascular', label: 'Vascular' },
                  { value: 'ecg', label: 'ECG', disabled: true },
                  { value: 'sleebLab', label: 'Sleeb Lab', disabled: true },
                ]}
              />
            </Space>
            <Space>
              <Typography.Text>Status</Typography.Text>
              <Select
                defaultValue="saved"
                className="w-60"
                onChange={(v) => console.log(`selected:${v}`)}
                options={[
                  { value: 'saved', label: 'Saved' },
                  { value: 'provisional', label: 'Provisional' },
                  { value: 'final', label: 'Final' },
                ]}
              />
            </Space>
            <Space>
              <Typography.Text>Search</Typography.Text>
              <Radio.Group onChange={(e) => console.log(e)} value={'byDate'}>
                <Radio value={'byDate'}>by Date</Radio>
                <Radio value={'byName'}>by Name</Radio>
              </Radio.Group>
            </Space>

            <Space>
              <Typography.Text>Priority</Typography.Text>
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">Default</Radio.Button>
                <Radio.Button value="b">High Priority</Radio.Button>
                <Radio.Button value="c">Low Priority</Radio.Button>
              </Radio.Group>
            </Space>
          </Space>
        </Col>

        <Col span="12">
          <Space size="middle" direction="vertical">
            <Space>
              <Descriptions layout="vertical" bordered>
                <Descriptions.Item label="New Report Last 7 days">194</Descriptions.Item>
                <Descriptions.Item label="Save Report">2</Descriptions.Item>
                <Descriptions.Item label="Total Reports">179</Descriptions.Item>
              </Descriptions>
            </Space>

            <Space>
              <Typography.Text>Highlight For Reviewer</Typography.Text>
              <Select
                defaultValue="saved"
                className="w-60"
                onChange={(v) => console.log(`selected:${v}`)}
                options={[
                  { value: '', label: '' },
                  { value: 'saved', label: 'Philip Currie' },
                  { value: 'provisional', label: 'Arun Abraham' },
                  { value: 'final', label: 'Christopher Neil' },
                ]}
              />
            </Space>
          </Space>
        </Col>
      </Row>
      <Divider />
      <Listing />
    </>
  );
};

export default Worklist;
