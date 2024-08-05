import React from 'react';
import styled from 'styled-components';
import LikegridComponent from '@compoents/components/bucket/Likegrid';
import ProductsComponent from '../ProductsComponent';

export default function ProfileContent({
  currentView,
  nick_name,
  accessToken,
  userproducts,
}) {
  return (
    <StyledWrapper>
        {currentView === 'likes' && (
          <LikegridComponent nick_name={nick_name} accessToken={accessToken} />
        )}
        {currentView === 'products' && (
          <ProductsComponent
            userproducts={userproducts}
            accessToken={accessToken}
          />
        )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
    margin-top: 200px;
    height: 2000px;
`;