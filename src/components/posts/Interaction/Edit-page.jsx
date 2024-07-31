'use client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import ImageUpload from './SmallInteraction/ImageUpload';
import FormSection from './SmallInteraction/FormSection';
import EditorSection from './SmallInteraction/EditorSection';
import DateSection from './SmallInteraction/DateSection';

import { PutPostData } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';

export default function EditpostForm({ postId, post, accessToken }) {
  const posts = post.post;
  const [postName, setPostName] = useState('');
  const [price, setPrice] = useState(null);
  const [images1, setImages1] = useState('');
  const [showImages1, setShowImages1] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [totalNumber, setTotalnumber] = useState('');
  const [TeacherInfo, setTeacherInfo] = useState('');
  const [location, setlocation] = useState('');

  const [startDate, setStartDate] = useState({
    year: '2024',
    month: '1',
    day: '1',
  });
  const [endDate, setEndDate] = useState({
    year: '2024',
    month: '1',
    day: '1',
  });

  const selectList = [
    { value: '3001', name: '가정방문' },
    { value: '3002', name: '수영장' },
    { value: '3003', name: '헬스장' },
  ];

  const selectlocationList = [
    '서울 강서',
    '서울 강동',
    '서울 강북',
    '서울 강남',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '경기도',
    '강원도',
    '충청도',
    '전라도',
  ];

  useEffect(() => {
    if (posts) {
      setPostName(posts.postName);
      setPrice(posts.price);
      setImages1(posts.imagePost);
      setShowImages1(posts.imagePost);
      setCategoryId(posts.categoryId);

      // 날짜 문자열을 파싱하여 날짜 객체 설정
      const parseDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return { year, month, day };
      };

      setStartDate(parseDate(posts.startAt));
      setEndDate(parseDate(posts.endAt));
      
      setTotalnumber(posts.totalNumber);
      setlocation(posts.location);
      setTeacherInfo(posts.postInfo);
    }
  }, [posts]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImages1(selectedImage);
    const imageUrls = URL.createObjectURL(selectedImage);
    setShowImages1(imageUrls);
  };

  const handleCategorySelect = (e) => {
    setCategoryId(e.target.value);
  };

  const handleLocationSelect = (e) => {
    setlocation(e.target.value);
  };

  const handleDateChange = (e, dateType, field) => {
    const value = e.target.value;
    if (dateType === 'start') {
      setStartDate((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    } else if (dateType === 'end') {
      setEndDate((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };

  const getFormattedDate = (date) => {
    const formattedMonth = date.month < 10 ? `0${date.month}` : date.month;
    const formattedDay = date.day < 10 ? `0${date.day}` : date.day;
    return `${date.year}-${formattedMonth}-${formattedDay}`;
  };

  const startDaysInMonth = Array.from(
    { length: new Date(startDate.year, startDate.month, 0).getDate() },
    (_, index) => index + 1
  );
  const endDaysInMonth = Array.from(
    { length: new Date(endDate.year, endDate.month, 0).getDate() },
    (_, index) => index + 1
  );

  async function handleSubmit(postData) {
    try {
      const response = await PutPostData(postId, postData, accessToken);
      if (response.state === 'Jwt Expired') {
        const newAccessToken = await RefreshAccessToken();
        await PutPostData(postId, postData, newAccessToken);
      }
    } catch (error) {
      console.error('게시물 수정에 실패했습니다:', error);
      alert('게시물 수정에 실패했습니다.');
    }
  }

  async function sendPostHandler(event) {
    event.preventDefault();

    try {
      const postData = {
        post_name: postName,
        price: parseInt(price),
        post_info: TeacherInfo,
        start_at: getFormattedDate(startDate),
        end_at: getFormattedDate(endDate),
        category_id: parseInt(categoryId),
        total_number: parseInt(totalNumber),
        location: location,
      };

      await handleSubmit(postData);
      const redirectUrl = 'http://localhost:3000';
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('에러 발생:', error);
      alert(
        '죄송합니다. 요청을 처리하는 동안 오류가 발생했습니다. 나중에 다시 시도해주세요.'
      );
    }
  }

  return (
    <StyledWrapper>
      <h1 className="title">PT 수정</h1>
      <form onSubmit={sendPostHandler} className="form-container">
        <div className="main-content">
          <ImageUpload
            showImages1={showImages1}
            handleImageChange={handleImageChange}
          />
          <div className="form-section">
            <FormSection
              postName={postName}
              setPostName={setPostName}
              price={price}
              setPrice={setPrice}
              categoryId={categoryId}
              handleCategorySelect={handleCategorySelect}
              selectList={selectList}
              location={location}
              handleLocationSelect={handleLocationSelect}
              selectlocationList={selectlocationList}
              totalNumber={totalNumber}
              setTotalnumber={setTotalnumber}
            />
            <DateSection
              startDate={startDate}
              endDate={endDate}
              handleDateChange={handleDateChange}
              startDaysInMonth={startDaysInMonth}
              endDaysInMonth={endDaysInMonth}
            />
          </div>
        </div>

        <EditorSection
          TeacherInfo={TeacherInfo}
          setTeacherInfo={setTeacherInfo}
        />

        <div className="button-container">
          <Link href="/">
            <button type="button" className="cancel-button">
              취소
            </button>
          </Link>
          <button type="submit" className="submit-button">
            수정하기
          </button>
        </div>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
  }

  .main-content {
    display: flex;
    gap: 40px;
    margin-bottom: 30px;
  }

  .form-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }

  .cancel-button,
  .submit-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .cancel-button {
    background-color: #f0f0f0;
  }

  .submit-button {
    background-color: #4caf50;
    color: white;
  }
`;
