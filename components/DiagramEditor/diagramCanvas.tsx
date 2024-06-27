'use client';

import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import Konva from 'konva';
import { Input, InputRef } from 'antd';
import { Stage, Layer, Image } from 'react-konva';
import _ from 'lodash';

import SideBoardBox from './sideBoardBox';
import ContextMenu from './contextMenu';
import { CanvasEventsContext } from 'store/contexts/canvasEvents';
import { CanvasBoardContext } from 'store/contexts/canvasBoard';
import { CanvasShapesContext } from 'store/contexts/canvasShapes';
import RectangleTool from './rectangleTool';
import FreeDrawTool from './freeDrawTool';
import TextTool from './textTool';
import { keypressHandler } from 'lib/keypress';

type Prop = {
  imagePath: string;
  isClosed: boolean;
};

export type KeypressType =
  | 'Copy'
  | 'Cut'
  | 'Paste'
  | 'Undo'
  | 'Redo'
  | 'CopyClipboard'
  | 'Duplicate'
  | 'Delete'
  | '';

export type SelectedContextMenu = {
  type: string;
  position: { x: number; y: number };
};

const defaultStageSize = { height: 850, width: 600 };

const DiagramCanvas: React.FC<Prop> = ({ imagePath, isClosed }) => {
  const imageRef = useRef<Konva.Image>(null);
  const inputRef = useRef<InputRef>(null);

  const { onSetPosition, position, onSetKeypress } = useContext(CanvasEventsContext);
  const { stageRef, customisation, onSetTool, selectedItem, onSetSelectedItem, isTransforming } =
    useContext(CanvasBoardContext);
  const { inputPosition, inputEvent, onSetInputEvent, onSetIsInputEnter } =
    useContext(CanvasShapesContext);

  const [selectedContextMenu, setSelectedContextMenu] = useState<SelectedContextMenu | null>(null);
  const [stageSize, setStageSize] = useState(defaultStageSize);

  const handleContextMenu = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
    const x = e.evt.offsetX;
    const y = e.evt.offsetY;
    const type = e.target.className || '';

    onSetTool('Selector');
    setSelectedContextMenu({ type, position: { x, y } });
  };

  const debounced = useCallback(
    _.throttle((x, y) => {
      onSetPosition({ x, y });
    }, 300),
    []
  );

  useEffect(() => {
    const stage = stageRef?.current;
    if (!stage) return;

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (e.target.className !== selectedItem?.type && !isTransforming) {
        onSetSelectedItem(null);
      }
      setSelectedContextMenu(null);
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
      const x = e.evt.offsetX;
      const y = e.evt.offsetY;
      debounced(x, y);
    };

    stage.on('mousedown touchstart', handleMouseDown);
    stage.on('mousemove', handleMouseMove);
    stage.on('contextmenu', handleContextMenu);

    return () => {
      stage.off('mousedown touchstart', handleMouseDown);
      stage.on('mousemove', handleMouseMove);
      stage.off('contextmenu', handleContextMenu);
    };
  }, [stageRef?.current, isTransforming, selectedItem, position]);

  useEffect(() => {
    if (!imageRef.current) return;

    const image = imageRef.current;
    const height = image.getHeight();
    const width = image.getWidth();

    if (height && width) {
      setStageSize({ height, width });
    }
  }, [imageRef.current, isClosed]);

  const getImage = () => {
    if (!imagePath) return;
    const image = new window.Image();
    // image.onload = function () {
    //   const canvas = document.createElement('canvas');
    //   const ctx = canvas.getContext('2d');
    //   const dataURL = canvas.toDataURL();
    // };
    image.src = imagePath;
    return image;
  };

  const renderTextInput = (
    <Input
      ref={inputRef}
      value={inputRef?.current?.input?.value}
      onChange={() => onSetInputEvent('onChange')}
      onBlur={() => {
        if (inputEvent !== 'None') {
          onSetInputEvent('onBlur');
          onSetIsInputEnter(false);
        }
      }}
      onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
        onSetInputEvent('onKeyDown');
        if (event.key === 'Enter') {
          onSetIsInputEnter(true);
        }
      }}
      style={{
        fontSize: customisation.fontSize,
        position: 'absolute',
        left: inputPosition.x,
        top: inputPosition.y,
        width: 400,
        zIndex: 999,
      }}
    />
  );

  return (
    <div className="flex">
      <SideBoardBox />
      <div
        className="relative px-4 py-2"
        tabIndex={1}
        onKeyDown={(e: any) => keypressHandler(e, onSetKeypress)}
      >
        <ContextMenu selectedContextMenu={selectedContextMenu} />
        {renderTextInput}
        <Stage ref={stageRef} height={stageSize.height} width={stageSize.width}>
          <Layer>
            <Image image={getImage()} ref={imageRef} />
          </Layer>
          <Layer>
            <FreeDrawTool onContextMenu={handleContextMenu} />
            <RectangleTool onContextMenu={handleContextMenu} />
            <TextTool onContextMenu={handleContextMenu} inputRef={inputRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default DiagramCanvas;
