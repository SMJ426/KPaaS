'use client';
import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
import styled from 'styled-components';

import { signup, checkNickname, checkEmail } from '@compoents/util/Client';
import InputProfileImg from './teacherSignup/InputProfileImg';
import InputName from './teacherSignup/InputName';
import InputEmail from './teacherSignup/InputEmail';
import InputPassword from './teacherSignup/InputPassword';
import InputPasswordCheck from './teacherSignup/InputPasswordCheck';
import InputNickName from './teacherSignup/InputNickName';
import InputDesc from './teacherSignup/InputDesc';

export default function TeacherSignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [nick_name, setNickname] = useState('');
  const [info, setInfo] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(null);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isNicknameVerified, setIsNicknameVerified] = useState(false);
  const [image, setImage] = useState(null);
  const [showimage, setShowimage] = useState('/images/defaultIMG.png');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setemailError] = useState('');
  const [nicknameError, setnicknameError] = useState('');
  const [requestError, setRequestError] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
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
          //
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
    const img = new Image();
    img.src = URL.createObjectURL(selectedImage);
    img.onload = () => {
      if (img.width > 3000 || img.height > 3000) {
        setAlertMessage('지원하지 않는 이미지 크기입니다. (최대 3000x3000px)');
        setShowAlertModal(true);
        e.target.value = ''; 
      } else {
        setImage(selectedImage);
        const imageUrls = URL.createObjectURL(selectedImage);
        setShowimage(imageUrls);
        setShowAlertModal(false); 
      }
    };
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleCheckDuplicate(e) {
    e.preventDefault();
    try {
      if (nick_name === '' || /^\s*$/.test(nick_name)) {
        setIsDuplicate(true); 
        setnicknameError('빈 값은 올 수 없습니다.'); 
        setIsNicknameVerified(false); 
        return;
      }
      const data = await checkNickname(nick_name);
      if (data === false) {
        setIsDuplicate(false);
        setIsNicknameVerified(true);
        setnicknameError('');
      } else {
        setIsDuplicate(true);
        setIsNicknameVerified(false);
      }
    } catch (error) {
      setIsNicknameVerified(false);
    }
  }

  async function handleCheckDuplicateEmail(e) {
    e.preventDefault();
    try {

      if (email === '' || /^\s*$/.test(email)) {
        setIsEmailDuplicate(true); // 중복 처리
        setemailError('빈 값은 올 수 없습니다.'); // 에러 메시지 설정
        return;
      }

      const data = await checkEmail(email);
      if (data === true) {
        setIsEmailDuplicate(true);
      } else {
        setIsEmailDuplicate(false);
        setemailError('');
      }
      setIsEmailVerified(true);
    } catch (error) {
      setIsEmailVerified(false);
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isEmailVerified) {
      alert('이메일 중복 확인을 완료해주세요.');
      return;
    }

    if (!isNicknameVerified) {
      alert('닉네임 중복 확인을 완료해주세요.');
      return;
    }

    if (name === '') {
      setNameError('이름을 입력해주세요.');
      return;
    } else {
      setNameError('');
    }

    if (email === '') {
      setemailError('이메일을 양식에 맞추어 입력해주세요.');
      return;
    } else if (emailError === 500) {
      setemailError('이미 가입된 이메일입니다.');
    } else {
      setemailError('');
    }

    if (nick_name === '') {
      setnicknameError('닉네임을 입력해주세요.');
      return;
    } else {
      setnicknameError('');
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
      role: 'ROLE_TEACHER',
      member_info: info,
    };
    formData.append(
      'req',
      new Blob([JSON.stringify(req)], { type: 'application/json' })
    );
    formData.append('img', image);

    try {
      const responseData = await signup(formData);
      if (responseData.state === '처리 성공') {
        window.location.href = '/user/login';
      } else if (responseData.state === '중복된 이메일') {
        alert(responseData.message);
        alert('이메일을 변경해주세요.');
      }
    } catch (error) {
      alert('회원가입 중 오류가 발생하였습니다.');
    }
  };

  function handleFocus(e) {
    const field = e.target.id;
    if (field === 'email') {
      document.getElementById('email').style.borderColor = '#496AF3';
    } else if (field === 'password') {
      document.getElementById('password').style.borderColor = '#496AF3';
    } else if (field === 'name') {
      document.getElementById('name').style.borderColor = '#496AF3';
    } else if (requestError === 400) {
      if (field === 'email') {
        document.getElementById('email').style.borderColor = '#FF0000';
      } else if (field === 'password') {
        document.getElementById('password').style.borderColor = '#FF0000';
      } else if (field === 'name') {
        document.getElementById('name').style.borderColor = '#496AF3';
      }
    }
  }
  return (
    <StyledWrapper>
      <h1 className="title-signup">강사 회원가입</h1>

      <form className="formContainer">
        {/* 프로필 이미지 설정 */}
        <InputProfileImg
          showimage={showimage}
          handleImageChange={handleImageChange}
        />

        {/* 이름 설정 */}
        <InputName name={name} setName={setName} nameError={nameError} />

        {/* 이메일 설정 */}
        <InputEmail
          setEmail={setEmail}
          handleCheckDuplicateEmail={handleCheckDuplicateEmail}
          isEmailDuplicate={isEmailDuplicate}
          emailError={emailError}
          email={email}
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

        {/* 강사 정보 설정 */}
        <InputDesc info={info} setInfo={setInfo} />

        <button type="button" className="btn-sign-up" onClick={handleSignup}>
          회원가입
        </button>
      </form>


      {showAlertModal && (
        <Modal>
          <div className="modal-content">
            <p>{alertMessage}</p>
            <button onClick={() => setShowAlertModal(false)}>확인</button>
          </div>
        </Modal>
      )}
    </StyledWrapper>
  );
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal-content {
    background: white;
    padding: 40px;
    border-radius: 8px;
    text-align: center;
    min-width: 300px;
  }

  button {
    background-color: #f25264;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    margin-top: 20px;
    letter-spacing: 2px;
  }

  button:hover {
    background-color: #f2526587;
  }
`;

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
