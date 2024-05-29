import { useState, useEffect, createContext, ReactNode, useContext } from 'react';
import { Schema } from '../../types';

const SchemaContext = createContext<Schema>({} as Schema);

interface SchemaProviderProps {
  children: ReactNode;
}

export function SchemaProvider({ children }: SchemaProviderProps) {
  const [schema, setSchema] = useState<Schema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        // @ts-ignore
        const schemaJson = await import('../schema.json');

        setSchema(schemaJson.default as unknown as Schema);
      } catch (error) {
        console.error('Failed to load schema:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRoutes();
  }, []);

  if (loading) return null;

  if (!schema) return null;

  return (
    <SchemaContext.Provider value={schema}>
      {children}
    </SchemaContext.Provider>
  )
}

export function useSchema() {
  const context = useContext(SchemaContext);

  if (!context || !Object.keys(context).length) throw new Error(`${useSchema.name} can't be used outside of ${SchemaProvider.name}.`);

  return context;
}