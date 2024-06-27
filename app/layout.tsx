import './global.css';

import type { PropsWithChildren } from 'react';
import { RootStyleRegistry } from './antd';
import AppLayout from './appLayout';
import Provider from './provider';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body style={{ margin: 0, padding: 0 }}>
        <Provider>
          <RootStyleRegistry>
            <AppLayout children={children} />
          </RootStyleRegistry>
        </Provider>
      </body>
    </html>
  );
}
