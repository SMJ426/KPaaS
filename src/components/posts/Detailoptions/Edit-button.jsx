'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';

export default function PutDetailButton({ className, postId, accessToken }) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/${postId}/edit`);
  };

  return (
    <StyledWrapper className={className} onClick={handleButtonClick}>
      수정
    </StyledWrapper>
  );
}

const StyledWrapper = styled.button`
  width: 100%;
  padding: 8px 12px;
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  color: #333;

  &:hover {
    background-color: #f0f0f0;
  }
`;