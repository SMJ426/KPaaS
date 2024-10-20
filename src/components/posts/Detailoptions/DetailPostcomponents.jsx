import styled from 'styled-components';
import Image from 'next/image';
import { useDropdown } from '@compoents/components/payment/payDropdown';
import ChoosePayModal from '@compoents/components/payment/ChoosePay';
import PutDetailButton from './Edit-button';
import DeletePostButton from './Delete-button';

export default function PostDetails({
  post,
  categoryMap,
  formattedPrice,
  accessToken,
  postId,
  likedBtnSrc,
  handleLikeClick,
  canEditOrDelete,
}) {
  const { showDropdown, handleOpenDropdown, dropdownRef } = useDropdown();

  return (
    <StyledWrapper>
      <div className="productImage">
        <Image
          src={post.image_post}
          alt="상품 이미지"
          width={400}
          height={400}
          className="postImg"
        />
      </div>

      <div className="productDetails">
        <h2 className="nickNames">{post.nick_name}</h2>
        <h1 className="productName">{post.post_name}</h1>
        <p className="productPrice">{formattedPrice}원</p>
        <ul className="productInfo">
          <li>- 지역: {post.location}</li>
          <li>- 강의 장소: {categoryMap[post.category_id]}</li>
          <li>- 모집 회원수: {post.total_number}</li>
          <li className="lecturePeriod">
            - 강의 기간: <strong>{post.start_at}</strong> ~{' '}
            <strong>{post.end_at}</strong>
          </li>
          <li>{post.post_info}</li>
        </ul>
        <div className="verticalLine"></div>
        <div className="buttons">
          {canEditOrDelete && (
            <>
              <PutDetailButton postId={postId} accessToken={accessToken} />
              <DeletePostButton postId={postId} accessToken={accessToken} />
            </>
          )}
          <div className="dropdown-container" ref={dropdownRef}>
            <button onClick={handleOpenDropdown} className="btn-choose">
              <img src="/images/svg/icon-shopping-cart.svg" alt="구매하기" />
            </button>
            {showDropdown && (
              <ChoosePayModal
                accessToken={accessToken}
                postId={postId}
                post={post}
              />
            )}
          </div>
          <button className="btnlike" onClick={handleLikeClick}>
            <img src={likedBtnSrc} className="likeimg" alt="좋아요 버튼" />
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  font-family: 'Pretendard';

  .productDetails {
    max-width: 700px;
    max-height: 700px;
    overflow-y: auto;
  }

  .nickNames {
    font-size: 20px;
    color: #4a4a4a;
  }

  .productName {
    font-size: 34px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333333;
  }

  .productPrice {
    font-size: 26px;
    font-weight: bold;
    color: #e60023;
    margin-bottom: 20px;
  }

  .productInfo {
    list-style-type: none;
    padding: 0;
    font-size: 16px;
    color: #737a8d;
    line-height: 1.8;
  }

  .productInfo li {
    margin-bottom: 10px;
  }

  .lecturePeriod {
    font-size: 16px;
    color: #4a4a4a;
  }

  .lecturePeriod strong {
    color: #333;
    font-weight: bold;
  }

  .verticalLine {
    border-top: 1px solid #e2e5ef;
    width: 100%;
    margin-top: 30px;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }

  .btnlike {
    background-color: #ffffff;
    border: none;
    margin-left: 20px;
  }

  .likeimg {
    width: 20px;
    height: 20px;
  }

  .dropdown-container {
    position: relative;
    .btn-choose {
      display: flex;
      justify-content: center;
      align-items: center;

      background-color: #ffffff;

      border: none;

      > img {
        width: 25px;
        height: 25px;
        cursor: pointer;
      }
    }
  }
`;
