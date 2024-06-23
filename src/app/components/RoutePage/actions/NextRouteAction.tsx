import { Redo } from 'lucide-react';
import { useRoute } from '../../../hooks/use-route';

export function NextRouteAction() {
  const { next, nextRoute } = useRoute();

  return (
    <button
      disabled={!nextRoute}
      onClick={() => next()}
      title={`${!!nextRoute ? `Go to ${nextRoute.name} route` : 'Go to next route'}`}
      className="group w-8 h-8 rounded-md cursor-pointer hover:enabled:bg-gray-100 flex items-center justify-center"
    >
      <Redo className="w-5 h-5 stroke-gray-600 group-hover:group-enabled:stroke-gray-800 group-disabled:stroke-gray-400" />
    </button>
  );
}
