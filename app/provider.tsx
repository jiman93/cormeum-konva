'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CanvasBoardProvider from 'store/providers/canvasBoard';
import CanvasEventsProvider from 'store/providers/canvasEvents';
import CanvasShapesProvider from 'store/providers/canvasShapes';

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CanvasEventsProvider>
          <CanvasBoardProvider>
            <CanvasShapesProvider>{children}</CanvasShapesProvider>
          </CanvasBoardProvider>
        </CanvasEventsProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
