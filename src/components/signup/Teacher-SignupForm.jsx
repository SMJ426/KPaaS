"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

import { signup, checkNickname, checkEmail } from "@compoents/util/Client";


export default function TeacherSignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [nick_name, setNickname] = useState("");
    const [info, setInfo] = useState("");
    const [isDuplicate, setIsDuplicate] = useState(null);
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(null);
    const [image, setImage] = useState(null);
    const [showimage, setShowimage] = useState('/images/defaultImg.jpg');
    const [passwordError, setPasswordError] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setemailError] = useState("");
    const [nicknameError, setnicknameError] = useState("");
    const [requestError, setRequestError] = useState(false);
    const smile = '/svgs/ellipse-87.svg'
    const showpsw = '/svgs/View.svg'
    const dfImg = '/images/kakaoImg.jpg'

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
            } else {
                setIsEmailDuplicate(false);
            }
        } catch (error) {
            console.error(error);
        }
    }


    const handleSignup = async (e) => {
        e.preventDefault();

        if (name === "") {
            setNameError("이름을 입력해주세요.");
            return;
        } else {
            setNameError("");
        }

        if (email === "") {
            setemailError("이메일을 양식에 맞추어 입력해주세요.");
            return;
        } else if (emailError === 500) {
            setemailError("이미 가입된 이메일입니다.");
        } else {
            setemailError("");
        }

        if (nick_name === "") {
            setnicknameError("닉네임을 입력해주세요.");
            return;
        } else {
            setnicknameError("");
        }


        if (!validatePassword(password)) {
            setPasswordError(
                "비밀번호는 숫자, 영어, 특수문자를 포함하여 8자리 이상이어야 합니다."
            );
            return;
        } else {
            setPasswordError("");
        }

        if (password !== confirmPassword) {
            setPasswordError("비밀번호가 일치하지 않습니다.");
            return;
        }

        const formData = new FormData();
        let req = {
            "email": email,
            "password": password,
            "user_name": name,
            "nick_name": nick_name,
            "role": "ROLE_TEACHER",
            "member_info": info
        }
        formData.append('req', new Blob([JSON.stringify(req)], { type: "application/json" }));
        formData.append('img', image);

        for (var pair of formData.values()) {
            console.log(pair);
        }

        try {
            const responseData = await signup(formData);
            if (responseData.state === "처리 성공") {
                window.location.href = "/user/login";
            } else if (responseData.state === "중복된 이메일") {
                alert(responseData.message);
                alert("이메일을 변경해주세요.")
            }
        } catch (error) {
            console.error(error);
        }
    };

    function handleFocus(e) {
        const field = e.target.id;
        if (field === "email") {
            document.getElementById("email").style.borderColor = "#496AF3";
        } else if (field === "password") {
            document.getElementById("password").style.borderColor = "#496AF3";
        } else if (field === "name") {
            document.getElementById("name").style.borderColor = "#496AF3";
        }
        else if (requestError === 400) {
            if (field === "email") {
                document.getElementById("email").style.borderColor = "#FF0000";
            } else if (field === "password") {
                document.getElementById("password").style.borderColor = "#FF0000";
            }
            else if (field === "name") {
                document.getElementById("name").style.borderColor = "#496AF3";
            }
        }
    }
    return (
        <StyledWrapper>
            <div className="pageContainer">
                <section className="flexSection1">
                    <div className="write1">강사 회원가입</div>
                </section>
    
                <form className="formContainer">
                    <h1 className="logintext">이름</h1>
                    <input
                        className="Input3"
                        type="string"
                        id="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            handleFocus(e)
                        }}
                        placeholder="이름"
                    />
                    {nameError &&
                        <div className="anyLogins">
                            <Image src={smile} width={30} height={30} alt="스마일" className="smile" />
                            <p className="errorMsg">{nameError}</p>
                        </div>
                    }
                    <h1 className="logintext2">이메일</h1>
                    <div className="anyLogins">
                        <label htmlFor="email">
                            <input className="Input3"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    handleFocus(e)
                                }}
                                placeholder="이메일을 입력해주세요..."
                            />
                        </label>
                        <button type="button" className="nickBtn" onClick={handleCheckDuplicateEmail}>중복 확인</button>
                        {isEmailDuplicate === true &&
                            <div>
                                <Image className="vector" alt="벡터" src={'/svgs/Ellipse-168.svg'} width={14} height={14} />
                                <Image className="vector2" alt="벡터2" src={'/svgs/Vector340.svg'} width={12} height={10} />
                                <p className="nickFalse">   사용 불가능한 이메일입니다.</p>
                            </div>
                        }
                        {isEmailDuplicate === false &&
                            <div className="nickTrue">
                                <Image src={'/svgs/Ellipse-169.svg'} alt="스마일2" width={14} height={14} className="Vector3" />
                                사용 가능한 이메일입니다.
                            </div>
                        }
                    </div>
                    {emailError && <div className="anyLogins">
                        <Image src={smile} width={30} height={30} alt="스마일" className="smile" />
                        <p className="errorMsg">{emailError}</p>
                    </div>}
                    <h1 className="logintext2">비밀번호</h1>
                    <div className="anyLogins">
                        <input
                            className="Input"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                handleFocus(e)
                            }}
                            placeholder="비밀번호"
                        />
                        <button type="button" onClick={togglePasswordVisibility} className="showPswbtn">
                            <Image src={showpsw} width={18} height={12} alt="비밀번호 표시" />
                        </button>
                    </div>
                    <h1 className="logintext2">비밀번호 확인</h1>
                    <div className="anyLogins">
                        <input
                            className="Input"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                handleFocus(e)
                            }}
                            placeholder="비밀번호 확인"
                        />
                        <button type="button" onClick={togglePasswordVisibility} className="showPswbtn">
                            <Image src={showpsw} width={18} height={12} alt="비밀번호 표시" />
                        </button>
                    </div>
                    {passwordError && <div className="anyLogins">
                        <Image src={smile} width={30} height={30} alt="스마일" className="smile" />
                        <p className="errorMsg">{passwordError}</p>
                    </div>}
                    <div className="verticalLine"></div>
    
                    <h1 className="logintext3">프로필 정보</h1>
                    <h1 className="logintext">닉네임</h1>
                    <div className="anyLogins">
                        <input
                            className="Input3"
                            type="string"
                            value={nick_name}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="닉네임"
                        />
                        <button type="button" className="nickBtn" onClick={handleCheckDuplicate}>중복 확인</button>
                        {isDuplicate === true &&
                            <div>
                                <Image className="vector" alt="벡터" src={'/svgs/Ellipse-168.svg'} width={14} height={14} />
                                <Image className="vector2" alt="벡터2" src={'/svgs/Vector340.svg'} width={12} height={10} />
                                <p className="nickFalse">   사용 불가능한 닉네임입니다.</p>
                            </div>
                        }
                        {isDuplicate === false &&
                            <div className="nickTrue">
                                <Image src={'/svgs/Ellipse-169.svg'} alt="스마일2" width={14} height={14} className="Vector3" />
                                사용 가능한 닉네임입니다.
                            </div>
                        }
                    </div>
                    {nicknameError && <div className="anyLogins">
                        <Image src={smile} width={132} height={132} alt="스마일" className="smile" />
                        <p className="errorMsg">{nicknameError}</p>
                    </div>}
                    <h1 className="logintext">강사 정보</h1>
                    <div className="anyLogins">
                        <input
                            className="Input"
                            type="string"
                            id="info"
                            value={info}
                            onChange={(e) => {
                                setInfo(e.target.value)
                                handleFocus(e)
                            }}
                            placeholder="소개글을 작성해보세요!"
                        />
                    </div>
                    <h1 className="logintext2">프로필 이미지</h1>
                    <div className="outProfile">
                        <label htmlFor="input-file">
                            <Image src={showimage} alt="프로필 이미지" width="132" height="132" className="selectImg" />
                        </label>
                        <input
                            type="file"
                            name="image_URL"
                            id="input-file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                handleImageChange(e)
                            }}
                        />
                    </div>
    
                    <button type="button" className="Button1" onClick={handleSignup}>회원가입</button>
                </form>
                <section className="flexSection2"></section>
            </div>
        </StyledWrapper>
    );
    
};

const StyledWrapper = styled.header`
    .parent {
    position: relative;
    height: 100vh; /* 화면 전체 높이 */
  }
  
  .formContainer {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 704px;
    height: 1378px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 10px 10px 50px 0px rgba(0, 0, 0, 0.10);
  }

  .write1 {
    color: #FFF;
    font-family: "Pretendard Variable";
    font-size: 60px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    /* width: 156px; */
    height: 72px;
}


.logintext {
    color: var(--black, #191A1C);
font-family: "Pretendard Variable";
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: normal;
width: 78px;
height: 21px;
margin-top: 47px;
margin-left: 59px;
padding: 0%;
}

.logintext2 {
    color: var(--black, #191A1C);
font-family: "Pretendard Variable";
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: normal;
width: 150px;
height: 21px;
margin-top: 31px;
margin-left: 59px;
padding: 0%;
}

.logintext3 {
    color: var(--gray-400, #BEC0C6);
font-family: "Pretendard Variable";
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-top: 81px;
margin-left: 59px;
}

.Input{
    width: 566px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1.5px solid var(--gray-400, #BEC0C6);
    background: #FFF;
    margin-left: 59px;
    margin-top: 12px;
    color: var(--black, #191A1C);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 0%;
    padding-left: 23px;
}

.Input2{
    width: 566px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1.5px solid var(--gray-400, #BEC0C6);
    background: #FFF;
    margin-left: 59px;
    margin-top: 14px;
    padding-left: 23px;
}

.Input::placeholder {
    color: var(--gray-400, #BEC0C6);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-left: 0%;
}


.Input3{
    width: 255px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1.5px solid var(--gray-400, #BEC0C6);
    background: #FFF;
    margin-left: 59px;
    margin-top: 12px;
    color: var(--black, #191A1C);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 0%;
    padding-left: 23px;
}
.Input4{
        width: 100px;
        height: 50px;
        flex-shrink: 0;
        border-radius: 10px;
        border: 1.5px solid var(--gray-400, #BEC0C6);
        background: #FFF;
        margin-left: 59px;
        margin-top: 12px;
        color: var(--black, #191A1C);
        font-family: "Pretendard Variable";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 0%;
        padding-left: 23px;
    }
.verticalLine {
    border-top: 1px solid #E2E5EF;
    width: 593px;
    height: 1px;
    margin-top: 81px;
    margin-left: 59px;
    padding: 0%;
  }
  

.Button1 {
    width: 566px;
    height: 50px;
    margin-top: 52px;
    margin-left: 59px;
    border-radius: 10px 0px 0px 0px;
    border-radius: 10px;
    border: #496AF3;
    background: var(--primary-primary, #496AF3);
    color: #FFF;
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 0%;
}

.Button2 {
    width: 566px;
    height: 50px;
    margin-top: 18px;
    margin-left: 59px;
    border-radius: 10px 0px 0px 0px;
    border: 1.5px 0px 0px 0px;
    border-radius: 10px;
    border: 1.5px solid var(--primary-primary, #496AF3);
    background: #FFF;
    color: var(--primary-primary, #496AF3);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 0%;
}

.nickBtn {
    width: 120px;
    height: 35px;
    flex-shrink: 0; 
    margin-left: 18px;
    margin-top: 22px;
    border-radius: 10px;
    border: 0;
    background: var(--gray-300, #E2E5EF);
    color: var(--gray-800, #737A8D);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.nickFalse{
    stroke-width: 2px;
    stroke: var(--secondary, #E13333);
    color: var(--secondary, #E13333);
    font-family: "Pretendard Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 26px;
    margin-top: 30px;

}
.vector {
    position: absolute;
    margin-top: 32px;
    margin-left: 7px;
}

.vector2 {
    position: absolute;
    margin-top: 33px;
    margin-left: 8px;
}

.nickTrue{
    color: var(--primary-primary, #496AF3);
    font-family: "Pretendard Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 7px;
    margin-top: 30px;

}

.outProfile {
    position: relative;
    overflow: hidden;
    width: 132px;
    height: 132px;
    flex-shrink: 0; 
    border-radius: 10px;
    border: 1.5px solid var(--gray-400, #BEC0C6);
    background: #FFF;
    margin-left: 59px;
    margin-top: 18px;
}

.selectImg {
    position: absolute;
    box-shadow: 10px 10px 50px 0px #0000001A;
    object-fit: cover;
}

.Imgtext {
    color: var(--gray-400, #BEC0C6);
font-family: "Pretendard Variable";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-left: 36px;
padding: 0%;
}

.pageContainer {
    position: relative;
    /* width: 1440px;  */
    height: 894px;
}

.flexSection1 {
    /* width: 1440px; */
    height: 347px;
    background: #456AE2;
    border: 0;
}

.flexSection2 {
    /* width: 1440px; */
    height: 1300px;
    background: #F3F5FA;
}

.errorMsg {
    color: #E13333;
font-family: "Pretendard Variable";
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;
 margin-left: 9px;
 margin-top: 29px;
}

.smile {
    margin-left: 58px;
    margin-top: 25px;
}
.anyLogins{
    display: flex;
}

.showPswbtn {
    position: absolute;
    border: #FFF;
    background-color: #FFF;
    margin-top: 32px;
    margin-left: 604px;
}









@media screen and (max-width: 786px) {
    .parent {
        position: relative;
        height: 100vh; /* 화면 전체 높이 */
      }
      
      .formContainer {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        width: 344px;
        height: 833px;
        border-radius: 10px;
        background: #FFF;
        box-shadow: 10px 10px 50px 0px rgba(0, 0, 0, 0.10);
      }
    
      .write1 {
        color: #FFF;
        font-family: "Pretendard Variable";
        font-size: 30px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-align: center;
        /* width: 156px; */
        height: 72px;
    }
    
    
    .logintext {
        color: var(--black, #191A1C);
    font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    width: 78px;
    height: 21px;
    margin-top: 18px;
    margin-left: 19px;
    padding: 0%;
    }
    
    .logintext2 {
        color: var(--black, #191A1C);
    font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    width: 150px;
    height: 21px;
    margin-top: 21px;
    margin-left: 19px;
    padding: 0%;
    }
    
    .logintext3 {
        color: var(--gray-400, #BEC0C6);
    font-family: "Pretendard Variable";
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 14px;
    margin-left: 19px;
    }
    
    .Input{
        width: 290px;
        height: 30px;
        flex-shrink: 0;
        border-radius: 10px;
        border: 1.5px solid var(--gray-400, #BEC0C6);
        background: #FFF;
        margin-left: 19px;
        margin-top: 2px;
        color: var(--black, #191A1C);
        font-family: "Pretendard Variable";
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 0%;
        padding-left: 13px;
    }
    
    .Input2{
        width: 290px;
        height: 30px;
        flex-shrink: 0;
        border-radius: 10px;
        border: 1.5px solid var(--gray-400, #BEC0C6);
        background: #FFF;
        margin-left: 19px;
        margin-top: 2px;
        padding-left: 13px;
    }
    
    .Input::placeholder {
        color: var(--gray-400, #BEC0C6);
        font-family: "Pretendard Variable";
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding-left: 0px;
    }
    
    
    .Input3{
        width: 105px;
        height: 30px;
        flex-shrink: 0;
        border-radius: 10px;
        border: 1.5px solid var(--gray-400, #BEC0C6);
        background: #FFF;
        margin-left: 19px;
        margin-top: 2px;
        color: var(--black, #191A1C);
        font-family: "Pretendard Variable";
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 0%;
        padding-left: 13px;
    }
    .verticalLine {
        border-top: 1px solid #E2E5EF;
        width: 272px;
        height: 1px;
        margin-top: 21px;
        margin-left: 36px;
        padding: 0%;
      }
      
    
    .Button1 {
        width: 312px;
        height: 40px;
        margin-top: 52px;
        margin-left: 17px;
        border-radius: 10px 0px 0px 0px;
        border-radius: 10px;
        border: #496AF3;
        background: var(--primary-primary, #496AF3);
        color: #FFF;
        font-family: "Pretendard Variable";
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        padding: 0%;
    }
    
    .Button2 {
        width: 566px;
        height: 50px;
        margin-top: 18px;
        margin-left: 59px;
        border-radius: 10px 0px 0px 0px;
        border: 1.5px 0px 0px 0px;
        border-radius: 10px;
        border: 1.5px solid var(--primary-primary, #496AF3);
        background: #FFF;
        color: var(--primary-primary, #496AF3);
        font-family: "Pretendard Variable";
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        padding: 0%;
    }
    
    .nickBtn {
        width: 60px;
        height: 25px;
        flex-shrink: 0; 
        margin-left: 8px;
        margin-top: 5px;
        border-radius: 10px;
        border: 0;
        background: var(--gray-300, #E2E5EF);
        color: var(--gray-800, #737A8D);
        font-family: "Pretendard Variable";
        font-size: 10px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
    
    .nickFalse{
        stroke-width: 2px;
        stroke: var(--secondary, #E13333);
        color: var(--secondary, #E13333);
        font-family: "Pretendard Variable";
        font-size: 8px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-left: 18px;
        margin-top: 11px;
    
    }
    .vector {
        position: absolute;
        margin-top: 10px;
        margin-left: 4px;
        width: 10px;
    }
    
    .vector2 {
        position: absolute;
        margin-top: 12px;
        margin-left: 5px;
        width: 8px;
    }
    
    .Vector3{
        width: 8px;
        height: 8px;
        margin-top: 8px;
        margin-right: 3px;
    }

    .nickTrue{
        color: var(--primary-primary, #496AF3);
        font-family: "Pretendard Variable";
        font-size: 8px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-left: 6px;
        margin-top: 5px;
    
    }
    
    .outProfile {
        position: relative;
        overflow: hidden;
        width: 82px;
        height: 82px;
        flex-shrink: 0; 
        border-radius: 10px;
        border: 1.5px solid var(--gray-400, #BEC0C6);
        background: #FFF;
        margin-left: 19px;
        margin-top: 18px;
    }
    
    .selectImg {
        position: absolute;
        box-shadow: 10px 10px 50px 0px #0000001A;
        object-fit: cover;
        width: 82px;
        height: 82px;
    }
    
    .Imgtext {
        color: var(--gray-400, #BEC0C6);
    font-family: "Pretendard Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 36px;
    padding: 0%;
    }
    
    .pageContainer {
        position: relative;
        /* width: 1440px;  */
        height: 894px;
    }
    
    .flexSection1 {
        /* width: 1440px; */
        height: 347px;
        background: #456AE2;
        border: 0;
    }
    
    .flexSection2 {
        /* width: 1440px; */
        height: 1300px;
        background: #F3F5FA;
    }
    
    .errorMsg {
        color: #E13333;
    font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
     margin-left: 9px;
     margin-top: 13px;
    }
    
    .smile {
        margin-left: 38px;
        margin-top: 12px;
        width: 20px;
        height: 20px;
    }
    .anyLogins{
        display: flex;
    }
    
    .showPswbtn {
        position: absolute;
        border: #FFF;
        background-color: #FFF;
        margin-top: 12px;
        margin-left: 284px;
    }
    

}
`;