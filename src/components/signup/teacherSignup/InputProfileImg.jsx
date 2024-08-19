import React from 'react';
import styled from 'styled-components';

export default function InputProfileImg({ showimage, handleImageChange }) {
  return (
    <StyledWrapper>
      <label htmlFor="input-file" className="profile-img-container">
        <img src={showimage} alt="프로필이미지" className="profileImg" />
        <div className="img-down-btn">
          <img src="/images/png/icon-add-image.png" alt="프로필 등록" />
        </div>
      </label>
      <input
        type="file"
        name="image_URL"
        id="input-file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          handleImageChange(e);
        }}
      />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;

  .profile-img-container {
    position: relative;
    width: 120px;
    height: 120px;

    .profileImg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .img-down-btn {
    position: absolute;
    bottom: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;

    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #2e6ff2;
    background-color: #ffffff;

    cursor: pointer;

    > img {
      width: 24px;
      height: 24px;
    }
  }
`;
