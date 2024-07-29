import React from 'react';
import styled from 'styled-components';

export default function InputNickName({
  nick_name,
  setNickname,
  handleCheckDuplicate,
  isDuplicate,
  nicknameError,
}) {
  return (
    <StyledWrapper isError={nicknameError}>
      <p className="nickName-text">닉네임</p>
      <div className="wrapper-nickNames">
        <div className="wrapper-input-duplicates">
          <input
            className="input-nickName"
            type="string"
            value={nick_name}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button
            type="button"
            className="btn-duplicate"
            onClick={handleCheckDuplicate}
          >
            중복 확인
          </button>
        </div>
        {isDuplicate === true && (
          <div className="result-nickName-check">
            <img src="/images/png/error-check.png" alt="사용할 수 없습니다." />
            <p className="error-msg"> 사용 불가능한 닉네임입니다.</p>
          </div>
        )}

        {/* 중복 로직 */}
        {isDuplicate === false && (
          <div className="result-nickName-check">
            <img src="/images/png/nonError-check.png" alt="사용 가능 합니다." />
            <p className="nonError-msg">사용 가능한 닉네임입니다.</p>
          </div>
        )}
      </div>
      {nicknameError && (
        <div className="anyLogins">
          <p className="error-msg">{nicknameError}</p>
        </div>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .nickName-text {
    font-size: 14px;
    color: #788991;
  }

  .wrapper-nickNames {
    width: 100%;
    .wrapper-input-duplicates {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      .input-nickName {
        width: 380px;
        height: 50px;
        border-radius: 5px 5px 0 0;
        padding: 14px 0 14px 14px;
        border: ${(props) => (props.isError ? '1px solid #f4492e' : 'none')};
        border-bottom: ${(props) =>
          props.isError ? '1px solid #f4492e' : '1px solid #a0acb1'};
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
    .result-nickName-check {
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
