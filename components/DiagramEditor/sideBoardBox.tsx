'use client';

import { Button, Radio, Slider, Space, theme, Tooltip, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';

import ColorPopover from 'components/ColorPopover';
import { useContext, useState } from 'react';
import { CanvasBoardContext } from 'store/contexts/canvasBoard';
import Image from 'next/image';
import { CanvasEventsContext } from 'store/contexts/canvasEvents';

const SideBoardBox: React.FC = () => {
  const { token } = theme.useToken();
  const { onSetKeypress } = useContext(CanvasEventsContext);
  const { customisation, onSetCustomisation, stageRef, selectedItem } =
    useContext(CanvasBoardContext);

  const [img, setImg] = useState('');

  const renderColorBox = (
    <div className="flex flex-col">
      <Typography.Text>Color</Typography.Text>
      <ColorPopover />
    </div>
  );

  const renderStrokeWidthBox = (
    <div className="flex flex-col">
      <Typography.Text>Thickness</Typography.Text>
      <Radio.Group
        value={customisation.strokeWidth}
        onChange={(e) => onSetCustomisation({ ...customisation, strokeWidth: e.target.value })}
        buttonStyle="solid"
      >
        <Radio.Button value={2}>S</Radio.Button>
        <Radio.Button value={4}>M</Radio.Button>
        <Radio.Button value={6}>L</Radio.Button>
        <Radio.Button value={8}>XL</Radio.Button>
      </Radio.Group>
    </div>
  );

  const renderOpacityBox = (
    <div className="flex flex-col">
      Opacity
      <Slider
        value={customisation.opacity}
        step={0.1}
        min={0.1}
        max={1}
        onChange={(n) => {
          onSetCustomisation({ ...customisation, opacity: n });
        }}
      />
    </div>
  );

  const renderFontSizeBox = (
    <div className="flex flex-col">
      <Typography.Text>Font Size</Typography.Text>
      <Radio.Group
        value={customisation.fontSize}
        onChange={(e) => onSetCustomisation({ ...customisation, fontSize: e.target.value })}
        buttonStyle="solid"
      >
        <Radio.Button value={13}>S</Radio.Button>
        <Radio.Button value={16}>M</Radio.Button>
        <Radio.Button value={24}>L</Radio.Button>
        <Radio.Button value={32}>XL</Radio.Button>
      </Radio.Group>
    </div>
  );

  const renderActionsBox = (
    <div className="flex flex-col">
      <Typography.Text>Actions</Typography.Text>
      <div className="flex">
        <Tooltip title="Copy">
          <Button
            icon={<FontAwesomeIcon icon={faCopy} style={{ color: token.colorPrimary }} />}
            onClick={(e) => {
              e.preventDefault();
              onSetKeypress('Duplicate');
            }}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            icon={<FontAwesomeIcon icon={faTrash} style={{ color: token.colorError }} />}
            className="ml-2"
            onClick={(e) => {
              e.preventDefault();
              onSetKeypress('Delete');
            }}
          />
        </Tooltip>
      </div>
    </div>
  );

  return (
    <div className="flex-col">
      <div className="rounded-lg p-3 mt-3 w-52" style={{ background: token.colorBgLayout }}>
        <Space direction="vertical" size="large" className="flex">
          {renderColorBox}
          {renderFontSizeBox}
          {renderStrokeWidthBox}
          {renderOpacityBox}
          {selectedItem && renderActionsBox}
        </Space>

        <Button
          onClick={() => {
            const stage = stageRef?.current;
            if (!stage) return;
            const base64 = stage.toDataURL();
            setImg(base64);
          }}
          className="mt-2"
        >
          Download
        </Button>
        {img && <Image src={img} alt="saved" width={100} height={100} className="p-2" />}
      </div>
    </div>
  );
};

export default SideBoardBox;
