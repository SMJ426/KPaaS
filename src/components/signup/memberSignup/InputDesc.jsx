import React from 'react';
import styled from 'styled-components';

export default function InputDesc({ info, setInfo }) {
  function handleFocus(e) {
    const field = e.target.id;

    if (field === 'info') {
      document.getElementById('info').style.borderColor = '#496AF3';
    }
  }

  return (
    <StyledWrapper>
      <p className="info-text">회원 정보</p>
      <input
        className="input-info"
        type="string"
        id="info"
        value={info}
        onChange={(e) => {
          setInfo(e.target.value);
          handleFocus(e);
        }}
        placeholder="소개글을 작성해보세요!"
      />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .info-text {
    font-size: 14px;
    color: #788991;
  }

  .input-info {
    width: 100%;
    height: 50px;
    border-radius: 5px 5px 0 0;
    padding: 14px 0 14px 14px;
    border: ${(props) => (props.isError ? '1px solid red' : 'none')};
    border-bottom: ${(props) =>
      props.isError ? '1px solid red' : '1px solid #a0acb1'};
    margin-top: 7px;

    font-size: 14px;
    color: #29363d;
    background-color: #f4f5f5;

    &::placeholder {
      color: #767676;
    }
    &:focus {
      outline: none;
    }
  }
`;
