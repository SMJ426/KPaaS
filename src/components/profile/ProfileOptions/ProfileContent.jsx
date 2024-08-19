import React from 'react';
import styled from 'styled-components';
import LikegridComponent from '@compoents/components/bucket/Likegrid';
import ProductsComponent from '../ProductsComponent';

export default function ProfileContent({
  currentView,
  nick_name,
  accessToken,
  initialProducts,
}) {
  return (
    <StyledWrapper>
        {currentView === 'likes' && (
          <LikegridComponent nick_name={nick_name} accessToken={accessToken} />
        )}
        {currentView === 'products' && (
          <ProductsComponent
            initialProducts={initialProducts}
            accessToken={accessToken}
            nick_name={nick_name}
          />
        )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
    margin-top: 200px;
`;