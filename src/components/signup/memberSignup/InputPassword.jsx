import React from 'react';
import styled from 'styled-components';

export default function InputPassword({
  showPassword,
  password,
  setPassword,
  togglePasswordVisibility,
  passwordError,
}) {
  const showpsw = '/svgs/View.svg';

  function handleFocus(e) {
    const field = e.target.id;

    if (field === 'password' && !passwordError) {
      document.getElementById('password').style.borderColor = '#496AF3';
    }
  }

  return (
    <StyledWrapper>
      <p className="password-text">비밀번호</p>
      <div className="wrapper-password">
        <input
          className="input-password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleFocus(e);
          }}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="btn-show-password"
        >
          <img
            src="/svgs/View.svg"
            width={18}
            height={12}
            alt="비밀번호 표시"
          />
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: relative;

  .password-text {
    font-size: 14px;
    color: #788991;
  }

  .wrapper-password {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-password {
    width: 100%;
    height: 50px;
    border-radius: 5px 5px 0 0;
    padding: 14px 0 14px 14px;
    border: none;
    border-bottom: 1px solid #a0acb1;
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

  .btn-show-password {
    position: absolute;
    right: 14px;
    top: 55%;
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;

    > img {
      display: block;
    }
  }
`;
