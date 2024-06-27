'use client';

import { useState, type PropsWithChildren } from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import { ConfigProvider, theme } from 'antd';

export const RootStyleRegistry = ({ children }: PropsWithChildren) => {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: extractStyle(cache) }} />
        <style
          dangerouslySetInnerHTML={{
            __html: `
      /* https://github.com/ant-design/ant-design/issues/16037#issuecomment-483140458 */
      /* Not only antd, but also any other style if you want to use ssr. */
      *, *::before, *::after {
        transition: none!important;
      }
    `,
          }}
        />
      </>
    );
  });

  return (
    <StyleProvider cache={cache}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            // colorPrimary: '#00b96b',
            // fontSize: 11,
            // fontSizeIcon: 9,
            // colorPrimary: '#3b5998',
          },
          // components: {
          //   Radio: {
          //     colorPrimary: '#3b5998',
          //   },
          // },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
};
