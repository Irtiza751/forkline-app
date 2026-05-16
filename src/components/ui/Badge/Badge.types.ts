export type BadgeVariant = 'default' | 'success' | 'warning' | 'muted';

export interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}
