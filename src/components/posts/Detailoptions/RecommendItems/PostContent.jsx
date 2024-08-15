import Link from 'next/link';
import styled from 'styled-components';

export default function PostContent({
  postId,
  imagePost,
  postInfo,
  
}) {
  return (
    <StyledWrapper>
      <Link href={`/${postId}`} className="wrapper-img-info">
        <img src={imagePost} alt="상품 이미지" className="img-post" />
        <span className="post_info">{postInfo}</span>
      </Link>
    </StyledWrapper>
  );
}


const StyledWrapper = styled.section`
    
    .wrapper-img-info {
      display: flex;
      flex-direction: column;
      gap: 12px;
      .img-post {
        width: 100%;
        height: 196px;
        object-fit: cover;
      }
      span,
      p {
        font-family: 'Pretendard';
      }
      .post_info {
        color: #5a6a72;
        font-size: 12px;
        line-height: 20px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 20px;
      }
    }
      
`;