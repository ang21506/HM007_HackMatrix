import React, { createContext, useContext, useState } from 'react';
import clsx from 'clsx';

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
}
const TabsContext = createContext<TabsContextValue | null>(null);

export function Tabs({ defaultValue, className, children }: { defaultValue: string; className?: string; children: React.ReactNode }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx('rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700', className)}>{children}</div>;
}

export function TabsTrigger({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  const active = ctx.value === value;
  return (
    <button
      type="button"
      data-tab-trigger={value}
      onClick={() => ctx.setValue(value)}
      className={clsx(
        'px-3 text-sm rounded-md border transition-colors',
        active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
