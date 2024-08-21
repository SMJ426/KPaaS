import React from 'react';
import KakaoMap from './KakaoMap';
import styled from 'styled-components';

export default function OneGymMapForm({ gym, onClose }) {
  return (
    <StyledWrapper>
      <h2 className="gym-title">{gym.시설명}</h2>
      <KakaoMap gym={gym} />
      <button className="back-btn" onClick={() => onClose(false)}>
        돌아가기
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 640px;
  margin: 0 auto;

  .gym-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }

  .back-btn {
    display: block;
    width: 100%;
    margin-top: 20px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    background-color: #f8f9fa;
    color: #495057;
    border: 1px solid #ced4da;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #e9ecef;
      color: #212529;
    }
  }
`;
