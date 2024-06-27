'use client';

import { useContext } from 'react';
import _ from 'lodash';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-konva';
import { ToolName, ToolValue } from './diagramBoard';
import { CanvasBoardContext } from 'store/contexts/canvasBoard';
import { nanoid } from 'nanoid';
import { CanvasEventsContext } from 'store/contexts/canvasEvents';
import { CanvasShapesContext } from 'store/contexts/canvasShapes';
export interface Lines {
  tool: ToolValue;
  points: number[];
  fill?: string;
  strokeWidth?: number;
  opacity?: number;
}

export interface Draw {
  id: string;
  className: ToolValue;
  line: Lines;
}

type Props = {
  onContextMenu: (e: Konva.KonvaEventObject<MouseEvent>) => void;
};

type ItemProps = {
  lines: Lines[];
  isSelected: boolean;
  onSelect: () => void;
  onContextMenu: (e: Konva.KonvaEventObject<MouseEvent>) => void;
};

const FreeDrawTool: React.FC<Props> = ({ onContextMenu }) => {
  const { keypress, onSetKeypress } = useContext(CanvasEventsContext);
  const {
    stageRef,
    tool,
    customisation,
    isReset,
    historyItems,
    onSetHistoryItems,
    historyStep,
    onSetHistoryStep,
  } = useContext(CanvasBoardContext);
  const { shapes, onSetShapes } = useContext(CanvasShapesContext);

  const isDrawing = useRef(false);

  // WARNING - Must use both local state and context to make it work properly!
  /**
   * Local state - to handle the drawings
   * Context state - to manage the drawing items from board perspective
   */
  const [lines, onSetLines] = useState<Lines[]>([]);

  useEffect(() => {
    if (isReset) {
      onSetLines([]);
    }
  }, [isReset]);

  const selectedTool = tool === 'Pen' || tool === 'Eraser';

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // check isDrawing current to avoid unintended multiple triggers
    if (!selectedTool || isDrawing.current) return;
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;

    const newLine = {
      tool,
      points: [pos.x, pos.y],
      strokeWidth: customisation.strokeWidth,
      opacity: customisation.opacity,
      fill: customisation.fill,
    };

    onSetLines([...lines, newLine]);

    const id = nanoid();
    // initialising new draw item
    const newDraw: Draw = {
      id,
      className: ToolName.Draw,
      line: newLine,
    };

    const currentshapes = [...shapes.draws, newDraw];

    const step = historyStep + 1;
    const currentItems = historyItems.slice(0, step - 1);

    onSetShapes({ draws: currentshapes });
    onSetHistoryItems([...currentItems, { name: ToolName.Draw, values: currentshapes }]);
    onSetHistoryStep(step);
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!selectedTool) return;
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    let lastLine: Lines = lines[lines.length - 1];
    // add point
    if (!lastLine || !point) return;
    const newPosition = [point.x, point?.y] as number[];
    lastLine.points = lastLine.points.concat(newPosition);
    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    onSetLines(lines.concat());
  };

  const handleMouseUp = () => {
    if (!selectedTool) return;
    isDrawing.current = false;
  };

  useEffect(() => {
    const stage = stageRef?.current;
    if (!stage) return;

    stage.on('mousedown touchstart', handleMouseDown);
    stage.on('mousemove touchmove', handleMouseMove);
    stage.on('mouseup touchup', handleMouseUp);

    return () => {
      stage.off('mousedown touchstart', handleMouseDown);
      stage.off('mousemove touchmove', handleMouseMove);
      stage.off('mouseup touchup', handleMouseUp);
    };
  }, [stageRef, tool, isDrawing, shapes, lines]);

  const handleKeypress = () => {
    if (keypress === 'Undo') {
      const step = historyStep - 1;
      const items = historyItems[step - 1];
      const currentItems = historyItems.slice(0, step - 1);

      // we assume step 0 is an unadulterated canvas
      if (step < 1) {
        onSetHistoryStep(0);
        onSetShapes({ draws: [] });
        return;
      }

      if (!items || !items.values[0]) return;

      const values = items.values as Draw[];

      if (items.name !== ToolName.Draw) {
        const lastValues = _.findLast(currentItems, (v) => v.name === ToolName.Draw);
        if (lastValues) {
          const values = lastValues.values as Draw[];
          onSetShapes({ draws: values });
        } else {
          onSetShapes({ draws: [] });
        }
        return;
      }

      onSetHistoryStep(step);
      onSetShapes({ draws: values });
      return;
    }

    if (keypress === 'Redo') {
      const step = historyStep + 1;
      const items = historyItems[step - 1];

      if (!items || !items.values[0]) return;

      const values = items.values as Draw[];

      if (items.name === ToolName.Draw) {
        onSetHistoryStep(step);
        onSetShapes({ draws: values });
      }
    }
  };

  useEffect(() => {
    handleKeypress();
    onSetKeypress('');
  }, [keypress]);

  return (
    <>
      {shapes.draws.map(({ line }, i) => {
        if (!line) return;
        return (
          <Line
            onContextMenu={onContextMenu}
            key={i}
            points={line.points}
            stroke={line.fill}
            strokeWidth={line.strokeWidth}
            opacity={line.opacity}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={line.tool === 'Eraser' ? 'destination-out' : 'source-over'}
          />
        );
      })}
    </>
  );
};

export default FreeDrawTool;
