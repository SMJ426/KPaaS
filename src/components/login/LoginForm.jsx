'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Loginfetchs } from '@compoents/util/http';
import SocialLogin from './SocialLogin';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requestError, setRequestError] = useState(false);
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

  const handleSignup = () => {
    router.push('/user/signup'); // 회원가입 페이지로 이동
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
    <StyledWrapper isError={isError}>
      <h1 className="title">로그인</h1>
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
            placeholder="이메일을 입력해주세요"
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
            className="signup-button user"
            type="button"
            onClick={handleSignup}
          >
            사용자 회원가입
          </button>
          <button
            className="signup-button teacher"
            type="button"
            onClick={handleTeacherSignup}
          >
            강사 회원가입
          </button>
        </div>

        {/* 구분선 */}
        <div className="divider">
          <hr />
          <span>간편 로그인</span>
          <hr />
        </div>

        {/* 네이버 ,카카오 로그인 */}
        <SocialLogin />
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Spoqa Han Sans Neo';
  margin: 0 auto;
  width: 400px;
  padding-top: 100px;

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
    border: ${(props) => (props.isError ? '1px solid red' : 'none')};
    border-bottom: ${(props) =>
      props.isError ? '1px solid red' : '1px solid #a0acb1'};
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

    .login-button {
      border: none;
      height: 50px;
      border-radius: 5px;
      font-size: 14px;

      background-color: #2e6ff2;
      color: #ffffff;
    }

    .signup-button {
      border: none;
      height: 50px;
      border-radius: 5px;

      font-size: 14px;
      color: #29363d;
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
