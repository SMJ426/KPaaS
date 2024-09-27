import Link from 'next/link';
import styled from 'styled-components';

export default function ProfileInfo({ userProfile, nickName, postName }) {
  return (
    <StyledWrapper>
      <Link href={`/profile/${nickName}`} className="wrapper-profile-info">
        <img src={userProfile} alt="프로필 이미지" className="img-profile" />
        <div className="wrapper-name">
          <p className="nickname">{nickName}</p>
          <p className="postname">{postName}</p>
        </div>
      </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section`
  .wrapper-profile-info {
    display: flex;
    gap: 12px;
    padding: 12px 12px 0 12px;
    height: 64px;

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
`;
