import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import diagramTab from './diagramTab';
import DiagramTab from './diagramTab';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Conclusion`,
    children: `Content of Tab Pane 1`,
    disabled: true,
  },
  {
    key: '2',
    label: `Details`,
    children: `Content of Tab Pane 2`,
    disabled: true,
  },
  {
    key: '3',
    label: `Measurement`,
    children: `Content of Tab Pane 3`,
    disabled: true,
  },
  {
    key: '4',
    label: `ABI Exercise`,
    children: `Content of Tab Pane 3`,
    disabled: true,
  },
  {
    key: '5',
    label: `Dicom Images`,
    children: `Content of Tab Pane 3`,
  },
  {
    key: '6',
    label: `Diagram`,
    children: <DiagramTab />,
  },
  {
    key: '7',
    label: `Related Report`,
    children: `Content of Tab Pane 3`,
  },
  {
    key: '8',
    label: `Conclusion History`,
    children: `Content of Tab Pane 3`,
    disabled: true,
  },
  {
    key: '9',
    label: `Print, Fax, PDF & History`,
    children: `Content of Tab Pane 3`,
    disabled: true,
  },
  {
    key: '10',
    label: `Results`,
    children: `Content of Tab Pane 3`,
    disabled: true,
  },
  {
    key: '11',
    label: `Prescription`,
    children: `Content of Tab Pane 3`,
    disabled: true,
  },
];

const App: React.FC = () => (
  <Tabs defaultActiveKey="6" items={items} onChange={onChange} type="card" />
);

export default App;
