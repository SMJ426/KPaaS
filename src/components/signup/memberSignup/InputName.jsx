import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

export default function InputName({
  name,
  setName,
  handleFocus,
  nameError,
  smile,
}) {
  return (
    <StyledWrapper>
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
        placeholder="이름"
      />
      {nameError && (
        <div className="anyLogins">
          <Image
            src={smile}
            width={30}
            height={30}
            alt="스마일"
            className="smile"
          />
          <p className="errorMsg">{nameError}</p>
        </div>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .name-text {
    color: var(--black, #191a1c);
    font-size: 18px;
  }

  .input-name {
    width: 100%;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1.5px solid var(--gray-400, #bec0c6);

    color: var(--black, #191a1c);

    font-size: 16px;
    font-weight: 400;

    padding-left: 23px;
  }
`;
