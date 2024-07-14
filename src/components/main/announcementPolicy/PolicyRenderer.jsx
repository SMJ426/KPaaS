import React from 'react';
import styled from 'styled-components';

function PolicyRenderer({ policyData }) {
  return (
    <StyledWrapper>
      <img src={policyData.thumbnail} alt="정책이미지" className="img-policy" />
      <div className="wrapper-desc">
        <p className="title">{policyData.title}</p>
        <p className="desc">{policyData.desc}</p>
      </div>
    </StyledWrapper>
  );
}

export default PolicyRenderer;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d8e7ea;
  width: 100%;
  height: 100%;
  border-radius: 12px;

  .img-policy {
    width: 180px;
    height: 200px;
    box-shadow: -10px 10px 30px rgba(0, 0, 0, 0.3);
    margin-left: 40px;
  }

  .wrapper-desc {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 200px;
    height: 200px;
    padding: 0 15px;

    .title {
      border: none;
      font-size: 25px;
      font-weight: bold;
    }
    .desc {
      font-size: 13px;
      font-weight: 200;
    }
  }

  @media screen and (max-width: 1600px) {
    .img-policy {
      max-width: 180px;
      margin: 0;
    }
    .wrapper-desc {
      display: none;
    }
  }
`;
