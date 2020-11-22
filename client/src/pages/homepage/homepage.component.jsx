import React from 'react';

import DirectoryWrapper from '../../components/DirectoryWrapper/DirectoryWrapper.component';
import { HomePageContainer } from './homepage.styles';

export default function Homepage() {
  return (
    <HomePageContainer>
      <DirectoryWrapper />
    </HomePageContainer>
  );
}
