'use client';

import { theme } from 'antd';
import { PropsWithChildren } from 'react';

const Layout: React.FC = ({ children }: PropsWithChildren) => {
  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();

  return (
    <>
      <div className="h-full px-4 py-2" style={{ background: colorBgContainer, color: colorText }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
