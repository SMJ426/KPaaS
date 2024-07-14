'use client';
import DeletePostButton from '@compoents/components/posts/Interaction/Delete-button';
import styles from './PostDetailContainers.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Payment from "@compoents/components/payment/payment";
import { useState } from 'react';
import { Likepost } from '@compoents/util/post-util';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { IoIosMenu } from "react-icons/io";
import PutDetailbutton from '@compoents/components/posts/Interaction/Edit-button';


export default function PostDetailContainers({ postId, postpage, post, postList, accessToken }) {
  const [liked, setLiked] = useState(false);
  const handleLikeClick = async () => {
    try {
      const response = await Likepost(accessToken, postId);
      setLiked(true);
      if (response && response.status === 200) {
        console.log(response.message);
      }
    } catch (error) {
      console.error('좋아요 요청을 보내는 중 오류가 발생했습니다.', error);
    }
  };

  const linkProfile = `/profile/${post.nickName}`;

  return (
    <>
    {postList.me && (
      <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          <IoIosMenu />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
        <DropdownItem key="Edit"><PutDetailbutton postpage={postpage} postId={postId} accessToken={accessToken} /></DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
        <DeletePostButton postpage={postpage} postId={postId} accessToken={accessToken} />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    )}
      <div className={styles.postForm}>
        <div className={styles.postCtr}>
          <Image src={post.imagePost} alt='상품 이미지' width={600} height={600} className={styles.postImg} />
        </div>
        <Link href={linkProfile} className={styles.profiles}>
          <Image src={post.userProfile} alt='프로필 이미지' width={78} height={78} className={styles.ProImg} />
          <p className={styles.nickNames}>{post.nickName}</p>
        </Link>
        <div className={styles.verticalLine}></div>
        <div className={styles.prdName}>{post.postName}</div>
        <div className={styles.price}>{post.price}원</div>
        <div className={styles.buttons}>
        <button className={`${styles.like} ${liked ? styles.liked : ''}`} onClick={handleLikeClick}>
          좋아요 ♡
        </button>
          <Payment
            accessToken={accessToken}
            postId={postId}
            post={post}
          />
        </div>
        {postList.postList && postList.postList.length > 0 && (
          <>
            <div className={styles.anotherLine}></div>
            <div>
              <p className={styles.recomePrd}>추천 상품</p>
              <ul className={styles.postsGrid}>
                {postList && postList.postList
                .filter(posts => posts.state == 1)
                .map((posts) => (
                  <div key={posts.postId} className={styles.postItem}>
                    <Link href={`/${postpage}/${postId}`} style={{ textDecoration: "none" }}>
                      <div><Image src={posts.imagepost || '/defaultImg.jpg'} alt="상품" width={350} height={350} className={styles.ListImgs} /></div>
                      <div className={styles.ListprdName}>{posts.postName}</div>
                      <div className={styles.ListPrice}>{posts.price}원</div>
                    </Link>
                  </div>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}