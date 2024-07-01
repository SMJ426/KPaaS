import React from 'react';
import styled from 'styled-components';

function PolicyRenderer({ policyData }) {
  return (
    <StyledWrapper>
      <img src={policyData.thumbnail} alt="정책이미지" className="img-policy" />
    </StyledWrapper>
  );
}

export default PolicyRenderer;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .img-policy {
    width: 180px;
    height: 180px;
  }
`;
