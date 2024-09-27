import React from 'react';
import styled from 'styled-components';

export default function InputName({ name, setName, nameError }) {
  function handleFocus(e) {
    const field = e.target.id;

    if (field === 'name' && !nameError) {
      document.getElementById('name').style.borderColor = '#496AF3';
    }
  }

  return (
    <StyledWrapper isError={nameError}>
      <p className="name-text">이름</p>
      <input
        className="input-name"
        type="string"
        id="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          handleFocus(e);
        }}
      />
      {nameError && <p className="error-msg">{nameError}</p>}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  padding-top: 50px;

  .name-text {
    font-size: 14px;
    color: #788991;
  }

  .input-name {
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
