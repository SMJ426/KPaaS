'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';
import styled from "styled-components";
import Link from "next/link";
import ProductsComponent from "./ProductsComponent";
import LikegridComponent from '../bucket/Likegrid';
import { followUser } from "@compoents/util/http";
import { RefreshAccessToken } from "@compoents/util/http";

export default function OtherProfileform({ 
  userInfo, 
  nick_name, 
  accessToken, 
  followerList,
  followingList,
  userproducts,
  isFollowing
}) {
  const [currentView, setCurrentView] = useState('likes');
  const [isfollowerModalOpen, setIsfollowModalOpen] = useState(false);
  const [isfollowingModalOpen, setIsfollowingModalOpen] = useState(false);
  const [isfollow, setfollowing] = useState(isFollowing);

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


  // isfollowing false -> 팔로우 안된거
  const handleFollow = async () => {
    if (isfollow === false) {
      try {
        const response = await followUser(accessToken, userInfo.email);
        console.log('팔로우 요청이 성공했습니다.');
        setfollowing(true);
      } catch (error) {
        console.error('팔로우 요청 중 오류가 발생했습니다.', error);
      }
    } else {
      alert('이미 팔로우 하셨습니다.');
    }
  };

  const showProducts = () => {
    setCurrentView('products');
  };

  const showLikes = () => {
    setCurrentView('likes');
  };



  return (
      <StyledWrapper>
        <div className="profileInfo">
          <div >
            <Image
              src={userInfo.profile_image || '/defaultImg.jpg'}
              alt="이미지"
              width={200}
              height={200}
              className="profileImg"
            />
          </div>
          <div className="userInfo">
            <div className="profileNickName">
              {userInfo.nick_name}
            </div>
          </div>
          <div className="Followes">
          <div>
            <button
              className="Followingbtn"
              onClick={() => setIsfollowingModalOpen(true)}
            >
              팔로잉 {userInfo.following}
            </button>
            <div className="modaloverlay" {...(isfollowingModalOpen ? { show: true } : {})}>
              <div className="modalcontent">
                <button className="clostbtn" onClick={() => setIsfollowingModalOpen(false)}>
                  X
                </button>
                <ul className="modalList">
                  {followingList.map((following) => (
                    <Link 
                      key={following.member_id}
                      href={`/profile/${following.nick_name}`}
                      className="modalListItem"
                      >
                      <div className="flex">
                        <Image
                          src={following.profile_image}
                          alt="프로필 사진"
                          width={50}
                          height={50}
                          priority
                          className="followImg"
                        />
                        <p className="names">
                          {following.user_name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            <p className="profileName">{userInfo.user_name}</p>
            <p className="profileEmail">{userInfo.email}</p>
            <p className="profileMessage">{userInfo.member_info}</p>
          </div>
          <button
            className="Followingbtn"
            onClick={() => setIsfollowModalOpen(true)}
          >
            팔로워 {userInfo.follower}
          </button>
          <div className="modaloverlay" {...(isfollowerModalOpen ? { show: true } : {})}>
            <div className="modalcontent">
              <button className="closebtn" onClick={() => setIsfollowModalOpen(false)}>
                X
                </button>
              <ul className="modalList">
                {followerList.map((follower) => (
                  <Link 
                  key={follower.member_id} 
                  href={`/profile/${following.nick_name}`}
                  className="modalListItem"
                  >
                    <div className="flex">
                      <Image
                        src={follower.image}
                        alt="프로필 사진"
                        width={15}
                        height={15}
                        priority
                        className="followImg"
                      />
                      <p className="names">{follower.name}</p>
                    </div>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
            {isfollow ? (
              <button onClick={handleFollow} className="profileBtn">
                팔로잉
              </button>
            ) : (
              <button onClick={handleFollow} className="profileBtned">
                팔로우
              </button>
            )}
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
        {currentView === 'likes' && (
          <LikegridComponent
            nick_name={userInfo.nick_name}
            accessToken={accessToken}
          />
        )}
        {currentView === 'products' && (
          <ProductsComponent
            userproducts={userproducts}
            accessToken={accessToken}
          />
        )}
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
  background: var(--gray-200, #F4F5F9);
  color: var(--gray-400, #BEC0C6);
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

.Followingbtn {
    position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  appearance: none;
  user-select: none;
  white-space: nowrap;
  font-weight: normal;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  padding-left: var(--unit-4);
  padding-right: var(--unit-4);
  min-width: var(--unit-20);
  height: var(--unit-10);
  font-size: var(--text-small);
  gap: var(--unit-2);
  border-radius: var(--rounded-medium);
  background-color: var(--bg-default);
  color: var(--text-default-foreground);
  z-index: 10;
  transition:
    transform 0.2s,
    colors 0.2s,
    opacity 0.2s;
  &:hover {
    opacity: var(--opacity-hover);
  }
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: var(--gray-800, #000000);
  font-family: 'Pretendard Variable';
  font-size: 19px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 50px;
  height: 35px;
  }

  .modaloverlay {
    display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  }

  .modalcontent{
    position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 1000;
  }

  .closebtn{
    position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  }

  .modalList{
    list-style: none;
  margin: 0;
  padding: 0;
  }

  .modalListItem{
    margin: 8px 0;
  display: flex;
  align-items: center;
  }

  .followImg {
    margin-left: 5px;
    margin-top: 3px;
    margin-right: 15px;
    border-radius: 50%;
  }
  .names{
  margin: 0;
  font-size: 25px;
  margin-top: 15px;
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
  width: 60%;
  height: 1px;
  margin-top: 120px;
  margin-left: 13%;
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

.Lists {
    margin-top: 200px;
    height: 2000px;
  }

.profileBtn{
  margin-left: 0px;
  margin-top: -60px;
  width: 113px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--gray-200, #F4F5F9);
  color: var(--gray-400, #BEC0C6);
  font-family: "Pretendard Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: 0;
}

.profileBtned{
  margin-left: 0px;
  margin-top: -60px;
  width: 113px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--gray-200, #2945b7c7);
  color: var(--gray-400, #fff);
  font-family: "Pretendard Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: 0;
}


    @media screen and (max-width: 786px) {
      .profileInfo {
        display: flex;
        margin-top: 20px;
      }
      .profileImg{
        
        margin-left: 100px;
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
    
      .profileBtn{
        margin-left: 80px;
        margin-top: -20px;
        width: 50px;
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
        color: var(--gray-400, #BEC0C6);
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
        color: var(--gray-400, #BEC0C6);
        font-family: "Pretendard Variable";
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
      }
    
      .Button1{
        color: var(--primary-primary, #496AF3);
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
        color: var(--gray-400, #BEC0C6);
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
        color: var(--gray-400, #BEC0C6);
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
        color: var(--primary-primary, #496AF3);
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
    
    
    
      .verticalLine {
        position: absolute;
        border-top: 1px solid #E2E5EF;
        width: 85%;
        height: 2px;
        margin-top: 80px;
        margin-left: 30px;
        padding: 0%;
      }
    
      .profileLoading {
        font-size: 16px;
      }
      .Loading{
        margin-left: 40%;
        margin-top: 40%;
      }
      
      .Lists{
        margin-left: 0;
        margin-top: 40%;
      }

      }
`;