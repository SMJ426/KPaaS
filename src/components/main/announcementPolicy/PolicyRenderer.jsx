import React from 'react';
import styled from 'styled-components';

function PolicyRenderer({ policyData }) {
  return (
    <StyledWrapper>
      <a href={policyData.url} target="_blank" rel="noopener noreferrer">
        <img 
          src={`https://img.youtube.com/vi/${policyData.id}/hqdefault.jpg`}
          alt={policyData.title}
          className="img-policy"
        />
      </a>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  padding: 20px;

  .img-policy {
    width: 100%;
    max-width: 320px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .wrapper-desc {
    margin-top: 15px;
    text-align: center;

    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .desc {
      font-size: 14px;
      color: #666;
    }
  }

  @media screen and (max-width: 1600px) {
    .wrapper-desc {
      display: none;
    }
  }
`;