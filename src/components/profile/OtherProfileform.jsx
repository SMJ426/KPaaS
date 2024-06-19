'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';
import styles from './OtherProfileform.module.css'
import ProductsComponent from "./ProductsComponent";
import LikegridComponent from '../bucket/Likegrid';
import { followUser } from "@compoents/util/http";
import { RefreshAccessToken } from "@compoents/util/http";

import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";

export default function OtherProfileform({ userInfo, nick_name, accessToken, followerList, followingList, userproducts, isFollowing }) {
  const [currentView, setCurrentView] = useState('products');
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
    <div className={styles.profileContainer}>

      <>
        <div className={styles.profileInfo}>
          <div >
            <Image
              src={userInfo.image || '/defaultImg.jpg'}
              alt="이미지"
              width={200}
              height={200}
              className={styles.profileImg}
            />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.profileNickName}>
              {userInfo.nick_name}
            </div>
          </div>
          <div className={styles.Followes}>
            <div>
              <Popover showArrow={true} placement="bottom">
                <PopoverTrigger className={styles.followButton}>
                  <Button className={styles.Followingbtn}>팔로잉 {userInfo.following}</Button>
                </PopoverTrigger>
                <PopoverContent className={styles.modal}>
                  {followingList.map((following) => (
                    <ul key={following.member_id}>
                      <div className={styles.flex}>
                        <Image src={following.image} alt="프로필 사진" width={15} height={15} priority className={styles.followImg} />
                        <p className={styles.names}>{following.name}</p>
                      </div>
                    </ul>
                  ))}
                </PopoverContent>
              </Popover>
              <p className={styles.profileName}>{userInfo.name}</p>
              <p className={styles.profileEmail}>{userInfo.email}</p>
            </div>
            <Popover showArrow={true} placement="bottom">
              <PopoverTrigger className={styles.followButton2}>
                <Button className={styles.Followingbtn}>
                  팔로워 {userInfo.follower}
                </Button>
              </PopoverTrigger>
              <PopoverContent className={styles.modal}>
                {followerList.map((follower) => (
                  <ul key={follower.member_id}>
                    <div className={styles.flex}>
                      <Image src={follower.image} alt="프로필 사진" width={15} height={15} priority className={styles.followImg} />
                      <p className={styles.names}>{follower.name}</p>
                    </div>
                  </ul>
                ))}
              </PopoverContent>
            </Popover>
            {isfollow ? (
              <button onClick={handleFollow} className={styles.profileBtn}>
                팔로잉
              </button>
            ) : (
              <button onClick={handleFollow} className={styles.profileBtned}>
                팔로우
              </button>
            )}
          </div>
        </div>
        <button onClick={showProducts} className={currentView === 'products' ? styles.Button1 : styles.Button3}>판매 물품</button>
        <button onClick={showLikes} className={currentView === 'likes' ? styles.Button4 : styles.Button2}>좋아요 목록</button>
        <div className={styles.verticalLine}></div>
        <div className={styles.Lists}>
          {currentView === 'products' && <ProductsComponent userproducts={userproducts} accessToken={accessToken} />}
          {currentView === 'likes' && <LikegridComponent nick_name={userInfo.nick_name} accessToken={accessToken} />}
        </div>

      </>
    </div>
  );
};
