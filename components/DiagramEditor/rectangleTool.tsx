'use client';

import Konva from 'konva';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Rect, Transformer } from 'react-konva';
import { CanvasBoardContext } from 'store/contexts/canvasBoard';
import { CanvasEventsContext } from 'store/contexts/canvasEvents';
import { CanvasShapesContext } from 'store/contexts/canvasShapes';
import { defaultCustomisation } from 'store/providers/canvasBoard';
import { ToolName } from './diagramBoard';

type Props = {
  onContextMenu: (e: Konva.KonvaEventObject<MouseEvent>) => void;
};

type ItemProps = {
  rectProps: Rectangle;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (rect: Rectangle) => void;
  onContextMenu: (e: Konva.KonvaEventObject<MouseEvent>) => void;
};

export interface Rectangle {
  className: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  opacity?: number;
  id: string;
}

const RectangleTool: React.FC<Props> = ({ onContextMenu }) => {
  const { keypress, onSetKeypress, position } = useContext(CanvasEventsContext);
  const { shapes, onSetShapes } = useContext(CanvasShapesContext);
  const {
    stageRef,
    tool,
    onSetTool,
    isReset,
    customisation,
    selectedItem,
    onSetSelectedItem,
    onSetCopyShape,
    copyShape,
    historyItems,
    onSetHistoryItems,
    historyStep,
    onSetHistoryStep,
  } = useContext(CanvasBoardContext);

  const isDrawing = useRef(false);
  const initialPos = { x: 0, y: 0 };

  const [startPos, setStartPos] = useState(initialPos);
  const [endPos, setEndPos] = useState(initialPos);

  const rectangleToolName = ToolName.Rect;
  const isRectangleTool = tool === rectangleToolName;
  const isSelected = selectedItem?.type === rectangleToolName;

  const onSetRectangles = (items: Rectangle[]) => {
    const step = historyStep + 1;
    // to get only items before current step. i.e if items = 3, step = 2. new item should replace the third item.
    const currentItems = historyItems.slice(0, step - 1);
    onSetShapes({ rectangles: items });
    onSetHistoryItems([...currentItems, { name: rectangleToolName, values: items }]);
    onSetHistoryStep(step);
  };

  const handleKeypress = () => {
    const { rectangles } = shapes;

    if (keypress === 'Copy') {
      if (!isSelected) return;
      const found = rectangles.find((r) => r.id === selectedItem?.id);
      return onSetCopyShape(found);
    }

    if (keypress === 'Paste') {
      const copiedShape = _.clone(copyShape) as Rectangle;

      if (copiedShape && copiedShape.className === ToolName.Rect) {
        copiedShape.id = nanoid();
        if (position) {
          copiedShape.x = position.x;
          copiedShape.y = position.y;
        }
        onSetSelectedItem({ id: copiedShape.id, type: copiedShape.className });
        return onSetRectangles([...rectangles, copiedShape]);
      }
    }

    if (keypress === 'Cut') {
      if (!isSelected) return;

      const found = rectangles.find((r) => r.id === selectedItem?.id);
      onSetCopyShape(found);

      const filtered = rectangles.filter((r) => r.id !== found?.id);
      return onSetRectangles(filtered);
    }

    if (keypress === 'Undo') {
      const step = historyStep - 1;
      const items = historyItems[step - 1];
      const currentItems = historyItems.slice(0, step - 1);

      // we assume step 0 is an unadulterated canvas
      if (step < 1) {
        onSetHistoryStep(0);
        onSetShapes({ rectangles: [] });
        return;
      }

      if (!items || !items.values[0]) return;

      const values = items.values as Rectangle[];

      if (items.name !== rectangleToolName) {
        const lastValues = _.findLast(currentItems, (v) => v.name === rectangleToolName);
        if (lastValues) {
          const rects = lastValues.values as Rectangle[];
          onSetShapes({ rectangles: rects });
        } else {
          onSetShapes({ rectangles: [] });
        }
        return;
      }

      onSetHistoryStep(step);
      onSetShapes({ rectangles: values });
      return;
    }

    if (keypress === 'Redo') {
      const step = historyStep + 1;
      const items = historyItems[step - 1];

      if (!items || !items.values[0]) return;

      const values = items.values as Rectangle[];

      if (items.name === rectangleToolName) {
        onSetHistoryStep(step);
        onSetShapes({ rectangles: values });
      }
      return;
    }

    if (keypress === 'Delete') {
      const filtered = rectangles.filter((r) => r.id !== selectedItem?.id);
      return onSetRectangles(filtered);
    }

    if (keypress === 'Duplicate') {
      const found = rectangles.find((r) => r.id === selectedItem?.id);

      if (found) {
        const copy = _.clone(found);
        copy.id = nanoid();
        copy.x = found.x + 10;
        copy.y = found.y + 10;
        onSetRectangles([...rectangles, copy]);
        onSetSelectedItem({ type: ToolName.Rect, id: copy.id });
      }
      return;
    }
  };

  useEffect(() => {
    const { rectangles } = shapes;

    if (isSelected) {
      const mapped = rectangles.map((r) => {
        if (r.id === selectedItem.id) {
          r.opacity = customisation.opacity;
          r.fill = customisation.fill;
        }
        return r;
      });
      onSetRectangles(mapped);
    }
  }, [customisation]);

  useEffect(() => {
    handleKeypress();
    onSetKeypress('');
  }, [keypress, copyShape]);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (isRectangleTool) {
      isDrawing.current = true;
      setStartPos({ x: e.evt.offsetX, y: e.evt.offsetY });
      setEndPos({ x: e.evt.offsetX, y: e.evt.offsetY });
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isRectangleTool || !isDrawing.current) return;
    setEndPos({ x: e.evt.offsetX, y: e.evt.offsetY });
  };

  const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isRectangleTool) return;
    const { rectangles } = shapes;

    const width = endPos.x - startPos.x;
    const height = endPos.y - startPos.y;
    const rect = {
      id: nanoid(),
      className: ToolName.Rect,
      x: startPos.x,
      y: startPos.y,
      width,
      height,
      fill: customisation.fill,
      opacity: customisation.opacity,
    };

    // onSelect will trigger this event, we don't want to create when modifying
    if (width) {
      const newState = [...rectangles, rect];
      onSetRectangles(newState);

      onSetSelectedItem({ id: rect.id, type: ToolName.Rect });
      onSetTool('Selector');
    }

    isDrawing.current = false;
  };

  useEffect(() => {
    if (isReset) {
      setStartPos(initialPos);
      setEndPos(initialPos);
    }
  }, [isReset]);

  useEffect(() => {
    if (!isRectangleTool) {
      isDrawing.current = false;

      if (startPos.x || startPos.y) {
        setStartPos(initialPos);
        setEndPos(initialPos);
      }
    }

    const stage = stageRef?.current;
    if (!stage) return;

    stage.on('mousedown touchstart', handleMouseDown);
    stage.on('mousemove touchmove', handleMouseMove);
    stage.on('mouseup touchend', handleMouseUp);

    return () => {
      stage.off('mousedown touchstart', handleMouseDown);
      stage.off('mousemove touchmove', handleMouseMove);
      stage.off('mouseup touchend', handleMouseUp);
    };
  }, [isDrawing, startPos, endPos, stageRef, tool, isSelected]);

  return (
    <>
      {isDrawing && (
        <Rect
          x={startPos.x}
          y={startPos.y}
          width={endPos.x - startPos.x}
          height={endPos.y - startPos.y}
          fill="#e0e0e3"
          opacity={0.2}
          strokeWidth={defaultCustomisation.strokeWidth}
        />
      )}
      {shapes.rectangles.map((rect, i) => (
        <RectangleItem
          key={i}
          rectProps={rect}
          isSelected={rect.id === selectedItem?.id}
          onSelect={() => {
            // if (tool !== toolName.selector) return;
            onSetTool('Selector');
            /**
             * onSetCustomisation will cause circular changes
             */
            // onSetCustomisation({ ...customisation, opacity: rect.opacity, fill: rect.fill });
            onSetSelectedItem({ id: rect.id, type: rect.className });
          }}
          onChange={(changedVal: Rectangle) => {
            if (!isSelected) return;
            const rects = shapes.rectangles.slice();
            rects[i] = changedVal;
            // onSetRectangles(rects);
            onSetRectangles(rects);
          }}
          onContextMenu={onContextMenu}
        />
      ))}
    </>
  );
};

const RectangleItem: React.FC<ItemProps> = ({
  rectProps,
  isSelected,
  onSelect,
  onChange,
  onContextMenu,
}) => {
  const { stageRef, onSetIsTransforming } = useContext(CanvasBoardContext);
  const rectRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected) {
      if (!rectRef?.current) return;
      // we need to attach transformer manually
      trRef?.current?.nodes([rectRef?.current]);
      trRef?.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    if (!rectRef || !stageRef) return;

    rectRef.current?.on('mouseenter', function () {
      if (!stageRef.current) return;
      stageRef.current.container().style.cursor = 'move';
    });

    rectRef.current?.on('mouseleave', function () {
      if (!stageRef.current) return;
      stageRef.current.container().style.cursor = 'default';
    });
  }, [rectRef]);

  return (
    <>
      <Rect
        onContextMenu={onContextMenu}
        onClick={onSelect}
        onTap={onSelect}
        ref={rectRef}
        {...rectProps}
        draggable
        onDragStart={() => {
          onSelect();
          onSetIsTransforming(true);
        }}
        onDragEnd={(e) => {
          onChange({
            ...rectProps,
            x: e.target.x(),
            y: e.target.y(),
          });

          onSetIsTransforming(false);
        }}
        onTransformStart={() => {
          onSetIsTransforming(true);
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = rectRef.current;
          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...rectProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
          onSetIsTransforming(false);
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default RectangleTool;
