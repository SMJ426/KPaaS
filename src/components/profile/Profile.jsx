'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LikegridComponent from '../bucket/Likegrid';
import ProductsComponent from './ProductsComponent';
import { RefreshAccessToken } from '@compoents/util/http';

import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";

export default function UserProfile({ userInfo, followerList, followingList, userproducts, accessToken }) {
  const [currentView, setCurrentView] = useState('likes');
  const router = useRouter();

  useEffect(() => {
    if (userInfo.state === 'Jwt Expired') {
      const refreshAccessToken = async () => {
        try {
          const newAccessToken = await RefreshAccessToken();
        } catch (error) {
          console.error('accessToken 재발급 실패', error);
        }
      };
      refreshAccessToken();
    } else {
    }
  }, [userInfo]);

  const defaultImage = "/images/kakaoImg.jpg";

  function handleEditProfileClick() {
    router.push('/myedit');
  }
  const showProducts = () => {
    setCurrentView('products');
  };

  const showLikes = () => {
    setCurrentView('likes');
  };


  return (
    <StyledWrapper>
        <div className="profileInfo">
          <div>
            <Image
              src={userInfo.profile_image || defaultImage}
              alt="이미지"
              width={200}
              height={200}
              className="profileImg"
              priority
            />
          </div>
          <div className="userInfo">
            <div className="profileNickName">
              {userInfo.nick_name}
            </div>
          </div>
          <div className="Followes">
            <div>
              <Popover showArrow={true} placement="bottom">
                <PopoverTrigger className="followButton">
                  <Button className="Followingbtn">팔로잉 {userInfo.following}</Button>
                </PopoverTrigger>

                <PopoverContent className="modal">
                  <ul>
                    {/* {followingList.map((following) => (
                      <li key={following.member_id}>
                        <div className="flex">
                          <Image src={following.image} alt="프로필 사진" width={15} height={15} priority className="followImg" />
                          <p className="names">{following.name}</p>
                        </div>
                      </li>
                    ))} */}
                  </ul>
                </PopoverContent>
              </Popover>
              <p className="profileName">{userInfo.user_name}</p>
              <p className="profileEmail">{userInfo.email}</p>
              <p className="profileMessage">{userInfo.member_info}</p>
            </div>
            <Popover showArrow={true} placement="bottom">
              <PopoverTrigger className="followButton2">
                <Button className="Followingbtn">
                  팔로워 {userInfo.follower}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="modal">
                {/* <ul>
                  {followerList.map((follower) => (
                    <li key={follower.member_id}>
                      <div className="flex">
                        <Image src={follower.image} alt="프로필 사진" width={15} height={15} priority className="followImg" />
                        <p className="names">{follower.name}</p>
                      </div>
                    </li>
                  ))}
                </ul> */}
              </PopoverContent>
            </Popover>
            <button className="EditBtn" onClick={handleEditProfileClick} >프로필 수정</button>
          </div>
        </div>
        <button onClick={showLikes} className={currentView === 'likes' ? "Button1" : "Button3"}>좋아요한 PT</button>
        <div>
            {userInfo.role === 'ROLE_TEACHER' && (
              <button onClick={showProducts} className={currentView === 'products' ? "Button2" : "Button4"}>게시된 PT</button>
            )}
        </div>
        



        <div className="verticalLine"></div>
        <div className="Lists">
          {currentView === 'likes' && <LikegridComponent nick_name={userInfo.nick_name} accessToken={accessToken} />}
          {currentView === 'products' && <ProductsComponent userproducts={userproducts} accessToken={accessToken} />}
        </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.header`

  .profileInfo {
    display: flex;
    justify-content: center;
  }
  .profileImg{
    border-radius: 90%;
    cursor: pointer;
  }
  .profileNickName{
    position: absolute;
    color: var(--black, #191A1C);
    font-family: "Pretendard Variable";
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 50px;
  }

  .EditBtn{
    position: absolute;
    cursor: pointer;
    margin-left: 250px;
    margin-top: -55px;
    width: 110px;
    height: 35px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--gray-800, #e8e9ec);
    color: var(--gray-400, #7b8196);
    font-family: "Pretendard Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border: 0;
  }
  
  .Followes{
    display: flex;
    margin-top: 60px;
  }

  .flex{
    display: flex;
  }

  .followButton {
    background-color: #FFFFFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: var(--gray-800, #000000);
    font-family: "Pretendard Variable";
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 50px;
    height: 35px;
  }

  .followButton2{
    background-color: #FFFFFF;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    color: var(--gray-800, #000000);
    font-family: "Pretendard Variable";
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 35px;
    margin-left: 15px;
  }

  .followImg{
    margin-left: 5px;
    margin-top: 3px;
    margin-right: 15px;
  }

  .profileName {
    margin-left: 50px;
    margin-top: 10px;
    color: var(--gray-400, #000000);
    font-family: "Pretendard Variable";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  
  .profileEmail {
    position: absolute;
    margin-left: 50px;  
    margin-top: 0px;
    color: var(--gray-400, #000000);
    font-family: "Pretendard Variable";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  
  .modal {
    background-color: #FFFFFF;
    z-index: 1000;
    flex-shrink: 0;
    padding: 10px;
    border-radius: 8px;
    filter: drop-shadow(10px 10px 50px rgba(0, 0, 0, 0.20));
    text-align: center;
    color: var(--gray-600, #808389);
    font-family: "Pretendard Variable";
  }

  .Button1{
    position: absolute;
    color: var(--primary-primary, #000000);
    font-family: "Pretendard Variable";
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #FFFFFF;
    border: 0;
    margin-left: 35%;
    margin-top: 70px;
  }

  .Button3{
    position: absolute;
    color: var(--gray-400, #9b9b9b);
    font-family: "Pretendard Variable";
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #FFFFFF;
    border: 0;
    margin-left: 35%;
    margin-top: 70px;
  }

  .Button2 {
    position: absolute;
    color: var(--gray-400, #000000);
    font-family: "Pretendard Variable";
    font-size: 25px; 
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #FFFFFF;
    border: 0;
    margin-left: 50%;
    margin-top: 70px;
  }

  .Button4 {
    position: absolute;
    color: var(--primary-primary, #9b9b9b);
    font-family: "Pretendard Variable";
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #FFFFFF;
    border: 0;
    margin-left: 50%;
    margin-top: 70px;
  }


  .verticalLine {
    position: absolute;
    border-top: 1px solid #E2E5EF;
    width: 50%;
    height: 1px;
    margin-top: 120px;
    margin-left: 30%;
    padding: 0%;
  }

  .Loading{
    margin-left: 40%;
    margin-top: 40%;
  }
  
  .profileMessage{
    color: var(--gray-400, #000000);
font-family: "Pretendard Variable";
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-left: 50px;
margin-top: 40px;
  }

  .Lists{
    margin-left: -200px;
    margin-top: 300px;
    height: 2000px;
  }





  @media screen and (max-width: 786px) {
  .profileInfo {
    display: flex;
    margin-top: 20px;
  }
  
  .profileImg{
    border-radius: 90%;
    cursor: pointer;
    width: 90px;
    height: 90px;
  }
  .profileNickName{
    color: var(--black, #191A1C);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 20px;
  }

  .EditBtn{
    margin-left: 100px;
    margin-top: -20px;
    width: 70px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--gray-200, #F4F5F9);
    color: var(--gray-400, #BEC0C6);
    font-family: "Pretendard Variable";
    font-size: 8px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border: 0;
  }
  
  .Followes{
    display: flex;
    margin-top: 20px;
  }

  .followButton {
    font-size: 10px;
    background-color: #FFFFFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: var(--gray-800, #737A8D);
    font-family: "Pretendard Variable";
font-style: normal;
font-weight: 400;
line-height: normal;
margin-left: 20px;
height: 30px;
  }
  
  .followButton2{
    background-color: #FFFFFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: var(--gray-800, #737A8D);
    font-family: "Pretendard Variable";
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 30px;
  }

  .profileName {
    margin-top: 0px;
    margin-left: 20px;
    color: var(--gray-400, #000000);
    font-family: "Pretendard Variable";
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 50px;
    height: 14px;
  }
  
  .profileEmail {
    position: absolute;
    margin-top: 0px;
    margin-left: 20px;
    color: var(--gray-400, #000000);
    font-family: "Pretendard Variable";
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .profileMessage{
    color: var(--gray-600, #000000);
font-family: "Pretendard Variable";
font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top: 15px;
margin-left: 20px;
  }
  
  .modal {
    background-color: #FFFFFF;
    z-index: 1000;
    flex-shrink: 0;
    padding: 10px;
    border-radius: 8px;
    filter: drop-shadow(10px 10px 50px rgba(0, 0, 0, 0.20));
    text-align: center;
    color: var(--gray-600, #808389);
    font-family: "Pretendard Variable";
  }

  .Button1{
    color: var(--primary-primary, #000000);
    font-family: "Pretendard Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #FFFFFF;
    border: 0;
    margin-top: 45px;
    margin-left: 90px;
  }

  .Button3{
    color: var(--gray-400, #9b9b9b);
    font-family: "Pretendard Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #FFFFFF;
    border: 0;
    margin-top: 45px;
    margin-left: 90px;
  }

  .Button2 {
    color: var(--gray-400, #000000);
    font-family: "Pretendard Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #FFFFFF;
    border: 0;
    margin-top: 45px;
    margin-left: 280px;
  }

  .Button4 {
    color: var(--primary-primary, #9b9b9b);
    font-family: "Pretendard Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #FFFFFF;
    border: 0;
    margin-top: 45px;
    margin-left: 280px;
  }


  .followImg{
    margin-left: 5px;
    margin-top: 0px;
    margin-right: 5px;
  }
  .names{
    width: 50px;
    font-size: 10px;
  }

  .verticalLine {
    position: absolute;
    border-top: 1px solid #E2E5EF;
    width: 85%;
    height: 2px;
    margin-top: 80px;
    margin-left: 10%;
    padding: 0%;
  }

  .Loading{
    margin-left: 40%;
    margin-top: 40%;
  }
  .Lists{
    margin-left: 0;
    margin-top: 20%;
  }


  }
`;
