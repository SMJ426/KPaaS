import React from 'react';
import styled from 'styled-components';

export default function InputEmail({
  setEmail,
  handleCheckDuplicateEmail,
  isEmailDuplicate,
  emailError,
  email,
  smile,
}) {
  function handleFocus(e) {
    const field = e.target.id;

    if (field === 'email' && !emailError) {
      document.getElementById('email').style.borderColor = '#496AF3';
    }
  }
  return (
    <StyledWrapper>
      <p className="email-text">이메일</p>
      <div className="wrapper-email-logins">
        <div className="wrapper-input-duplicate">
          <label htmlFor="email">
            <input
              className="input-email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleFocus(e);
              }}
            />
          </label>
          <button
            type="button"
            className="btn-duplicate"
            onClick={handleCheckDuplicateEmail}
          >
            중복 확인
          </button>
        </div>
        {/* 중복 로직 */}
        {isEmailDuplicate === true && (
          <div className="result-email-check">
            <img src="/images/png/error-check.png" alt="사용할 수 없습니다." />
            <p className="error-msg"> 사용 불가능한 이메일입니다.</p>
          </div>
        )}
        {isEmailDuplicate === false && (
          <div className="result-email-check">
            <img src="/images/png/nonError-check.png" alt="사용 가능 합니다." />
            <p className="nonError-msg">사용 가능한 이메일입니다.</p>
          </div>
        )}
      </div>

      {/* 빈 값 로직 */}
      {emailError && <p className="error-msg">{emailError}</p>}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .email-text {
    font-size: 14px;
    color: #788991;
  }

  .wrapper-email-logins {
    width: 100%;
    .wrapper-input-duplicate {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      .input-email {
        width: 380px;
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

      .btn-duplicate {
        width: 110px;
        height: 50px;

        border: 1px solid #2e6ff2;
        border-radius: 5px;
        flex-shrink: 0;
        margin-top: 8px;

        background-color: #ffffff;
        color: #2e6ff2;
        font-size: 14px;
        font-weight: bold;

        cursor: pointer;

        &:hover {
          background-color: #2e6ff2;
          color: #ffffff;
        }
      }
    }

    .result-email-check {
      display: flex;
      align-items: center;
      gap: 5px;
      > img {
        margin-top: 11px;
        width: 16px;
        height: 16px;
      }
    }
  }
`;
