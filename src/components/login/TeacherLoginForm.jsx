'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Loginfetchs } from '@compoents/util/http';
import TeacherSocialLogin from './TeacherSocialLogin';

export default function TeacherLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requestError, setRequestError] = useState(false);
  const [userType, setUserType] = useState('teacher'); // 'member' 또는 'teacher'
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await Loginfetchs(email, password);
      router.push('/');
    } catch (error) {
      console.error(error.message);
      setRequestError(403);
    }
    return;
  };

  const handleTeacherSignup = () => {
    router.push('/user/teachersignup'); // 회원가입 페이지로 이동
  };

  function handleFocus(e) {
    const field = e.target.id;
    if (field === 'email') {
      // document.getElementById('email').style.borderColor = '#496AF3';
    } else if (field === 'password') {
      // document.getElementById('password').style.borderColor = '#496AF3';
    } else if (requestError === 403) {
      if (field === 'email') {
        // document.getElementById('email').style.borderColor = '#FF0000';
      } else if (field === 'password') {
        // document.getElementById('password').style.borderColor = '#FF0000';
      }
    }
  }

  const isError = requestError === 403;

  return (
    <CenteredWrapper>
      <StyledWrapper $isError={isError}>
        <h1 className="title">강사 로그인</h1>
        <form className="form-container" onSubmit={handleSubmit}>
          <p className="login-text">이메일</p>
          <label htmlFor="email">
            <input
              className="input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleFocus(e);
              }}
            />
          </label>
          <p className="login-text">비밀번호</p>
          <label htmlFor="password">
            <input
              className="input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleFocus(e);
              }}
            />
          </label>

          {isError && (
            <div className="error-msg">
              아이디 혹은 비밀번호를 다시 확인해주세요.
            </div>
          )}

          <div className="wrapper-btns">
            <button className="login-button" type="submit">
              로그인
            </button>
            <button
              className="signup-button teacher"
              type="button"
              onClick={handleTeacherSignup}
            >
              강사 회원가입
            </button>
          </div>

          <div className="social-login-container">
            <>
              <div className="divider">
                <hr />
                <span>간편 로그인</span>
                <hr />
              </div>
              <TeacherSocialLogin />
            </>
          </div>
        </form>
      </StyledWrapper>
    </CenteredWrapper>
  );
}

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 전체 화면 높이를 차지하도록 설정 */
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Spoqa Han Sans Neo';
  width: 400px;
  min-height: 700px;

  .user-type-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .tab-button {
    padding: 10px 20px;
    border: none;
    background-color: #f4f5f5;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:first-child {
      border-radius: 5px 0 0 5px;
    }

    &:last-child {
      border-radius: 0 5px 5px 0;
    }

    &.active {
      background-color: #2e6ff2;
      color: white;
    }

    &:hover:not(.active) {
      background-color: #e8f0fe;
    }
  }
  .social-login-container {
    height: 150px; // 소셜 로그인 컴포넌트의 대략적인 높이 (필요에 따라 조정)
  }

  .title {
    color: #29363d;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
  }

  .login-text {
    color: #788991;
    font-size: 13px;
  }

  .input {
    width: 100%;
    height: 50px;
    border-radius: 5px 5px 0 0;
    padding: 14px 0 14px 14px;
    border: ${(props) => (props.$isError ? '1px solid red' : 'none')};
    border-bottom: ${(props) =>
      props.$isError ? '1px solid red' : '1px solid #a0acb1'};
    margin: 7px 0 30px 0;

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

  #password {
    margin-bottom: 0;
  }

  .error-msg {
    color: #f4492e;
    font-size: 14px;
    padding-top: 15px;
  }

  .wrapper-btns {
    display: flex;
    flex-direction: column;
    gap: 9px;
    width: 100%;
    margin-top: 30px;
    > button {
      transition: box-shadow 0.3s;
    }

    > button:hover {
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .login-button {
      border: none;
      height: 50px;
      border-radius: 5px;
      font-size: 14px;

      background-color: #2e6ff2;
      color: #ffffff;

      &:hover {
        background-color: #ffffff;
        border: 1px solid #2e6ff2;
        color: #2e6ff2;
      }
    }

    .signup-button {
      border: none;
      height: 50px;
      border-radius: 5px;

      font-size: 14px;
      color: #29363d;

      &:hover {
        background-color: #2e6ff2;
        color: #ffffff;
      }
    }
    .user {
      background-color: #e8f0fe;
      color: #2e6ff2;
    }
    .teacher {
      background-color: #e8f0fe;
      color: #2e6ff2;
    }
  }

  .divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 0;
    color: #788991;
    font-size: 14px;
  }

  .divider hr {
    flex: 1;
    border: none;
    border-top: 1px solid #e0e0e0;
  }

  .divider span {
    padding: 0 10px;
  }
`;
