'use client';
import { useState, useEffect } from 'react';
import styles from './SendPost.module.css';
import Image from 'next/image';

import { sendProductData } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';

export default function ProductForm({ accessToken }) {

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [images1, setImages1] = useState('/images/SendDfImg.png');
  const [showimages1, setShowImages1] = useState('/images/SendDfImg.png');
  const [images2, setImages2] = useState('/images/bkimg.png');
  const [showimages2, setShowImages2] = useState('/images/bkimg.png');
  const [categoryId, setCategoryId] = useState('3001');
  const [createdAt, setCreatedAt] = useState('');
  const [year, setYear] = useState('2024');
  const [month, setMonth] = useState('1');
  const [day, setDay] = useState('1');
  
  const startYear = 2024;

  const selectList = [
    { value: "3001", name: "음료" },
    { value: "3002", name: "음식" },
    { value: "3003", name: "영화 관람권" },
    { value: "3004", name: "모바일 교환권" },
    { value: "3005", name: "상품권" },
    { value: "3006", name: "기타" },
  ];

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
    setCreatedAt(currentDate);
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = (selectedImage);
    setImages1(imageUrl);
    const imageUrls = URL.createObjectURL(selectedImage);
    setShowImages1(imageUrls);
  };

  const handleImageChanges = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = (selectedImage);
    setImages2(imageUrl);
    const imageUrls = URL.createObjectURL(selectedImage);
    setShowImages2(imageUrls);
  };

  const handleSelect = (e) => {
    setCategoryId(e.target.selectedOptions[0].value);
  };
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);
    const daysInSelectedMonth = new Date(year, selectedMonth, 0).getDate();
    setDay(Math.min(day, daysInSelectedMonth));
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };
  const getFormattedExpireAt = () => {
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const daysInMonth = Array.from({ length: new Date(year, month, 0).getDate() }, (_, index) => index + 1);

  async function sendProductHandler(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      let req = {
        "product_name": productName,
        "price": parseInt(price),
        "category_id": parseInt(categoryId),
        "create_at": createdAt,
        "expire_at": getFormattedExpireAt(),
      }
      formData.append('req', new Blob([JSON.stringify(req)], { type: "application/json" }));
      formData.append('img_product', images1);
      formData.append('img_real', images2);
      const response = await sendProductData(formData, accessToken);
      if (response.state == 'Jwt Expired') {
        const NewaccessToken = await RefreshAccessToken();
        await sendProductData(formData, NewaccessToken);
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
        <form onSubmit={sendProductHandler} className={styles.minis}>

          <div className={styles.minis}>
            <label className={styles.imglabel}>강의 사진</label>
            <label htmlFor='images1' className={styles.label}>
              <Image src={showimages1} alt="상품 이미지" width="760" height="760" className={styles.selectImg} />
            </label>
            <input
              className={styles.inputField}
              type='file'
              id='images1'
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e)}
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
            <label htmlFor='productname' className={styles.label}>제목</label>
            <input
              className={styles.inputField}
              type='text'
              id='productname'
              required
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            />
          </div>
          <div className={styles.margins}>
            <label htmlFor='price' className={styles.label}>가격</label>
            <input
              className={styles.inputFielded}
              type='int'
              id='price'
              required
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <label htmlFor='price' className={styles.label}>인원</label>
            <input
              className={styles.inputFielded}
              type='int'
              id='price'
              required
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className={styles.margins}>
            <label htmlFor='expire' className={styles.label}>수업 시작 날짜 (년-월-일)</label>
            <div className={styles.inputFieldRow}>
              <select
                className={styles.inputFieldSmall}
                type='text'
                id='year'
                required
                value={year}
                onChange={handleYearChange}>
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={startYear + index} value={startYear + index}>{startYear + index}년</option>
                ))}
              </select>
              -
              <select
                className={styles.inputFieldSmalls}
                type='text'
                id='month'
                required
                value={month}
                onChange={handleMonthChange}
              >
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>{index + 1}월</option>
                ))}
              </select>
              -
              <select
                className={styles.inputFieldSmalls}
                type='text'
                id='day'
                required
                value={day}
                onChange={handleDayChange}
              >
                {daysInMonth.map((dayOption) => (
                  <option key={dayOption} value={dayOption}>{dayOption}일</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.margins}>
            <label htmlFor='expire' className={styles.label}>수업 종료 날짜 (년-월-일)</label>
            <div className={styles.inputFieldRow}>
              <select
                className={styles.inputFieldSmall}
                type='text'
                id='year'
                required
                value={year}
                onChange={handleYearChange}>
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={startYear + index} value={startYear + index}>{startYear + index}년</option>
                ))}
              </select>
              -
              <select
                className={styles.inputFieldSmalls}
                type='text'
                id='month'
                required
                value={month}
                onChange={handleMonthChange}
              >
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>{index + 1}월</option>
                ))}
              </select>
              -
              <select
                className={styles.inputFieldSmalls}
                type='text'
                id='day'
                required
                value={day}
                onChange={handleDayChange}
              >
                {daysInMonth.map((dayOption) => (
                  <option key={dayOption} value={dayOption}>{dayOption}일</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.margins}>
            <label htmlFor='productname' className={styles.label}>강의 소개</label>
            <input
              className={styles.inputField}
              type='text'
              id='productname'
              required
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            />
          </div>
          <div className={styles.margins}>
            <label className={styles.label}>자격증 사진</label>
            <label htmlFor='images2' className={styles.label}>
              <Image src={showimages2} alt="프로필 이미지" width="350" height="55" className={styles.bkImg} />
            </label>
            <input
              className={styles.inputFields}
              type='int'
              id='price'
              required
              value={price}
              disabled
              onChange={(event) => setPrice(event.target.value)}
            />
            <input
              className={styles.inputField}
              type='file'
              id='images2'
              placeholder='바코드가 나온 사진을 등록하세요.'
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageChanges(e)}
            />
          </div>
          <button className={styles.button}>등록</button>
        </form>
      </section>
    </>
  );
}
