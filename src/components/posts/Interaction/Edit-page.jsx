'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RefreshAccessToken } from '@compoents/util/http';
import { PutPostData } from '@compoents/util/post-util';
import styled from 'styled-components';


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

    const [startDate, setStartDate] = useState({ year: '2024', month: '1', day: '1' });
    const [endDate, setEndDate] = useState({ year: '2024', month: '1', day: '1' });

    const selectList = [
        { value: "3001", name: "가정방문" },
        { value: "3002", name: "수영장" },
        { value: "3003", name: "헬스장" },
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
            setStartDate(posts.startAt);
            setEndDate(posts.endAt)
            setTotalnumber(posts.totalNumber);
            setlocation(posts.location);
            setTeacherInfo(posts.postInfo);
            console.log(posts);
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
                location: location
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
        <StyledWrapper>
            <section className="formContainer">
                <form onSubmit={sendPostHandler} className="minis">

                    <div className="minis">
                        <label className="imglabel">강의 소개</label>
                        <label htmlFor='images1' className="label">
                            <Image src={showImages1} alt="상품 이미지" width="760" height="760" className="selectImg" />
                        </label>
                        <input
                            className="inputField"
                            type='file'
                            id='images1'
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="NotEditImg">이미지는 강의 등록 시 수정 불가합니다.</div>
                    <div className="margins">
                        <label className="label">강의장소</label>
                        <select
                            className="inputFielded"
                            id='categoryId'
                            value={categoryId}
                            onChange={handleCategorySelect}
                        >
                            {selectList.map((item) => (
                                <option className="options" value={item.value} key={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="margins">
                        <label className="label">지역</label>
                        <select
                            className="inputFielded"
                            id='locationId'
                            value={location}
                            onChange={handleLocationSelect}
                        >
                            {selectlocationList.map((locate, index) => (
                                <option className="options" value={locate} key={index}>
                                    {locate}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="margins">
                        <label htmlFor='postname' className="label">강의제목</label>
                        <input
                            className="inputField"
                            type='text'
                            id='postname'
                            required
                            value={postName}
                            onChange={(event) => setPostName(event.target.value)}
                        />
                    </div>
                    <div className="flexmargins">
                        <label htmlFor='price' className="label">가격</label>
                        <input
                            className="inputFielded"
                            type='text'
                            id='price'
                            required
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                        <label htmlFor='totalNumber' className="label">모집 회원 수</label>
                        <input
                            className="inputFielded"
                            type='text'
                            id='totalNumber'
                            required
                            value={totalNumber}
                            onChange={(event) => setTotalnumber(event.target.value)}
                        />
                    </div>
                    <div className="margins">
                        <label htmlFor='start' className="label">시작 기간 (년-월-일)</label>
                        <div className="inputFieldRow">
                            <select
                                className="inputFieldSmall"
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
                                className="inputFieldSmalls"
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
                                className="inputFieldSmalls"
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
                    <div className="margins">
                        <label htmlFor='end' className="label">만료 기간 (년-월-일)</label>
                        <div className="inputFieldRow">
                            <select
                                className="inputFieldSmall"
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
                                className="inputFieldSmalls"
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
                                className="inputFieldSmalls"
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
                        <div className="margins">
                            <label htmlFor='TeacherInfo' className="label">강의내용</label>
                            <textarea
                                className="inputFields"
                                type='text'
                                id='TeacherInfo'
                                required
                                value={TeacherInfo}
                                onChange={(event) => setTeacherInfo(event.target.value)}
                            />
                        </div>
                    </div>
                    <button className="button">등록</button>
                </form>
            </section>
        </StyledWrapper>
    );
}


const StyledWrapper = styled.header`
    

.formContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  }
  
  .imglabel {
    display: flex;
    color: var(--black, #191A1C);
    font-family: "Pretendard Variable";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    
  }

  .label{
    color: var(--black, #191A1C);
    font-family: "Pretendard Variable";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .selectImg{
    margin-top: 30px;
    border-radius: 10px;
    margin-left: 40px;
  }
  .margins{
    margin-top: 30px;
  }
  
  .inputField {
    display: flex;
    width: 840px;
    height: 60px;
    border-radius: 10px;
    border: 1.5px solid var(--gray-400, #BEC0C6);
    background: #FFF;
    margin-top: 30px;
    padding-left: 10px;
  }

  .inputFielded {
    display: flex;
    width: 840px;
    height: 60px;
    border-radius: 10px;
    border: 1.5px solid var(--gray-400, #BEC0C6);
    background: #FFF;
    margin-top: 30px;
    padding-left: 10px;
  }

  .selectField {
    margin: 10px;
    width: 20%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
 }
  .button {
    margin-top: 54px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 840px;
    height: 70px;
  }
  
  .bkImg{
    display: flex;
    position: absolute;
    margin-top: 32px;
    margin-left: 10px;
  }
  .inputFields {
    display: flex;
    width: 790px;
    height: 60px;
    border-radius: 10px;
    border: 1.5px solid var(--gray-400, #BEC0C6);
    background: #FFF;
    margin-top: 30px;
    padding-left: 50px;
  }

  .inputFieldRow{
    margin-top: 2%;
  }

  .inputFieldSmall{
    padding: 10px;
    border-radius: 10px;
    border: 1.5px solid var(--gray-400, #BEC0C6);
    background: #FFF;
    margin-left: 10%;
    margin-right: 5%;
    width: 15%;
  }

  .inputFieldSmalls{
    padding: 10px;
    margin-left: 10%;
    border-radius: 10px;
    border: 1.5px solid var(--gray-400, #BEC0C6);
    background: #FFF;
    margin-left: 5%;
    margin-right: 5%;
    width: 15%;
  }




  @media screen and (max-width: 786px){
    

    .formContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 20%;
      }
      
      .imglabel {
        display: flex;
        color: var(--black, #191A1C);
        font-family: "Pretendard Variable";
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        
      }
    
      .minis{
        width: 50%;
      }
      .label{
        color: var(--black, #191A1C);
        font-family: "Pretendard Variable";
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    
      .selectImg{
        border-radius: 10px;
        width: 200px;
        height: 200px;
        margin-left: 20px;
      }
      .margins{
        margin-top: 10px;
        width: 50%;
        
      }
      
      .inputField {
        display: flex;
        width: 170%;
        height: 30px;
        border-radius: 10px;
        border: 1.5px solid var(--gray-400, #BEC0C6);
        background: #FFF;
        margin-top: 10px;
        padding-left: 10px;
        font-size: 60%;
      }
    
      .selectField {
        margin: 10px;
        width: 240px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
     }
      .button {
        margin-top: 24px;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 340px;
        height: 40px;
        margin-left: -40px;
      }
      
      .bkImg{
        display: flex;
        position: absolute;
        margin-top: 17px;
        margin-left: 10px;
        width: 200px;
        height: 30px;
      }
      .inputFields {
        display: flex;
        width: 140%;
        height: 30px;
        border-radius: 10px;
        border: 1.5px solid var(--gray-400, #BEC0C6);
        background: #FFF;
        margin-top: 15px;
        padding-left: 50px;
      }
    
      .inputFielded{
        display: flex;
        width: 100%;
        height: 30px;
        border-radius: 10px;
        border: 1.5px solid var(--gray-400, #BEC0C6);
        background: #FFF;
        margin-top: 10px;
        padding-left: 10px;
        font-size: 60%;
      }

      .Warning{
        font-size: 50%;
      }
  }
`;