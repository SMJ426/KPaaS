'use client';

import { useState, useEffect } from 'react';

import { RefreshAccessToken } from '@compoents/util/http';
import { PutPostData } from '@compoents/util/post-util';
import styles from './Edit-page.module.css';
import LoadingIndicator from '../../UI/LoadingIndicator';


export default function EditpostForm({ postId, post, accessToken }) {
    const posts = post.post;
    const [postName, setpostName] = useState('');
    const [price, setPrice] = useState(null);
    const [images1, setImages1] = useState('');
    const [showimages1, setShowImages1] = useState('');
    const [images2, setImages2] = useState('');
    const [showimages2, setShowImages2] = useState('');
    const [expireAt, setexpireAt] = useState(null);
    const [createAt, setCreatedAt] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState('2024');
    const [month, setMonth] = useState('1');
    const [day, setDay] = useState('1');
  
  const startYear = 2024;

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
        setCreatedAt(currentDate);
        console.log(currentDate)
        if (posts) {
            setpostName(posts.postName);
            setPrice(posts.price);
            setImages1(posts.imagepost);
            setShowImages1(posts.imagepost);
            setImages2(posts.imageReal);
            setShowImages2(posts.imageReal);
            setCategoryId(posts.categoryId);
            setexpireAt(posts.expireAt);
            setLoading(false);
            console.log(posts);
        }
    }, [posts]);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImages1(selectedImage);
        const imageUrls = URL.createObjectURL(selectedImage);
        setShowImages1(imageUrls);
    };

    const handleImageChanges = (e) => {
        const selectedImage = e.target.files[0];
        setImages2(selectedImage);
        const imageUrls = URL.createObjectURL(selectedImage);
        setShowImages2(imageUrls);
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
    


    async function handleSubmit(postData) {
        try {
            const response = await PutPostData(postId, postData, accessToken) //formData
            if (response.state == 'Jwt Expired') {
                const NewaccessToken = await RefreshAccessToken();
                await PutPostData(postId, postData, NewaccessToken);
              }
        } catch (error) {
            console.error('게시물 수정에 실패했습니다:', error);
            alert('게시물 수정에 실패했습니다.');
        }
    }

    async function sendpostHandler(event) {
        event.preventDefault();

        try {
            const postData = {
                post_name: postName,
                price: parseInt(price),
                image_post: images1,
                image_real: images2,
                create_at: createAt,
                expire_at: getFormattedExpireAt(),
                category_id: parseInt(categoryId),
            };
            console.log(postData);

            await handleSubmit(postData);
            const redirectUrl = "http://localhost:3000";
            window.location.href = redirectUrl;
        } catch (error) {
            console.error('에러 발생:', error);
            alert('죄송합니다. 요청을 처리하는 동안 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    }



    return (
        <>
            {loading ? ( // 로딩 중인 경우에만 로딩 스피너를 표시
                <LoadingIndicator />
            ) : (
                <>
                    <section className={styles.formContainer}>
                        <form onSubmit={sendpostHandler}>
                            <div className={styles.Warning}>이미지 수정은 상품 수정에서 불가능합니다. 삭제 후 다시 등록해주세요.</div>
                            <div className={styles.margins}>
                                <label htmlFor='categoryId' className={styles.label}>카테고리</label>
                                <select
                                    className={styles.inputFielded}
                                    id='categoryId'
                                    required
                                    value={categoryId}
                                    onChange={(event) => setCategoryId(event.target.value)}
                                >
                                    <option value="3001">음료</option>
                                    <option value="3002">음식</option>
                                    <option value="3003">영화 관람권</option>
                                    <option value="3004">모바일 교환권</option>
                                    <option value="3005">상품권</option>
                                    <option value="3006">기타</option>
                                </select>
                            </div>
                            <div className={styles.margins}>
                                <label htmlFor='postname' className={styles.label}>상품명</label>
                                <input
                                    className={styles.inputField}
                                    type='text'
                                    id='postname'
                                    required
                                    value={postName === null ? '' : postName}
                                    onChange={(event) => setpostName(event.target.value)}
                                />
                            </div>
                            <div className={styles.margins}>
                                <label htmlFor='price' className={styles.label}>가격</label>
                                <input
                                    className={styles.inputField}
                                    type='int'
                                    id='price'
                                    required
                                    value={price === null ? '' : price}
                                    onChange={(event) => setPrice(event.target.value)}
                                />
                            </div>
                            <div className={styles.margins}>
                                <label htmlFor='expire' className={styles.label}>만료 기간 (년-월-일)</label>
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
                            <button className={styles.button}>등록</button>
                        </form>
                    </section>
                </>
            )}
        </>
    );
}
