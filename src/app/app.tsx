import { Sidebar } from './components/Sidebar';
import { RoutePage } from './components/RoutePage';

export function App() {
  return (
    <div className="h-screen w-full flex items-start">
      <Sidebar />
      <RoutePage />
    </div>
  );
};