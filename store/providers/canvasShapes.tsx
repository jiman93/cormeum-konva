import { Draw } from 'components/DiagramEditor/freeDrawTool';
import { Rectangle } from 'components/DiagramEditor/rectangleTool';
import { Text } from 'components/DiagramEditor/textTool';
import { PropsWithChildren, useReducer, useState } from 'react';
import {
  CanvasShapesContext,
  hideInputPosition,
  shapesInitialState,
} from 'store/contexts/canvasShapes';

export interface ShapesState {
  rectangles: Rectangle[];
  draws: Draw[];
  texts: Text[];
}

export type TextInputEvent = 'onChange' | 'onBlur' | 'onKeyDown' | 'None';

const CanvasShapesProvider = ({ children }: PropsWithChildren) => {
  const [shapes, setShapes] = useReducer(
    (state: ShapesState, newState: Partial<ShapesState>) => ({
      ...state,
      ...newState,
    }),
    shapesInitialState
  );

  const [inputPosition, setInputPosition] = useState(hideInputPosition);
  const [inputEvent, setInputEvent] = useState<TextInputEvent | ''>('');
  const [isInputEnter, setIsInputEnter] = useState(false);

  const onSetShapes = (s: Partial<ShapesState>) => setShapes(s);
  const onSetInputPosition = (i: typeof hideInputPosition) => setInputPosition(i);
  const onSetInputEvent = (i: TextInputEvent | '') => setInputEvent(i);
  const onSetIsInputEnter = (i: boolean) => setIsInputEnter(i);

  return (
    <CanvasShapesContext.Provider
      value={{
        shapes,
        onSetShapes,
        inputPosition,
        onSetInputPosition,
        inputEvent,
        onSetInputEvent,
        isInputEnter,
        onSetIsInputEnter,
      }}
    >
      {children}
    </CanvasShapesContext.Provider>
  );
};

export default CanvasShapesProvider;
