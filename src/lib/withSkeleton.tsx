import React from 'react';

export const withSkeleton = <P extends object>(
  Component: React.ComponentType<P>,
  SkeletonComponent: React.ComponentType
) => {
  const Wrapped = ({ isLoading, ...props }: P & { isLoading: boolean }) => {
    if (isLoading) {
      return <SkeletonComponent />;
    }
    return <Component {...(props as P)} />;
  };

  Wrapped.displayName = `withSkeleton(${Component.displayName ?? Component.name ?? 'Component'})`;

  return Wrapped;
};
