import { createContext } from 'react';
import { ShapesState, TextInputEvent } from 'store/providers/canvasShapes';

type CanvasShapesContext = {
  shapes: ShapesState;
  onSetShapes: (s: Partial<ShapesState>) => void;
  inputPosition: typeof hideInputPosition;
  onSetInputPosition: (i: typeof hideInputPosition) => void;
  inputEvent: TextInputEvent | '';
  onSetInputEvent: (i: TextInputEvent | '') => void;
  isInputEnter: boolean;
  onSetIsInputEnter: (i: boolean) => void;
};

export const shapesInitialState = {
  rectangles: [],
  draws: [],
  texts: [],
};

export const hideInputPosition = { x: -1000, y: -1000 };

const CanvasShapesContextInitialValue: CanvasShapesContext = {
  shapes: shapesInitialState,
  onSetShapes: () => {},
  inputPosition: hideInputPosition,
  onSetInputPosition: () => {},
  inputEvent: '',
  onSetInputEvent: () => {},
  isInputEnter: false,
  onSetIsInputEnter: () => {},
};

export const CanvasShapesContext = createContext<CanvasShapesContext>(
  CanvasShapesContextInitialValue
);
