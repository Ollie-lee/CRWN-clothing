import React from 'react';

import { CustomButtonContainer } from './custom-button.styles';

export default function CustomButton({ children, ...otherProps }) {
  return (
    <CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
  );
}
