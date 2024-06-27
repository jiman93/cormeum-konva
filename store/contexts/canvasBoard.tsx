'use client';

import { createContext } from 'react';
import Konva from 'konva';
import { SelectedItem, ToolValue } from 'components/DiagramEditor/diagramBoard';
import { Customisation, HistoryItem } from 'store/providers/canvasBoard';

type CanvasBoardContext = {
  stageRef: React.RefObject<Konva.Stage> | null;
  tool: ToolValue;
  onSetTool: (t: ToolValue) => void;
  isReset: boolean;
  onReset: (r: boolean) => void;
  customisation: Customisation;
  onSetCustomisation: (s: Customisation) => void;
  copyShape: any;
  onSetCopyShape: (s: any) => void;
  selectedItem: SelectedItem;
  onSetSelectedItem: (b: SelectedItem) => void;
  isTransforming: boolean;
  onSetIsTransforming: (b: boolean) => void;
  historyItems: HistoryItem[];
  onSetHistoryItems: (h: HistoryItem[] | []) => void;
  historyStep: number;
  onSetHistoryStep: (h: number) => void;
};

const CanvasBoardContextInitialValue: CanvasBoardContext = {
  stageRef: null,
  // @ts-ignore : ReferenceError: Cannot access 'ToolName' before initialization
  tool: '',
  onSetTool: () => {},
  isReset: false,
  onReset: () => {},
  customisation: {},
  onSetCustomisation: () => {},
  copyShape: null,
  onSetCopyShape: () => {},
  selectedItem: null,
  onSetSelectedItem: () => {},
  isTransforming: false,
  onSetIsTransforming: () => {},
  historyItems: [],
  onSetHistoryItems: () => {},
  historyStep: 0,
  onSetHistoryStep: () => {},
};

export const CanvasBoardContext = createContext<CanvasBoardContext>(CanvasBoardContextInitialValue);
