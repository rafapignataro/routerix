import React, { useEffect, useState } from 'react';
import { DynamicIcon, IconName } from './icons';

type BaseNode = {
  name: string;
  route: string;
  icon: IconName;
};

type RootNode = BaseNode & {
  type: 'root';
  children: Record<string, RouteNode | ComponentNode>;
}

type RouteNode = BaseNode & {
  type: 'route';
  subType: 'container' | 'dynamic' | 'default';
  children: Record<string, RouteNode | ComponentNode>;
}

type ComponentNode = BaseNode & {
  type: 'component';
  subType: 'page' | 'layout' | 'not-found';
};

type Schema = RootNode | RouteNode | ComponentNode;

interface GenerationSchema {
  createdAt: string;
  generationTime: number;
  schema: Schema;
}

const App: React.FC = () => {
  const [generation, setGeneration] = useState<GenerationSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        // @ts-ignore
        const schemaJson = await import('./routes.json');

        setGeneration(schemaJson.default as unknown as GenerationSchema);
      } catch (error) {
        console.error('Failed to load routes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRoutes();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!generation) return <div>Failed to load generation</div>;

  return (
    <div>
      <div className="px-4 border-b-[1px] border-gray-200">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="py-4 font-bold text-2xl">Node Routes</h1>
        </div>
      </div>
      <div className="px-4">
        <div className="max-w-screen-xl mx-auto border-gray-200 py-10">
          <h2 className="font-bold text-2xl pb-4">Route Tree</h2>
          {generation && <SchemaComponent schema={generation.schema} />}
        </div>
      </div>
    </div>
  );
};

export default App;

interface SchemaComponentProps {
  schema: Schema;
}

function SchemaComponent({ schema }: SchemaComponentProps) {
  if (schema.type === 'root' || schema.type === 'route') return (
    <details className="group w-full rounded-md open:rounded-xl">
      <summary className="flex flex-col py-1 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DynamicIcon name="chevronRight" className="w-5 h-5 group-open:rotate-90 transition-all" />
            <div className="bg-gray-200 p-2 flex items-center justify-center rounded-md">
              <DynamicIcon name={schema.icon} className="h-4 w-4 stroke-2 text-gray-400" />
            </div>
            <p className="text-lg font-bold">{schema.name}</p>
            <div className="bg-blue-700 px-1 rounded-full font-bold text-white text-xs">{schema.type}</div>
          </div>
          <span className="text-gray-600">{schema.route}</span>
        </div>
      </summary>
      {schema.children && !!Object.values(schema.children).length && (
        <ul className="ml-4">
          {Object.entries(schema.children).map(([key, childNode]) => (
            <li key={key}>
              <SchemaComponent schema={childNode} />
            </li>
          ))}
        </ul>
      )}
    </details>
  )

  return (
    <div className="w-full py-1 pr-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5"></div>
          <div className="bg-gray-200 p-2 flex items-center justify-center rounded-md">
            <DynamicIcon name={schema.icon} className="h-4 w-4 stroke-2 text-gray-400" />
          </div>
          <p className="text-lg font-bold">{schema.name}</p>
          <div className="bg-blue-700 px-1 rounded-full font-bold text-white text-xs">{schema.type}</div>
        </div>
        <span className="text-gray-600">{schema.route}</span>
      </div>
    </div>
  );
};