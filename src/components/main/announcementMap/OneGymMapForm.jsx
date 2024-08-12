import React from 'react';
import KakaoMap from './KakaoMap';
import styled from 'styled-components';

export default function OneGymMapForm({ gym, onClose }) {
  return (
    <StyledWrapper>
      <h3>{gym.시설명}</h3>
      <KakaoMap gym={gym} />
      <button className="backBtn" onClick={() => onClose(false)}>
        {' '}
        이걸 클릭하면 돌아가요!{' '}
      </button>
    </StyledWrapper>
  );
}

OneGymMapForm;

const StyledWrapper = styled.div`
  .backBtn {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #fee500;
    color: #000;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #fdd835;
    }
  }
`;
