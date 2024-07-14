'use client';
import * as PortOne from "@portone/browser-sdk/v2";
import React, { useState, useEffect } from "react";
import { DeleteLike } from "@compoents/util/post-util";
import { completePay } from "@compoents/util/payment-util";
import styled from "styled-components";
import Image from "next/image";

export default function BucketForm({ Likey, accessToken }) {
    const [userLikes, setUserLikes] = useState(Likey);
    const [payments_list, setPays] = useState([]);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [createdAt, setCreatedAt] = useState('');
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
        setCreatedAt(currentDate);
    }, []);

    // 전체 선택 체크박스를 클릭했을 때의 핸들러
    const handleSelectAllChange = () => {
        setSelectAll(!selectAll); // 상태를 반전시킴
        if (!selectAll) {
            // 전체 선택
            setPays(userLikes.map(like => ({
                post_name: like.postName,
                post_id: like.postId,
                post_point: like.price,
                seller: like.userEmail,
                purchase_at: createdAt
            })));
            setSelectedAmount(userLikes.reduce((total, like) => total + like.price, 0));
        } else {
            // 전체 선택 해제
            setPays([]);
            setSelectedAmount(0);
        }
    };

    // 개별 상품의 체크박스 클릭 핸들러
    const handleCheckboxChange = (postId, price) => {
        const selectedpostIndex = payments_list.findIndex(post => post.post_id === postId);
        if (selectedpostIndex === -1) {
            // 상품이 선택되지 않은 경우, 상품 정보를 추가합니다.
            const post = userLikes.find(like => like.postId === postId);
            setPays([...payments_list, {
                post_name: post.postName,
                post_id: post.postId,
                post_point: post.price,
                seller: post.userEmail,
                purchase_at: createdAt
            }]);
            setSelectedAmount(selectedAmount + price);
        } else {
            // 상품이 선택된 경우, 해당 상품 정보를 제거합니다.
            const updatedpayments_list = [...payments_list];
            updatedpayments_list.splice(selectedpostIndex, 1);
            setPays(updatedpayments_list);
            setSelectedAmount(selectedAmount - price);
        }
    };

    const handleSetPoint = async () => {

        const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
        setCreatedAt(currentDate);
        console.log(currentDate);

        const response = await PortOne.requestPayment({
            storeId: "store-8c143d19-2e6c-41e0-899d-8c3d02118d41",
            channelKey: "channel-key-0c38a3bf-acf3-4b38-bf89-61fbbbecc8a8",
            paymentId: `${crypto.randomUUID()}`, //결제 건을 구분하는 문자열로, 결제 요청 및 조회에 필요합니다. 같은 paymentId에 대해 여러 번의 결제 시도가 가능하나, 최종적으로 결제에 성공하는 것은 단 한 번만 가능합니다. (중복 결제 방지)
            orderName: "point 충전", // 총 금액
            totalAmount: selectedAmount, // 총 금액
            currency: "CURRENCY_KRW",
            payMethod: "EASY_PAY",
        });
        if (response.code != null) {
            return alert(response.message);
        }
        const validationData = {
            payment_id: response.paymentId,
            total_point: selectedAmount,
            created_at: createdAt,
            payments_list
          };

        const validation = await completePay(accessToken, validationData);
        if (validation.charge == true) {
            alert(validation.message);
        } else {
            alert(validation.message);
        }
    };

    const handleDeleteLike = async (like) => {
        try {
            await DeleteLike(accessToken, like.postId);
            setUserLikes(userLikes.filter((item) => item.postId !== like.postId));
        } catch (error) {
            console.error('좋아하는 상품 삭제 중 오류가 발생했습니다.', error);
        }
    }

    return (
        <StyledWrapper>
            <section className="section1">
                <h1 className="bktitle">장바구니</h1>
                <label className="AllLable">
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                        className="AllInput"
                    />
                    전체 선택
                </label>
                
            </section>
            <section className="section2">
                <ul className="postsGrid">
                    {userLikes.map((like) => (
                        <div key={like.postId} className="postItem">
                            <input
                                type='checkbox'
                                id={like.postId}
                                className="Checkboxes"
                                onChange={() => handleCheckboxChange(like.postId, like.price)}
                                checked={payments_list.some(post => post.post_id === like.postId)}
                            />
                            <div className="flexes">
                                <Image src={like.imagePost} alt="상품 사진" width={150} height={150} className="IpImg" />
                                <div className="PrdName">{like.postName}</div>
                                <div className="position">
                                <button className="DtBtn" onClick={() => handleDeleteLike(like)}>삭제하기 <Image src={'/svgs/Close_round.svg'} width={24} height={24} alt="" className="svgs" /></button>
                                <button className="OdBtn">구매하기 <Image src={'/svgs/Box_alt_fill.svg'} width={24} height={24} alt="" className="svgs"/></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="selectAmount">선택한 상품 금액 : {selectedAmount}</div>
                </ul>
                <button className="SelectBtn" onClick={handleSetPoint} style={{ display: payments_list.length > 0 ? 'block' : 'none' }}>
                선택 상품 구매하기
                </button>
            </section>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.header`




.section1{
    background: #FFFFFF;
  }
  
  .bktitle{
    color: var(--black, #191A1C);
  font-family: "Pretendard Variable";
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 20%;
  }
  
  .AllLable{
    color: var(--black, #191A1C);
  font-family: "Pretendard Variable";
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  
  }
  
  .AllInput{
    border-radius: 5px;
  border: 2px solid var(--gray-400, #BEC0C6);
  background: #FFF;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  margin-top: 30px;
  margin-left: 22.3%;
  margin-right: 30px;
  margin-bottom: 37px;
  }
  
  
  .section2{
    position: relative;
    margin: 0;
    background: var(--gray-200, #F4F5F9);
  }
  
  .postsGrid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 10px;
    }
  
    .postItem {
      margin-left: 18%;
      border-radius: 20px;
      background: #FFF;
      box-shadow: 10px 10px 50px 0px rgba(0, 0, 0, 0.10);
      width: 65%;
      height: 300px;
      margin-top: 46px;
    }
    .flexes{
      display: flex;
    }
    .Checkboxes{
      border-radius: 5px;
      border: 2px solid var(--gray-400, #BEC0C6);
      background: #FFF;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      margin-left: 23px;
      margin-top: 23px;
    }
  
    .SelectBtn{
      border-radius: 10px;
      background: var(--primary-primary, #496AF3);
      width: 82%;
      height: 90px;
      flex-shrink: 0;
      color: #FFF;
      font-family: "Pretendard Variable";
      font-size: 38px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      border: 0;
      margin-left: 10%;
      margin-bottom: 150px;
    }
  
    .IpImg{
      margin-left: 15%;
    }
  
    .PrdName{
      width: 300px;
      color: #000;
  font-family: "Pretendard Variable";
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 125px;
    }
  
    .position{
      position: absolute;
      margin-left: 23%;
      margin-top: 45px;
    }
  
    .DtBtn{
      width: 155px;
      padding: 8px 20px;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      border: 2px solid var(--gray-400, #BEC0C6);
      background: #FFF;
      color: var(--gray-600, #808389);
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
    }
  
    .OdBtn{
      width: 155px;
      padding: 8px 20px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 10px;
  border: 2px solid var(--primary-primary, #496AF3);
  background: #FFF;
  color: var(--primary-primary, #496AF3);
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 15px;
  margin-left: 30px;
    }
  
    .selectAmount{
      margin-left: 74%;
    }
  
  
  
    @media screen and (max-width: 786px) {
  
  
  .section1{
      background: #FFFFFF;
    }
    
    .bktitle{
      color: var(--black, #191A1C);
    font-family: "Pretendard Variable";
    font-size: 100%;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 20%;
    }
    
    .AllLable{
      color: var(--black, #191A1C);
    font-family: "Pretendard Variable";
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    
    }
    
    .AllInput{
      border-radius: 5px;
    border: 2px solid var(--gray-400, #BEC0C6);
    background: #FFF;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-left: 22.3%;
    margin-right: 30px;
    
    margin-bottom: 37px;
    }
    
    
    .section2{
      position: relative;
      margin: 0;
      background: var(--gray-200, #F4F5F9);
    }
    
    .postsGrid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 5px;
      }
    
      .postItem {
          border-radius: 10px;
          background: #FFF;
          box-shadow: 10px 10px 50px 0px rgba(0, 0, 0, 0.10);
          width: 90%;
          height: 400px;
          margin-left: 5%;
      }
      .flexes{
          display: table;
      }
      .Checkboxes{
        border-radius: 5px;
        border: 2px solid var(--gray-400, #BEC0C6);
        background: #FFF;
        width: 20px;
        height: 20px;
        margin-left: 23px;
        margin-top: 23px;
      }
    
      .SelectBtn{
        border-radius: 10px;
        background: var(--primary-primary, #496AF3);
        width: 90%;
        height: 60px;
        flex-shrink: 0;
        color: #FFF;
        font-family: "Pretendard Variable";
        font-size: 25px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        border: 0;
        margin-left: 5%;
        margin-bottom: 150px;
      }
    
      .IpImg{
        margin-top: 10%;
        margin-left: 35%;
      }
    
      .PrdName{
        width: 300px;
        color: #000;
        font-family: "Pretendard Variable";
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-left: 40%;
      }
    
      .position{
        margin-left: 10%;
        margin-top: 4%;
        display: flex;
      }
    
      .DtBtn{
        width: 125px;
        padding: 5px 15px;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        border: 2px solid var(--gray-400, #BEC0C6);
        background: #FFF;
        color: var(--gray-600, #808389);
        font-family: "Pretendard Variable";
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    
      .OdBtn{
        width: 125px;
        padding: 5px 15px;
        justify-content: center;
        align-items: center;  
        border-radius: 10px;
    border: 2px solid var(--primary-primary, #496AF3);
    background: #FFF;
    color: var(--primary-primary, #496AF3);
    font-family: "Pretendard Variable";
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 0px;
    margin-left: 30px;
      }
    
      .svgs{
          width: 15px;
          height: 15px;
      }
  
      .selectAmount{
        font-size: 80%;
        margin-left: 65%;
      }
    
  
    }
`;