'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import { Loginfetchs } from '@compoents/util/http';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requestError, setRequestError] = useState(false);
  const router = useRouter();
  const NaverLogo = '/images/naver.jpg';
  const KakaoLogo = '/images/kakaotalk_sharing_btn_medium.jpg';
  const smile = '/svgs/ellipse-87.svg';

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

  const handleKakaoLogin = () => {
    const REST_API_KEY = 'b9759cba8e0cdd5bcdb9d601f5a10ac1';
    const REDIRECT_URI = 'http://localhost:3000/user/login/oauth2/kakao';
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&scope=talk_message,profile_nickname,profile_image,account_email`;
  };

  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
  };

  function handleFocus(e) {
    const field = e.target.id;
    if (field === 'email') {
      document.getElementById('email').style.borderColor = '#496AF3';
    } else if (field === 'password') {
      document.getElementById('password').style.borderColor = '#496AF3';
    } else if (requestError === 403) {
      if (field === 'email') {
        document.getElementById('email').style.borderColor = '#FF0000';
      } else if (field === 'password') {
        document.getElementById('password').style.borderColor = '#FF0000';
      }
    }
  }

  return (
    <PageContainer>
      <Write1>로그인</Write1>
      <FormContainer onSubmit={handleSubmit}>
        <LoginText>이메일</LoginText>
        <label htmlFor="email">
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleFocus(e);
            }}
            placeholder="이메일을 입력해주세요..."
          />
        </label>
        <LoginText2>비밀번호</LoginText2>
        <label htmlFor="password">
          <Input2
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleFocus(e);
            }}
          />
        </label>
        {requestError === 403 && (
          <AnyLogins>
            <StyledImage src={smile} width={30} height={30} alt="스마일" />
            <ErrorMsg>아이디 혹은 비밀번호를 다시 확인해주세요.</ErrorMsg>
          </AnyLogins>
        )}
        <Button1 type="submit">로그인</Button1>
        <Button2 type="button" onClick={handleSignup}>
          사용자 회원가입
        </Button2>
        <Button2 type="button" onClick={handleTeacherSignup}>
          강사 회원가입
        </Button2>
        <EasyLogin>간편 로그인</EasyLogin>
        <AnyLogins>
          <NaverButton onClick={handleNaverLogin}>
            <StyledImage src={NaverLogo} alt="이미지" width={70} height={70} />
          </NaverButton>
          <KakaoButton onClick={handleKakaoLogin}>
            <EllipseContainer>
              <StyledImage
                src={KakaoLogo}
                alt="이미지"
                width={72}
                height={72}
              />
            </EllipseContainer>
          </KakaoButton>
        </AnyLogins>
        <AnyLogins>
          <NaverText>네이버로 로그인</NaverText>
          <KakaoText>카카오로 로그인</KakaoText>
        </AnyLogins>
      </FormContainer>
      <FlexSection2></FlexSection2>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  position: relative;
  height: 894px;
`;

const Write1 = styled.div`
  color: #000000;
  font-family: 'Pretendard Variable';
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  height: 72px;
  margin-top: 120px;
`;

const FormContainer = styled.form`
  position: absolute;
  top: 1%;
  left: 50%;
  transform: translateX(-50%);
  width: 684px;
  height: 753px;
`;

const LoginText = styled.h1`
  color: #788991;
  font-family: 'Pretendard Variable';
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 78px;
  height: 21px;
  margin-top: 62px;
  margin-left: 59px;
  padding: 0%;
`;

const LoginText2 = styled.h1`
  color: #788991;
  font-family: 'Pretendard Variable';
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 78px;
  height: 21px;
  margin-top: 31px;
  margin-left: 59px;
  padding: 0%;
`;

const Input = styled.input`
  width: 566px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: solid var(--gray-800, #737a8d);
  background: #f4f5f5;
  margin-left: 59px;
  margin-top: 14px;
  color: var(--black, #191a1c);
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-left: 23px;

  &::placeholder {
    color: var(--gray-400, #bec0c6);
    font-family: 'Pretendard Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-left: 0%;
  }
`;

const Input2 = styled.input`
  width: 566px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: solid var(--gray-800, #737a8d);
  background: #f4f5f5;
  margin-left: 59px;
  margin-top: 14px;
  padding-left: 23px;
`;

const Button1 = styled.button`
  width: 566px;
  height: 50px;
  margin-top: 52px;
  margin-left: 59px;
  border-radius: 10px 0px 0px 0px;
  border-radius: 10px;
  border: #496af3;
  background: var(--primary-primary, #496af3);
  color: #fff;
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 0%;
`;

const Button2 = styled.button`
  width: 566px;
  height: 50px;
  margin-top: 18px;
  margin-left: 59px;
  border-radius: 10px 0px 0px 0px;
  border: 1.5px 0px 0px 0px;
  border-radius: 10px;
  border: 1.5px solid var(--primary-primary, #496af3);
  background: #fff;
  color: var(--primary-primary, #496af3);
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 0%;
`;

const EasyLogin = styled.div`
  margin-top: 52px;
  margin-left: 297px;
  color: var(--gray-500, #8b8e98);
  font-family: 'Pretendard Variable';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const AnyLogins = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 28px;
  margin-left: -10px;
`;

const StyledImage = styled(Image)`
  width: 70px;
  height: 70px;
  border-radius: 90%;
`;

const ErrorMsg = styled.div`
  color: var(--red, #ff0000);
  font-family: 'Pretendard Variable';
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 8px;
`;

const NaverButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const KakaoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const EllipseContainer = styled.div`
  width: 72px;
  height: 72px;
`;

const NaverText = styled.div`
  color: #191a1c;
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-right: 46px;
`;

const KakaoText = styled.div`
  color: #191a1c;
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const FlexSection2 = styled.section`
  height: 347px;
  border: 0;
  margin-top: 40px;
`;
