'use client';

import { Breadcrumb, Button, Divider, Layout, Space, theme } from 'antd';
import _ from 'lodash';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

import { usePathname, useRouter, useSelectedLayoutSegments } from 'next/navigation';
import cvsLogo from '../public/cvsLogo.png';
import AppMenu from './menu';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }: PropsWithChildren) => {
  const {
    token: { colorBgLayout, colorBgElevated, boxShadow, paddingSM, colorTextSecondary },
  } = theme.useToken();

  const segments = useSelectedLayoutSegments();
  const router = useRouter();
  const pathname = usePathname();

  // No layout for login page
  if (pathname?.includes('/login') && React.isValidElement(children)) {
    return children;
  }

  const handleCrumb = (segment: string) => {
    let newPath = '';
    const index = _.indexOf(segments, segment);

    if (!index) {
      newPath = '/' + segment;
    } else {
      const sliced = _.slice(segments, 0, index + 1);
      let concatenate = '';
      console.log('slice', sliced);
      _.forEach(sliced, function (value) {
        concatenate = concatenate + `/${value}`;
      });
      newPath = `${concatenate}`;
    }

    return router.push(newPath);
  };

  return (
    <Layout style={{ background: colorBgLayout }} className="min-h-screen">
      <Space
        style={{ background: colorBgLayout, boxShadow: boxShadow }}
        split={<Divider type="vertical" style={{ background: colorTextSecondary }} />}
        className="h-5 w-100 p-2 mt-2 mr-4 flex justify-end"
      >
        <Button size="middle" type="link" className="!p-0" style={{ color: colorTextSecondary }}>
          Settings
        </Button>
        <Button type="link" size="middle" className="!p-0" style={{ color: colorTextSecondary }}>
          Hafiz.Zaini
        </Button>
        <Button size="middle" type="link" className="!p-0" style={{ color: colorTextSecondary }}>
          Logout
        </Button>
      </Space>
      <Header className="h-10" style={{ background: colorBgElevated, boxShadow: boxShadow }}>
        <div className="flex">
          <div className="my-auto">
            <Image src={cvsLogo} alt="Cormeum Logo" height={40} priority={true} />
          </div>
          <AppMenu bgColor={colorBgElevated} />
        </div>
      </Header>
      <Content className="px-6 !min-h-[700px]">
        <Breadcrumb style={{ padding: paddingSM }}>
          <Breadcrumb.Item onClick={() => console.log('segment', segments)}>Home</Breadcrumb.Item>
          {segments.map((segment, index) => (
            <Breadcrumb.Item
              key={index}
              className="cursor-pointer"
              onClick={() => handleCrumb(segment)}
            >
              {_.capitalize(segment)}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Cormeum App ©2023 Created by Cormeum Healthcare Technologies
      </Footer>
    </Layout>
  );
};

export default AppLayout;
