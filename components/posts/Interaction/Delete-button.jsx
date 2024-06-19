'use client';
import { useState } from 'react';
import { DeletePost } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';
import styles from './Delete-button.module.css';

export default function DeletePostButton({ productId, accessToken }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function deletePostDataHandler() {
    setIsDeleting(true);
    const response = await DeletePost(productId, accessToken);
    if (response.state == 'Jwt Expired') {
      const NewaccessToken = await RefreshAccessToken();
      await DeletePost(productId, NewaccessToken);
    }
    setIsDeleting(false);
    window.location.href = '/';
  }

  return (
    <button className={styles.btn} onClick={deletePostDataHandler} disabled={isDeleting}>
      {isDeleting ? '삭제 중...' : '삭제'}
    </button>
  );
}

// .btn{
//   width: 65px;
//   height: 25px;
//   border: 0;
//   border-radius: 10px;
//   margin-left: 83%;
//   margin-bottom: 10px;
//   margin-top: 10px;
// }