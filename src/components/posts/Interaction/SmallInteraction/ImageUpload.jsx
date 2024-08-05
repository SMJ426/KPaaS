import React from 'react';
import styled from 'styled-components';

export default function ImageUpload({ showImages1, handleImageChange }) {
  return (
    <StyledWrapper>
      <h2>PT 소개 이미지</h2>
      <div className="image-upload">
        <label htmlFor="images1" className="profile-img-container">
          <img src={showImages1} alt="프로필이미지" className="profileImg" />
        </label>
        <input
          type="file"
          id="images1"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>
      <p className="image-notice">이미지는 강의 등록 시 수정 불가합니다.</p>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`

    .profile-img-container {
    position: relative;
    width: 120px;
    height: 120px;

    .profileImg {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }

   .image-section {
    flex: 1;
  }

  .image-upload {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
  }

  .preview-image {
    max-width: 100%;
    height: auto;
  }

  .image-notice {
    font-size: 12px;
    color: #666;
    margin-top: 10px;
  }
`;
