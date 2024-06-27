import { KeypressType } from 'components/DiagramEditor/diagramCanvas';
import { PropsWithChildren, useState } from 'react';
import { CanvasEventsContext, MousePosition } from 'store/contexts/canvasEvents';

const CanvasEventsProvider = ({ children }: PropsWithChildren) => {
  const [position, setPosition] = useState<MousePosition>(null);
  const [keypress, setKeypress] = useState<KeypressType>('');

  const onSetPosition = (p: MousePosition) => setPosition(p);
  const onSetKeypress = (k: KeypressType) => setKeypress(k);

  return (
    <CanvasEventsContext.Provider value={{ position, onSetPosition, keypress, onSetKeypress }}>
      {children}
    </CanvasEventsContext.Provider>
  );
};

export default CanvasEventsProvider;
