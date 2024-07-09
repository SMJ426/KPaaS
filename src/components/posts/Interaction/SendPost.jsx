'use client';
import { useState } from 'react';
import styles from './SendPost.module.css';
import Image from 'next/image';

import { sendpostData } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';

export default function PostForm({ accessToken }) {

  const [postName, setPostName] = useState('');
  const [price, setPrice] = useState('');
  const [images1, setImages1] = useState('/images/png/SendDfImg.png');
  const [showImages1, setShowImages1] = useState('/images/png/SendDfImg.png');
  const [categoryId, setCategoryId] = useState('3001');
  const [totalNuber, setTotalnumber] = useState('');
  const [TeacherInfo, setTeacherInfo] = useState('');

  const [startDate, setStartDate] = useState({ year: '2024', month: '1', day: '1' });
  const [endDate, setEndDate] = useState({ year: '2024', month: '1', day: '1' });

  const selectList = [
    { value: "3001", name: "음료" },
    { value: "3002", name: "음식" },
    { value: "3003", name: "영화 관람권" },
    { value: "3004", name: "모바일 교환권" },
    { value: "3005", name: "상품권" },
    { value: "3006", name: "기타" },
  ];

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = selectedImage;
    setImages1(imageUrl);
    const imageUrls = URL.createObjectURL(selectedImage);
    setShowImages1(imageUrls);
  };

  const handleSelect = (e) => {
    setCategoryId(e.target.value);
  };

  const handleDateChange = (e, dateType, field) => {
    const value = e.target.value;
    if (dateType === 'start') {
      setStartDate(prevState => ({
        ...prevState,
        [field]: value
      }));
    } else if (dateType === 'end') {
      setEndDate(prevState => ({
        ...prevState,
        [field]: value
      }));
    }
  };

  const getFormattedDate = (date) => {
    const formattedMonth = date.month < 10 ? `0${date.month}` : date.month;
    const formattedDay = date.day < 10 ? `0${date.day}` : date.day;
    return `${date.year}-${formattedMonth}-${formattedDay}`;
  };

  const startDaysInMonth = Array.from({ length: new Date(startDate.year, startDate.month, 0).getDate() }, (_, index) => index + 1);
  const endDaysInMonth = Array.from({ length: new Date(endDate.year, endDate.month, 0).getDate() }, (_, index) => index + 1);

  async function sendPostHandler(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      const req = {
        "post_name": postName,
        "price": parseInt(price),
        "category_id": parseInt(categoryId),
        "start_at": getFormattedDate(startDate),
        "end_at": getFormattedDate(endDate),
      }
      formData.append('req', new Blob([JSON.stringify(req)], { type: "application/json" }));
      formData.append('img', images1);
      const response = await sendpostData(formData, accessToken);
      if (response.state === 'Jwt Expired') {
        const newAccessToken = await RefreshAccessToken();
        await sendpostData(formData, newAccessToken);
      }
      const redirectUrl = "http://localhost:3000";
      window.location.href = redirectUrl;
    }
    catch (error) {
      console.error('에러 발생:', error);
    }
  }

  return (
    <>
      <section className={styles.formContainer}>
        <form onSubmit={sendPostHandler} className={styles.minis}>

          <div className={styles.minis}>
            <label className={styles.imglabel}>강의 소개</label>
            <label htmlFor='images1' className={styles.label}>
              <Image src={showImages1} alt="상품 이미지" width="760" height="760" className={styles.selectImg} />
            </label>
            <input
              className={styles.inputField}
              type='file'
              id='images1'
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <div className={styles.NotEditImg}>이미지는 강의 등록 시 수정 불가합니다.</div>
          <div className={styles.margins}>
            <label className={styles.label}>카테고리</label>
            <select
              className={styles.inputFielded}
              id='categoryId'
              value={categoryId}
              onChange={handleSelect}
            >
              {selectList.map((item) => (
                <option className={styles.options} value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.margins}>
            <label htmlFor='postname' className={styles.label}>강의제목</label>
            <input
              className={styles.inputField}
              type='text'
              id='postname'
              required
              value={postName}
              onChange={(event) => setPostName(event.target.value)}
            />
          </div>
          <div className={styles.flexmargins}>
            <label htmlFor='price' className={styles.label}>가격</label>
            <input
              className={styles.inputFielded}
              type='text'
              id='price'
              required
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <label htmlFor='price' className={styles.label}>가격</label>
            <input
              className={styles.inputFielded}
              type='text'
              id='price'
              required
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className={styles.margins}>
            <label htmlFor='start' className={styles.label}>시작 기간 (년-월-일)</label>
            <div className={styles.inputFieldRow}>
              <select
                className={styles.inputFieldSmall}
                id='startYear'
                required
                value={startDate.year}
                onChange={(e) => handleDateChange(e, 'start', 'year')}
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={2024 + index} value={2024 + index}>{2024 + index}년</option>
                ))}
              </select>
              -
              <select
                className={styles.inputFieldSmalls}
                id='startMonth'
                required
                value={startDate.month}
                onChange={(e) => handleDateChange(e, 'start', 'month')}
              >
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>{index + 1}월</option>
                ))}
              </select>
              -
              <select
                className={styles.inputFieldSmalls}
                id='startDay'
                required
                value={startDate.day}
                onChange={(e) => handleDateChange(e, 'start', 'day')}
              >
                {startDaysInMonth.map((dayOption) => (
                  <option key={dayOption} value={dayOption}>{dayOption}일</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.margins}>
            <label htmlFor='end' className={styles.label}>만료 기간 (년-월-일)</label>
            <div className={styles.inputFieldRow}>
              <select
                className={styles.inputFieldSmall}
                id='endYear'
                required
                value={endDate.year}
                onChange={(e) => handleDateChange(e, 'end', 'year')}
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={2024 + index} value={2024 + index}>{2024 + index}년</option>
                ))}
              </select>
              -
              <select
                className={styles.inputFieldSmalls}
                id='endMonth'
                required
                value={endDate.month}
                onChange={(e) => handleDateChange(e, 'end', 'month')}
              >
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>{index + 1}월</option>
                ))}
              </select>
              -
              <select
                className={styles.inputFieldSmalls}
                id='endDay'
                required
                value={endDate.day}
                onChange={(e) => handleDateChange(e, 'end', 'day')}
              >
                {endDaysInMonth.map((dayOption) => (
                  <option key={dayOption} value={dayOption}>{dayOption}일</option>
                ))}
              </select>
            </div>
            <div className={styles.margins}>
            <label htmlFor='TeacherInfo' className={styles.label}>강의내용</label>
            <textarea
              className={styles.inputFields}
              type='text'
              id='TeacherInfo'
              required
              value={TeacherInfo}
              onChange={(event) => setTeacherInfo(event.target.value)}
            />
          </div>
          </div>
          <button className={styles.button}>등록</button>
        </form>
      </section>
    </>
  );
}
