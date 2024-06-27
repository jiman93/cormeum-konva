'use client';

import 'antd/dist/reset.css';
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { Button } from 'antd';
import Link from 'next/link';
config.autoAddCss = false;

const RootPage = () => (
  <Button type="primary">
    <Link href="/worklist">Go to worklist</Link>
  </Button>
);

export default RootPage;
