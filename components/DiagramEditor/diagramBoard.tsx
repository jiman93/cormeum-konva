'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Button, Radio, theme } from 'antd';
import dynamic from 'next/dynamic';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowPointer,
  faArrowRight,
  faCircle,
  faDiamond,
  faEraser,
  faFont,
  faMinus,
  faPencil,
  faRedo,
  faRefresh,
  faSave,
  faSquare,
  faUndo,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  CanvasShapesContext,
  hideInputPosition,
  shapesInitialState,
} from 'store/contexts/canvasShapes';
import { CanvasBoardContext } from 'store/contexts/canvasBoard';
import { defaultCustomisation } from 'store/providers/canvasBoard';
import { CanvasEventsContext } from 'store/contexts/canvasEvents';

const DrawingCanvas = dynamic(() => import('./diagramCanvas'), {
  ssr: false,
});

type Props = {
  imagePath: string;
  isClosed: boolean;
  setIsClosed: () => void;
};

export type ToolValue =
  | 'Selector'
  | 'Pen'
  | 'Eraser'
  | 'Rect'
  | 'Diamond'
  | 'Circle'
  | 'Arrow'
  | 'Line'
  | 'Text'
  | 'Undo'
  | 'Redo'
  | 'Draw';

interface Tool {
  value: ToolValue;
  icon: IconDefinition;
}

export const ToolName: Record<ToolValue, ToolValue> = {
  Selector: 'Selector',
  Pen: 'Pen',
  Eraser: 'Eraser',
  Rect: 'Rect',
  Diamond: 'Diamond',
  Circle: 'Circle',
  Arrow: 'Arrow',
  Line: 'Line',
  Text: 'Text',
  Draw: 'Draw',
  Undo: 'Undo',
  Redo: 'Redo',
};

const tools: Tool[] = [
  { value: 'Selector', icon: faArrowPointer },
  { value: 'Pen', icon: faPencil },
  { value: 'Eraser', icon: faEraser },
  { value: 'Rect', icon: faSquare },
  { value: 'Diamond', icon: faDiamond },
  { value: 'Circle', icon: faCircle },
  { value: 'Arrow', icon: faArrowRight },
  { value: 'Line', icon: faMinus },
  { value: 'Text', icon: faFont },
  { value: 'Undo', icon: faUndo },
  { value: 'Redo', icon: faRedo },
];

export type SelectedItem = {
  id: string;
  type: string;
} | null;

const DiagramBoard: React.FC<Props> = ({ imagePath, isClosed, setIsClosed }) => {
  const { token } = theme.useToken();
  const { onSetShapes, onSetInputPosition } = useContext(CanvasShapesContext);
  const {
    tool,
    isReset,
    customisation,
    onSetTool,
    onReset,
    onSetCustomisation,
    selectedItem,
    onSetSelectedItem,
    historyItems,
    onSetHistoryItems,
    historyStep,
    onSetHistoryStep,
  } = useContext(CanvasBoardContext);
  const { onSetKeypress } = useContext(CanvasEventsContext);

  useEffect(() => {
    if (isReset) {
      onSetTool(ToolName.Selector);
      onSetSelectedItem(null);
      onSetCustomisation(defaultCustomisation);
      onSetHistoryItems([]);
      onSetHistoryStep(0);
      onSetInputPosition(hideInputPosition);

      onSetShapes(shapesInitialState);
      onReset(false);
    }
  }, [isReset, selectedItem]);

  useEffect(() => {
    if (isClosed) {
      onReset(true);
      setIsClosed();
    }
  }, [isClosed]);

  const handleSave = () => {
    console.log('historyStep', historyStep);
    console.log('historyItems', historyItems);
  };

  const renderBoardToolBar = (
    <div className="flex">
      <div className="w-52" />
      <div className="flex justify-around w-3/5">
        <Radio.Group
          defaultValue={tool}
          buttonStyle="solid"
          onChange={(e) => {
            const { value } = e.target;

            if (value === 'Undo') {
              return onSetKeypress('Undo');
            } else if (value === 'Redo') {
              return onSetKeypress('Redo');
            } else if (
              value === ToolName.Text ||
              value === ToolName.Pen ||
              value === ToolName.Eraser
            ) {
              onSetCustomisation({ ...customisation, opacity: 1 });
            } else {
              onSetCustomisation({ ...customisation, opacity: 0.5 });
            }
            onSetTool(value);
            onSetSelectedItem(null);
          }}
          value={tool}
        >
          {tools.map((tool) => {
            return (
              <Radio.Button value={tool.value} key={tool.value}>
                <FontAwesomeIcon icon={tool.icon} />
              </Radio.Button>
            );
          })}
        </Radio.Group>
        <div>
          <Button
            icon={<FontAwesomeIcon icon={faRefresh} className="mr-2" />}
            className="mr-1"
            style={{ color: token.colorError, background: token.colorFillQuaternary }}
            onClick={() => onReset(true)}
          >
            Reset
          </Button>
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faSave} className="mr-2" />}
            onClick={() => handleSave()}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {renderBoardToolBar}
      <DrawingCanvas imagePath={imagePath} isClosed={isClosed} />
    </>
  );
};

export default DiagramBoard;
