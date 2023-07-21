import AppLayout from 'layout/app-layout';
import { ComponentType } from 'react';

export function withAppLayout() {
  return <P extends object>(WrappedComponent: ComponentType<P & JSX.IntrinsicAttributes>) => {
    const EnhancedComponent: React.FC<P> = (props) => {
      return (
        <AppLayout>
          <WrappedComponent {...props} />
        </AppLayout>
      );
    };
    EnhancedComponent.displayName = `withAppLayout(${WrappedComponent.displayName || WrappedComponent.name})`;
    return EnhancedComponent;
  };
}
