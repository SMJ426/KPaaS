import Chatting from '@compoents/components/chatting/Chatting';
import Payment from '@compoents/components/payment/payment';
import styled from 'styled-components';

export default function ActionButtons({
  likedBtnSrc,
  handleLikeClick,
  accessToken,
  postId,
  post,
}) {
  return (
    <StyledWrapper>
      <div className="wrapper-info-btns">
        <button className="btn-like" onClick={handleLikeClick}>
          <img src={likedBtnSrc} alt="좋아요 버튼" />
        </button>
        <Chatting />
        <Payment accessToken={accessToken} postId={postId} post={post} />
      </div>
    </StyledWrapper>
  );
}


const StyledWrapper = styled.section`
    .wrapper-info-btns {
        display: flex;
        gap: 9px;

        .btn-like {
          background-color: #ffffff;
          border: none;
          > img {
            width: 20px;
            height: 20px;
          }
        }
      }
`;