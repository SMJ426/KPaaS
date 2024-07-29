'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { signup, checkNickname, checkEmail } from '@compoents/util/Client';
import InputName from './memberSignup/InputName';
import InputProfileImg from './memberSignup/InputProfileImg';
import InputEmail from './memberSignup/InputEmail';
import InputPassword from './memberSignup/InputPassword';
import InputPasswordCheck from './memberSignup/InputPasswordCheck';
import InputNickName from './memberSignup/InputNickName';
import InputDesc from './memberSignup/InputDesc';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [nick_name, setNickname] = useState('');
  const [info, setInfo] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(null);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(null);
  const [image, setImage] = useState(null);
  const [showimage, setShowimage] = useState('/images/defaultIMG.png');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setemailError] = useState('');
  const [nicknameError, setnicknameError] = useState('');
  const smile = '/svgs/ellipse-87.svg';
  const showpsw = '/svgs/View.svg';
  const dfImg = '/images/kakaoImg.jpg';

  useEffect(() => {
    if (image === null) {
      fetch(dfImg)
        .then((res) => res.blob())
        .then((blob) => {
          setImage(blob);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [image, dfImg]);

  const validatePassword = (password) => {
    const logic =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return logic.test(password);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    const imageUrls = URL.createObjectURL(selectedImage);
    setShowimage(imageUrls);
    console.log(selectedImage);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleCheckDuplicate(e) {
    e.preventDefault();
    try {
      const data = await checkNickname(nick_name);
      if (data === true) {
        setIsDuplicate(true);
      } else {
        setIsDuplicate(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCheckDuplicateEmail(e) {
    e.preventDefault();
    try {
      const data = await checkEmail(email);
      if (data === true) {
        setIsEmailDuplicate(true);
        setemailError('');
      } else {
        setIsEmailDuplicate(false);
        setemailError('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    if (name === '') {
      setNameError('이름을 입력해주세요.');
      return;
    } else {
      setNameError('');
    }

    if (email === '') {
      setemailError('이메일을 양식에 맞추어 입력해주세요.');
      setIsEmailDuplicate('');
      return;
    } else if (emailError === 500) {
      setemailError('이미 가입된 이메일입니다.');
      setIsEmailDuplicate('');
    } else {
      setemailError('');
    }

    if (nick_name === '') {
      setnicknameError('닉네임을 입력해주세요.');
      setIsDuplicate('');
      return;
    } else {
      setnicknameError('');
      setIsDuplicate('');
    }

    if (!validatePassword(password)) {
      setPasswordError(
        '비밀번호는 숫자, 영어, 특수문자를 포함하여 8자리 이상이어야 합니다.'
      );
      return;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const formData = new FormData();
    let req = {
      email: email,
      password: password,
      user_name: name,
      nick_name: nick_name,
      role: 'ROLE_MEMBER',
      member_info: info,
    };
    formData.append(
      'req',
      new Blob([JSON.stringify(req)], { type: 'application/json' })
    );
    formData.append('img', image);

    for (var pair of formData.values()) {
      console.log(pair);
    }

    try {
      const responseData = await signup(formData);
      if (responseData.state === '처리 성공') {
        window.location.href = '/user/login';
      } else if (responseData.state === '중복된 이메일') {
        alert(responseData.message);
        alert('이메일을 변경해주세요.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledWrapper>
      <h1 className="title-signup">회원가입</h1>

      <form className="formContainer">
        {/* 프로필 이미지 설정 */}
        <InputProfileImg
          showimage={showimage}
          handleImageChange={handleImageChange}
        />

        {/* 이름 설정 */}
        <InputName
          name={name}
          setName={setName}
          nameError={nameError}
          smile={smile}
        />

        {/* 이메일 설정 */}
        <InputEmail
          setEmail={setEmail}
          handleCheckDuplicateEmail={handleCheckDuplicateEmail}
          isEmailDuplicate={isEmailDuplicate}
          emailError={emailError}
          email={email}
          smile={smile}
        />

        {/* 비밀번호 설정 */}
        <InputPassword
          showPassword={showPassword}
          password={password}
          setPassword={setPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          passwordError={passwordError}
        />

        {/* 비밀번호 확인 설정 */}
        <InputPasswordCheck
          showPassword={showPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          passwordError={passwordError}
        />

        {/* 닉네임 확인 설정 */}
        <InputNickName
          nick_name={nick_name}
          setNickname={setNickname}
          handleCheckDuplicate={handleCheckDuplicate}
          isDuplicate={isDuplicate}
          nicknameError={nicknameError}
        />

        {/* 회원 정보 설정 */}
        <InputDesc info={info} setInfo={setInfo} />

        {/* 회원가입 버튼 */}
        <button type="button" className="btn-sign-up" onClick={handleSignup}>
          회원가입
        </button>
      </form>
      <section className="flexSection2"></section>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard';

  .title-signup {
    font-size: 24px;
    font-weight: bold;
    padding-top: 100px;
  }

  .formContainer {
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .error-msg {
    color: #f4492e;
    font-size: 14px;
    padding-top: 15px;
  }

  .nonError-msg {
    color: #496af3;
    font-size: 14px;
    padding-top: 15px;
  }

  .btn-sign-up {
    margin-top: 50px;
    width: 100%;
    height: 50px;
    background-color: #2e6ff2;
    color: #ffffff;

    cursor: pointer;
    border: none;
    border-radius: 5px;

    &:hover {
      background-color: #ffffff;
      color: #2e6ff2;
      border: 1px solid #2e6ff2;
    }
  }
`;
