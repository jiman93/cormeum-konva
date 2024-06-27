'use client';

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Popover,
  Row,
  Select,
  Space,
  theme,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, faClipboardUser } from '@fortawesome/free-solid-svg-icons';
import ActionTabs from './actionTabs';

type Props = {
  data?: String;
  children?: React.ReactNode;
};

const Content: React.FC<Props> = ({ children }) => {
  const { token } = theme.useToken();
  // console.log('content', data.slice(0, 20));
  return (
    <>
      {children}
      <div className="mb-4 overflow-hidden">
        <Row className="justify-center">
          <Typography.Title level={5}>Vascular Report</Typography.Title>
        </Row>
        <Card
          style={{ background: token.colorBgLayout }}
          bodyStyle={{ padding: token.paddingXS, paddingBottom: 0 }}
        >
          <Row>
            <Col span="8">
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                labelAlign="left"
                className="w-10/12"
              >
                <Form.Item label="Study ID">
                  <Typography.Text>57788</Typography.Text>
                </Form.Item>
                <Form.Item label="Date">
                  <Typography.Text>10/02/2023</Typography.Text>
                  <Popover content={<div>blah blah</div>} title="Title" placement="right">
                    <Button
                      type="link"
                      style={{ color: token.colorPrimary }}
                      icon={<FontAwesomeIcon size="xl" icon={faCalendarWeek} />}
                    />
                  </Popover>
                </Form.Item>
                <Form.Item label="Patient">
                  <Typography.Text>Marciano Jayde (ES439348)</Typography.Text>
                  <Popover content={<div>blah blah</div>} title="Title" placement="right">
                    <Button
                      type="link"
                      style={{ color: token.colorPrimary }}
                      icon={<FontAwesomeIcon size="xl" icon={faClipboardUser} />}
                    />
                  </Popover>
                </Form.Item>
              </Form>
            </Col>

            <Col span="8">
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                labelAlign="left"
                className="w-10/12"
              >
                <Form.Item label="Ward">
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
                </Form.Item>
                <Form.Item label="Type">
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
                </Form.Item>
                <Form.Item label="DOB">
                  <Space size="middle">
                    <Typography.Text>06/03/1993</Typography.Text>
                    <Typography.Text>Age (29)</Typography.Text>
                  </Space>
                </Form.Item>
              </Form>
            </Col>

            <Col span="8">
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                labelAlign="left"
                className="w-10/12"
              >
                <Form.Item label="Status">
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
                </Form.Item>
                <Form.Item label="Reported By">
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
                </Form.Item>
                <Form.Item label="Sex">
                  <Typography.Text>F</Typography.Text>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
      <ActionTabs />
    </>
  );
};

export default Content;
