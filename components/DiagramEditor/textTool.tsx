'use client';

import { InputRef } from 'antd';
import Konva from 'konva';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Text, Transformer } from 'react-konva';
import { CanvasBoardContext } from 'store/contexts/canvasBoard';
import { CanvasEventsContext } from 'store/contexts/canvasEvents';
import { CanvasShapesContext, hideInputPosition } from 'store/contexts/canvasShapes';
import { ToolName, ToolValue } from './diagramBoard';

type Props = {
  inputRef: React.RefObject<InputRef>;
  onContextMenu: (e: Konva.KonvaEventObject<MouseEvent>) => void;
};

type ItemProps = {
  textProps: Text;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (text: Text) => void;
  onContextMenu: (e: Konva.KonvaEventObject<MouseEvent>) => void;
};

export interface Text {
  id: string;
  className: ToolValue;
  x: number;
  y: number;
  text: string;
  fontSize?: number;
  fill?: string;
  opacity?: number;
}

const TextTool: React.FC<Props> = ({ inputRef, onContextMenu }) => {
  const { keypress, onSetKeypress, position } = useContext(CanvasEventsContext);
  const {
    shapes,
    onSetShapes,
    inputEvent,
    onSetInputEvent,
    inputPosition,
    onSetInputPosition,
    isInputEnter,
  } = useContext(CanvasShapesContext);
  const {
    stageRef,
    tool,
    onSetTool,
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
  const [textPosition, setTextPosition] = useState(hideInputPosition);

  const textToolName = ToolName.Text;
  const isTextTool = tool === 'Text';
  const isSelected = selectedItem?.type === ToolName.Text;
  const inputText = inputRef.current?.input?.value;

  const onSetTexts = (items: Text[]) => {
    const step = historyStep + 1;
    // to get only items before current step. i.e if items = 3, step = 2. new item should replace the third item.
    const currentItems = historyItems.slice(0, step - 1);
    onSetShapes({ texts: items });
    onSetHistoryItems([...currentItems, { name: textToolName, values: items }]);
    onSetHistoryStep(step);
  };

  useEffect(() => {
    const { texts } = shapes;

    if (isSelected) {
      const mapped = texts.map((t) => {
        if (t.id === selectedItem.id) {
          t.opacity = customisation.opacity;
          t.fill = customisation.fill;
          t.fontSize = customisation.fontSize;
        }
        return t;
      });
      onSetTexts(mapped);
    }
  }, [customisation]);

  const handleKeypress = () => {
    const { texts } = shapes;

    if (keypress === 'Copy') {
      if (!isSelected) return;

      const found = texts.find((r) => r.id === selectedItem?.id);
      return onSetCopyShape(found);
    }

    if (keypress === 'Paste') {
      const copiedShape = _.clone(copyShape) as Text;

      if (copiedShape && copiedShape.className === ToolName.Text) {
        copiedShape.id = nanoid();
        if (position) {
          copiedShape.x = position.x;
          copiedShape.y = position.y;
        }
        onSetSelectedItem({ id: copiedShape.id, type: copiedShape.className });
        return onSetTexts([...texts, copiedShape]);
      }
    }

    if (keypress === 'Cut') {
      if (!isSelected) return;

      const found = texts.find((r) => r.id === selectedItem?.id);
      onSetCopyShape(found);

      const filtered = texts.filter((r) => r.id !== found?.id);
      return onSetTexts(filtered);
    }

    if (keypress === 'Delete') {
      const filtered = texts.filter((r) => r.id !== selectedItem?.id);
      return onSetShapes({ texts: filtered });
    }

    if (keypress === 'Duplicate') {
      const found = texts.find((r) => r.id === selectedItem?.id);

      if (found) {
        const copy = _.clone(found);
        copy.id = nanoid();
        copy.x = found.x + 10;
        copy.y = found.y + 10;
        onSetTexts([...texts, copy]);
        onSetSelectedItem({ type: found.className, id: copy.id });
      }
      return;
    }

    if (keypress === 'Undo') {
      const step = historyStep - 1;
      const items = historyItems[step - 1];
      const currentItems = historyItems.slice(0, step - 1);

      // we assume step 0 is an unadulterated canvas
      if (step < 1) {
        onSetHistoryStep(0);
        onSetShapes({ texts: [] });
        return;
      }

      if (!items || !items.values[0]) return;

      const values = items.values as Text[];

      if (items.name !== textToolName) {
        const lastValues = _.findLast(currentItems, (v) => v.name === textToolName);
        if (lastValues) {
          const texts = lastValues.values as Text[];
          onSetShapes({ texts: texts });
        } else {
          onSetShapes({ texts: [] });
        }
        return;
      }

      onSetHistoryStep(step);
      onSetShapes({ texts: values });
      return;
    }

    if (keypress === 'Redo') {
      const step = historyStep + 1;
      const items = historyItems[step - 1];

      if (!items || !items.values[0]) return;

      const values = items.values as Text[];

      if (items.name === textToolName) {
        onSetHistoryStep(step);
        onSetShapes({ texts: values });
      }
      return;
    }
  };

  useEffect(() => {
    handleKeypress();
    onSetKeypress('');
  }, [keypress, copyShape]);

  const setAndClearInput = () => {
    if (!inputText || isSelected) return;

    const id = nanoid();

    const newText: Text = {
      id,
      className: ToolName.Text,
      x: textPosition.x,
      y: textPosition.y,
      text: inputText,
      fontSize: customisation.fontSize,
      opacity: customisation.opacity,
      fill: customisation.fill,
    };

    onSetTexts([...shapes.texts, newText]);
    onSetSelectedItem({ type: newText.className, id: newText.id });
    onSetTool('Selector');

    if (inputRef?.current.input) {
      inputRef.current.input.value = '';
    }

    onSetInputPosition(hideInputPosition);
  };

  const handleInputBlur = () => {
    // When the input loses focus, remove it from the canvas
    if (inputPosition !== hideInputPosition) {
      setAndClearInput();
      onSetInputPosition(hideInputPosition);
    }
  };

  const handleInputKeyDown = () => {
    // When the user presses Enter, remove the input from the canvas
    if (inputPosition !== hideInputPosition) {
      setAndClearInput();
      onSetInputPosition(hideInputPosition);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    if (!isTextTool) {
      return onSetInputPosition(hideInputPosition);
    }

    if (inputPosition !== hideInputPosition) {
      if (inputEvent === 'onBlur') handleInputBlur();
      if (inputEvent === 'onKeyDown' && isInputEnter) handleInputKeyDown();
    }
  }, [tool, inputRef.current]);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isTextTool) return;
    if (inputText) return setAndClearInput();

    const { evt } = e;
    const x = evt.offsetX;
    const y = evt.offsetY;
    onSetInputEvent('None');
    onSetInputPosition({ x, y });
    setTextPosition({ x, y });
  };

  useEffect(() => {
    const stage = stageRef?.current;
    if (!stage) return;
    inputRef.current?.focus();

    stage.on('mousedown touchstart', handleMouseDown);

    return () => {
      stage.off('mousedown touchstart', handleMouseDown);
    };
  }, [stageRef, tool, inputRef.current]);

  return (
    <>
      {shapes.texts.map((item, i) => {
        return (
          <TextItem
            key={item.id}
            textProps={item}
            isSelected={item.id === selectedItem?.id}
            onSelect={() => {
              onSetSelectedItem({ id: item.id, type: item.className });
            }}
            onChange={(changedVal: Text) => {
              if (!isSelected) return;
              const textsSlice = shapes.texts.slice();
              textsSlice[i] = changedVal;
              onSetTexts(textsSlice);
            }}
            onContextMenu={onContextMenu}
          />
        );
      })}
    </>
  );
};

const TextItem: React.FC<ItemProps> = ({
  textProps,
  isSelected,
  onSelect,
  onChange,
  onContextMenu,
}) => {
  const { stageRef, onSetIsTransforming } = useContext(CanvasBoardContext);
  const textRef = useRef<Konva.Text>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected) {
      if (!textRef?.current) return;
      // we need to attach transformer manually
      trRef?.current?.nodes([textRef?.current]);
      trRef?.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    if (!textRef || !stageRef) return;

    textRef.current?.on('mouseenter', function () {
      if (!stageRef.current) return;
      stageRef.current.container().style.cursor = 'move';
    });

    textRef.current?.on('mouseleave', function () {
      if (!stageRef.current) return;
      stageRef.current.container().style.cursor = 'default';
    });
  }, [textRef]);

  return (
    <>
      <Text
        onContextMenu={onContextMenu}
        onClick={onSelect}
        onTap={onSelect}
        ref={textRef}
        {...textProps}
        draggable
        onDragStart={() => {
          onSelect();
          onSetIsTransforming(true);
        }}
        onDragEnd={(e) => {
          onChange({
            ...textProps,
            x: e.target.x(),
            y: e.target.y(),
          });
          onSetIsTransforming(false);
        }}
        onTransformStart={() => {
          onSetIsTransforming(true);
        }}
        onTransformEnd={(e) => {
          const node = textRef.current;
          if (!node) return;

          onChange({
            ...textProps,
            x: node.x(),
            y: node.y(),
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

export default TextTool;
