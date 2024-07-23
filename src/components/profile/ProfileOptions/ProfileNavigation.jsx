import React from 'react';
import styled from 'styled-components';

export default function ProfileNavigation({
  currentView,
  setCurrentView,
  isTeacher,
}) {
  return (
    <StyledWrapper>
      <button
        onClick={() => setCurrentView('likes')}
        className={currentView === 'likes' ? 'onlikebtn' : 'offlikebtn'}
      >
        좋아요한 PT
      </button>
      {isTeacher && (
        <button
          onClick={() => setCurrentView('products')}
          className={currentView === 'products' ? 'onPostbtn' : 'offPostbtn'}
        >
          게시된 PT
        </button>
      )}
    </StyledWrapper>
  );
}
const StyledWrapper = styled.header`
    .onlikebtn {
    position: absolute;
    color: var(--primary-primary, #000000);
    font-family: 'Pretendard Variable';
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #ffffff;
    border: 0;
    margin-left: 35%;
    margin-top: 70px;
  }

  .offlikebtn {
    position: absolute;
    color: var(--gray-400, #9b9b9b);
    font-family: 'Pretendard Variable';
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #ffffff;
    border: 0;
    margin-left: 35%;
    margin-top: 70px;
  }

  .onPostbtn {
    position: absolute;
    color: var(--gray-400, #000000);
    font-family: 'Pretendard Variable';
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #ffffff;
    border: 0;
    margin-left: 50%;
    margin-top: 70px;
  }

  .offPostbtn {
    position: absolute;
    color: var(--primary-primary, #9b9b9b);
    font-family: 'Pretendard Variable';
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #ffffff;
    border: 0;
    margin-left: 50%;
    margin-top: 70px;
  }

`;