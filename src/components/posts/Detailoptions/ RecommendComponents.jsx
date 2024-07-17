'use client';
import styled from 'styled-components';
import Link from 'next/link';
import Chatting from '@compoents/components/chatting/Chatting';
import Payments from '@compoents/components/payment/payments';

export default function Recommendations({
  postList,
  accessToken,
  postpage,
  likedBtnSrc,
  handleLikeClick,
}) {
  return (
    <StyledWrapper>
      <h2 className="recommendtitle">추천 강의</h2>
      <div className="recommendationGrid">
        {postList &&
          postList.length > 0 &&
          postList
            .filter((posts) => posts.state == 0)
            .map((posts) => (
              <div key={posts.postId} className="postItem">
                <Link
                  href={`/profile/${posts.nickName}`}
                  className="wrapper-profile-info"
                >
                  <img
                    src={posts.userProfile}
                    alt="프로필 이미지"
                    className="img-profile"
                  />
                  <div className="wrapper-name">
                    <p className="nickname">{posts.nickName}</p>
                    <p className="postname">{posts.postName}</p>
                  </div>
                </Link>

                <div className="wrapper-bottom">
                  <Link
                    href={`/${postpage}/${posts.postId}`}
                    className="wrapper-img-info"
                  >
                    <img
                      src={posts.imagePost}
                      alt="상품 이미지"
                      className="img-post"
                    />
                    <span className="post_info">{posts.postInfo}</span>
                  </Link>

                  <div className="wrapper-btns">
                    <div className="wrapper-price">
                      <p>수강비</p>
                      <span>{posts.price}원</span>
                    </div>

                    {/* 좋아요 버튼 */}
                    <div className="wrapper-info-btns">
                      <button className="btn-like" onClick={handleLikeClick}>
                        <img src={likedBtnSrc} alt="좋아요 버튼" />
                      </button>
                      <Chatting />
                      <Payments
                        accessToken={accessToken}
                        postId={posts.postId}
                        post={posts}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section`
  margin-top: 60px;

  .recommendtitle {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .recommendationGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  button {
    cursor: pointer;
  }
  .postItem {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 290px;
    height: 380px;
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);
  }

  .wrapper-profile-info {
    display: flex;
    gap: 12px;
    padding: 12px 12px 0 12px;

    .img-profile {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .wrapper-name {
      display: flex;
      flex-direction: column;
      justify-items: center;

      .nickname {
        font-size: 15px;
        font-weight: bold;
        font-family: 'Pretendard';
        color: #29363d;
      }
      .postname {
        font-size: 12px;
        font-weight: 500;
        font-family: 'Pretendard';
        color: #5a6a72;
      }
    }
  }

  .wrapper-bottom {
    padding: 12px 12px 0 12px;

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
      }
    }

    .wrapper-btns {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;

      .wrapper-price {
        display: flex;
        gap: 8px;
        > p {
          font-weight: bold;
          color: #29363d;
        }
        > span {
          color: #29363d;
        }

        span,
        p {
          font-family: 'Pretendard';
        }
      }

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
    }
  }

  @media screen and (max-width: 2000px) {
    .recommendationGrid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media screen and (max-width: 1625px) {
    .recommendationGrid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 1200px) {
    .recommendationGrid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 900px) {
    .recommendationGrid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
