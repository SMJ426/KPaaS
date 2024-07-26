import styled from 'styled-components';
import Image from 'next/image';
import { useDropdown } from '@compoents/components/payment/payDropdown';
import ChoosePayModal from '@compoents/components/payment/ChoosePay';

export default function PostDetails({ 
    post, 
    categoryMap, 
    formattedPrice, 
    accessToken, 
    postId, 
    likedBtnSrc, 
    handleLikeClick 
}) {
  const { showDropdown, handleOpenDropdown, dropdownRef } = useDropdown();


  return (
    <StyledWrapper>
      <div className="productImage">
        <Image
          src={post.imagePost}
          alt="상품 이미지"
          width={600}
          height={600}
          className="postImg"
        />
      </div>
      <div className="productDetails">
        <h1 className="nickNames">{post.nickName}</h1>
        <h1 className="productName">{post.postName}</h1>
        <p className="productPrice">{formattedPrice}원</p>
        <ul className="productInfo">
          <li>지역 : {post.location}</li>
          <li>강의 장소 : {categoryMap[post.categoryId]}</li>
          <li>모집 회원수 : {post.totalNumber}</li>
          <li>
            강의 기간 : {post.startAt} ~ {post.endAt}
          </li>
          <li>{post.postInfo}</li>
        </ul>
        <div className="verticalLine"></div>
        <div className="buttons">
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
};

const StyledWrapper = styled.main`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;

  .productImage {
  }

  .productDetails {
    width: 45%;
    margin-left: 50px;
  }

  .productName {
    font-size: 29px;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 15px;
  }

  .productPrice {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .productInfo {
    list-style-type: none;
    padding: 0;
  }

  .productInfo li {
    margin-bottom: 10px;
    color: #737a8d;
  }

  .buttons {
    display: flex;
    margin-top: 30px;
    justify-content: end;
  }

  .buyButton {
    padding: 10px 25px;
    background-color: #496af3;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
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

  .nickNames {
    color: var(--gray-800, #737a8d);
    font-family: 'Pretendard Variable';
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .prdName {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    color: var(--black, #191a1c);
    text-overflow: ellipsis;
    font-family: 'Pretendard Variable';
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    margin-top: 35px;
  }

  .verticalLine {
    border-top: 1px solid #e2e5ef;
    background: #f4f5f9;
    width: 100%;
    height: 1px;
    margin-top: 50px;
    padding: 0px 10px;
  }

  .price {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    color: var(--primary-primary, #496af3);
    text-overflow: ellipsis;
    font-family: 'Pretendard Variable';
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    margin-top: 30px;
  }
    .dropdown-container {
    position: relative;
    .btn-choose {
          display: flex;
          justify-content: center;
          align-items: center;

          background-color: #ffffff;
          border: none;
          font-family: 'Pretendard Variable';

          > img {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }
        }
  }
`;

