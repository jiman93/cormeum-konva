import { Popover } from 'antd';
import React, { useContext } from 'react';
import { CanvasBoardContext } from 'store/contexts/canvasBoard';

const fillColors = [
  '#FFFFFF',
  '#000000',
  '#0000FF',
  '#FF0000',
  '#9400D3',
  '#00FF00',
  '#00BFFF',
  '#7FFFD4',
  '#CCCCCC',
  '#FF1493',
  '#FFD700',
  '#008080',
  '#FF7F50',
  '#800000',
  '#DAF7A6',
];

const App: React.FC = () => {
  const { customisation, onSetCustomisation } = useContext(CanvasBoardContext);

  const content = (
    <div className="flex w-48 flex-wrap">
      {fillColors.map((color) => {
        return (
          <div
            key={color}
            className="rounded-lg w-8 h-8 border border-gray-400 mr-1 mb-1 hover:cursor-pointer focus:shadow-xl"
            style={{ background: color }}
            onClick={(e) => {
              e.stopPropagation();
              onSetCustomisation({ ...customisation, fill: color });
            }}
          />
        );
      })}
    </div>
  );

  return (
    <Popover content={content} trigger="click" placement="right">
      <div
        className="rounded-lg w-14 h-8 border border-gray-400"
        style={{ background: customisation?.fill }}
      />
    </Popover>
  );
};

export default App;
