'use client';
import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import ImageUpload from './SmallInteraction/ImageUpload';
import FormSection from './SmallInteraction/FormSection';
import EditorSection from './SmallInteraction/EditorSection';
import DateSection from './SmallInteraction/DateSection';

import { sendpostData } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';

export default function PostForm({ accessToken }) {
  const [postName, setPostName] = useState('');
  const [price, setPrice] = useState('');
  const [images1, setImages1] = useState('/images/png/icon-add-image.png');
  const [showImages1, setShowImages1] = useState('/images/defaultIMG.png');
  const [categoryId, setCategoryId] = useState('3001');
  const [totalNumber, setTotalnumber] = useState('');
  const [TeacherInfo, setTeacherInfo] = useState('');
  const [location, setlocation] = useState('서울 강서');

  const [startDate, setStartDate] = useState({
    year: '2024',
    month: '8',
    day: '1',
  });
  const [endDate, setEndDate] = useState({
    year: '2024',
    month: '8',
    day: '1',
  });

  const [errors, setErrors] = useState({
    postName: '',
    price: '',
    totalNumber: '',
    TeacherInfo: '',
    location: '',
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

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = selectedImage;
    setImages1(imageUrl);
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

  const validateFields = () => {
    let valid = true;
    const newErrors = {
      postName: '',
      price: '',
      totalNumber: '',
      TeacherInfo: '',
      location: '',
    };

    if (!postName) {
      newErrors.postName = '상품명을 입력해주세요.';
      valid = false;
    }
    if (!price) {
      newErrors.price = '가격을 입력해주세요.';
      valid = false;
    }
    if (!totalNumber) {
      newErrors.totalNumber = '모집 회원 수를 입력해주세요.';
      valid = false;
    }
    if (!TeacherInfo) {
      newErrors.TeacherInfo = 'PT 내용을 입력해주세요.';
      valid = false;
    }
    if (!location) {
      newErrors.location = '지역을 지정해주세요.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  async function sendPostHandler(event) {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      const formData = new FormData();
      const req = {
        post_name: postName,
        price: parseInt(price),
        post_info: TeacherInfo,
        category_id: parseInt(categoryId),
        start_at: getFormattedDate(startDate),
        end_at: getFormattedDate(endDate),
        total_number: parseInt(totalNumber),
        location: location,
      };
      formData.append(
        'req',
        new Blob([JSON.stringify(req)], { type: 'application/json' })
      );
      formData.append('img', images1);

      const response = await sendpostData(formData, accessToken);
      if (response.state === 'Jwt Expired') {
        const newAccessToken = await RefreshAccessToken();
        await sendpostData(formData, newAccessToken);
      }
      const redirectUrl = 'http://localhost:3000';
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('에러 발생:', error);
    }
  }

  return (
    <StyledWrapper>
      <h1 className="title">PT 등록</h1>
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
              errors={errors}
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
          error={errors.TeacherInfo}
        />

        <div className="button-container">
          <Link href="/">
            <button type="button" className="cancel-button">
              취소
            </button>
          </Link>
          <button type="submit" className="submit-button">
            등록하기
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
