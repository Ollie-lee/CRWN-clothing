import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

export default (WrappedComponent) => {
  const hocComponent = ({ isLoading, ...props }) =>
    isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer></SpinnerContainer>
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...props} />
    );

  return hocComponent;
};
