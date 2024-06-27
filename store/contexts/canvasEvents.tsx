import { KeypressType } from 'components/DiagramEditor/diagramCanvas';
import { createContext } from 'react';

export type MousePosition = {
  x: number;
  y: number;
} | null;

type CanvasEventsContext = {
  position: MousePosition;
  onSetPosition: (p: MousePosition) => void;
  keypress: KeypressType;
  onSetKeypress: (k: KeypressType) => void;
};

const CanvasEventsContextInitialValue: CanvasEventsContext = {
  position: null,
  onSetPosition: () => {},
  keypress: '',
  onSetKeypress: () => {},
};

export const CanvasEventsContext = createContext<CanvasEventsContext>(
  CanvasEventsContextInitialValue
);
