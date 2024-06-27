import { SelectedItem, ToolName, ToolValue } from 'components/DiagramEditor/diagramBoard';
import Konva from 'konva';
import { PropsWithChildren, useRef, useState } from 'react';
import { CanvasBoardContext } from 'store/contexts/canvasBoard';
import { Draw, Lines } from 'components/DiagramEditor/freeDrawTool';
import { Rectangle } from 'components/DiagramEditor/rectangleTool';
import { Text } from 'components/DiagramEditor/textTool';

export type Customisation = {
  strokeWidth?: 2 | 4 | 6 | 8;
  fill?: string;
  opacity?: number;
  fontSize?: number;
};

export const defaultCustomisation: Customisation = {
  strokeWidth: 2,
  fill: '#000000',
  opacity: 1,
  fontSize: 24,
};

export type HistoryItem = {
  name: ToolValue;
  values: Rectangle[] | Draw[] | Text[];
};
export type HistoryStep = {
  type: ToolValue;
  count: number;
};

const CanvasBoardProvider = ({ children }: PropsWithChildren) => {
  const stageRef = useRef<Konva.Stage>(null);
  const [tool, setTool] = useState<ToolValue>(ToolName.Selector);
  const [reset, setReset] = useState(false);
  const [customisation, setCustomisation] = useState(defaultCustomisation);

  const [isTransforming, setIsTransforming] = useState(false);
  const [copyShape, setCopyShape] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [historyStep, setHistoryStep] = useState(0);

  const onSetCopyShape = (s: any) => setCopyShape(s);
  const onSetSelectedItem = (s: SelectedItem) => setSelectedItem(s);
  const onSetIsTransforming = (s: boolean) => setIsTransforming(s);
  const onSetHistoryItems = (h: HistoryItem[]) => setHistoryItems(h);
  const onSetHistoryStep = (h: number) => setHistoryStep(h);

  const onSetTool = (t: ToolValue) => setTool(t);
  const onReset = (r: boolean) => setReset(r);
  const onSetCustomisation = (c: Customisation) => setCustomisation(c);

  return (
    <CanvasBoardContext.Provider
      value={{
        stageRef,
        tool,
        onSetTool,
        isReset: reset,
        onReset,
        customisation,
        onSetCustomisation,
        copyShape,
        onSetCopyShape,
        selectedItem,
        onSetSelectedItem,
        isTransforming,
        onSetIsTransforming,
        historyItems,
        onSetHistoryItems,
        historyStep,
        onSetHistoryStep,
      }}
    >
      {children}
    </CanvasBoardContext.Provider>
  );
};

export default CanvasBoardProvider;
