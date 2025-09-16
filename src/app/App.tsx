import { QueryProvider } from './providers/QueryProvider';
import { AppRouter } from './providers/AppRouter';

export function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}
