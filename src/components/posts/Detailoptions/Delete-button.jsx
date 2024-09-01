'use client';
import { useState } from 'react';
import { DeletePost } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';
import styled from 'styled-components';

export default function DeletePostButton ({ className, postId, accessToken }){
  const [isDeleting, setIsDeleting] = useState(false);

  async function deletePostDataHandler() {
    setIsDeleting(true);
    const response = await DeletePost(postId, accessToken);
    if (response.state === 'Jwt Expired') {
      const NewaccessToken = await RefreshAccessToken();
      await DeletePost(postId, NewaccessToken);
    }
    setIsDeleting(false);
    window.location.href = '/';
  }

  return (
    <StyledWrapper
      className={className}
      onClick={deletePostDataHandler}
      disabled={isDeleting}
    >
      {isDeleting ? '삭제 중...' : '삭제'}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.button`
  font-size: 17px;
  font-weight: bold;
  padding: 8px 12px;
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  color: #ff4d4f;
  margin-right: 10px;

  &:hover {
    background-color: #fff1f0;
  }

  &:disabled {
    color: #d9d9d9;
    cursor: not-allowed;
  }
`;