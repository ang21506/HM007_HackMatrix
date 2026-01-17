import React from 'react';
import clsx from 'clsx';

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx('rounded-lg border border-border bg-card shadow-sm', className)}>{children}</div>;
}
export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx('p-4 border-b border-border', className)}>{children}</div>;
}
export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={clsx('text-lg font-semibold text-foreground', className)}>{children}</h3>;
}
export function CardDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={clsx('text-sm text-muted-foreground', className)}>{children}</p>;
}
export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx('p-4', className)}>{children}</div>;
}
