'use client';

import React, { useContext } from 'react';
import { Dropdown, theme } from 'antd';
import type { MenuProps } from 'antd';
import { SelectedContextMenu } from './diagramCanvas';
import { MenuInfo } from 'rc-menu/lib/interface';
import { CanvasBoardContext } from 'store/contexts/canvasBoard';

type Props = {
  selectedContextMenu: SelectedContextMenu | null;
};

const App: React.FC<Props> = ({ selectedContextMenu }) => {
  const { selectedItem } = useContext(CanvasBoardContext);
  const { token } = theme.useToken();

  if (!selectedContextMenu) return <></>;

  const { position, type } = selectedContextMenu;

  let items: MenuProps['items'] = [
    {
      key: 0,
      label: type,
      disabled: true,
      className: '!cursor-default',
    },
    {
      key: 1,
      label: 'Copy to clipboard as PNG',
    },
    {
      key: 2,
      label: 'Flip horizontal',
    },
    {
      key: 3,
      label: 'Flip vertical',
    },
  ];

  const actionItems: MenuProps['items'] = [
    {
      key: 4,
      type: 'divider',
    },
    {
      key: 5,
      label: 'Copy',
    },
    {
      key: 6,
      label: 'Delete',
    },
  ];

  if (selectedItem && items && actionItems) {
    items = [...items, ...actionItems];
  }

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const handleSelect = (event: MenuInfo) => {
    if (!items) return;
    const key = event.key;
    console.log('handleSelect', items[Number(key) - 1]);
  };

  return (
    <div style={{ position: 'absolute', left: position?.x, top: position?.y, zIndex: 999 }}>
      <Dropdown
        open={!!selectedContextMenu}
        menu={{ items, onClick: (s) => handleSelect(s) }}
        trigger={['contextMenu']}
        dropdownRender={(menu) => (
          <div style={contentStyle}>
            {React.cloneElement(menu as React.ReactElement, { className: '!shadow-none' })}
          </div>
        )}
        arrow={false}
      >
        <div />
      </Dropdown>
    </div>
  );
};

export default App;
