import { KeypressType } from 'components/DiagramEditor/diagramCanvas';

export const keypressHandler = (e: KeyboardEvent, cb: (k: KeypressType) => void) => {
  if (
    e.key === 'c' &&
    ((navigator.userAgent.match(/Mac/i) && e.metaKey) ||
      (!navigator.userAgent.match(/Mac/i) && e.ctrlKey))
  ) {
    if (navigator.userAgent.match(/Mac/i)) {
      cb('Copy');
    } else {
      cb('Copy');
    }
  }

  if (e.key === 'x' && e.metaKey) cb('Cut');

  if (e.key === 'v' && e.metaKey) cb('Paste');

  if (e.key === 'z' && e.metaKey) cb('Undo');

  if (e.key === 'z' && e.metaKey && e.shiftKey) cb('Redo');

  if (e.key === 'Backspace') cb('Delete');

  if (e.key === 'd' && e.metaKey) cb('Duplicate');
};
