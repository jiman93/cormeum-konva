'use client';

import React, { PropsWithChildren } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { loginPost } from 'lib/actions';
import { useRouter } from 'next/navigation';

const LoginClient = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={async (e) => {
            const res = await loginPost(e);
            console.log('res', res);
            router.push('/worklist/1');
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginClient;
