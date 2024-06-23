import { Undo } from 'lucide-react';
import { useRoute } from '../../../hooks/use-route';

export function PreviousRouteAction() {
  const { previous, previousRoute } = useRoute();

  return (
    <button
      disabled={!previousRoute}
      onClick={() => previous()}
      title={`${!!previousRoute ? `Go to ${previousRoute.name} route` : 'Go to previous route'}`}
      className="group w-8 h-8 rounded-md cursor-pointer hover:enabled:bg-gray-100 flex items-center justify-center"
    >
      <Undo className="w-5 h-5 stroke-gray-600 group-hover:group-enabled:stroke-gray-800 group-disabled:stroke-gray-400" />
    </button>
  );
}
