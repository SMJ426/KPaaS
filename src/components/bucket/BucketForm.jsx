'use client';
import * as PortOne from '@portone/browser-sdk/v2';
import React, { useState, useEffect } from 'react';
import { DeleteLike } from '@compoents/util/post-util';
import { completePay } from '@compoents/util/payment-util';
import styled from 'styled-components';
import Image from 'next/image';

export default function BucketForm({ Likey, accessToken }) {
  const [userLikes, setUserLikes] = useState(Likey);
  const [payments_list, setPays] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [createdAt, setCreatedAt] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setCreatedAt(currentDate);
  }, []);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setPays(
        userLikes.map((like) => ({
          post_name: like.postName,
          post_id: like.postId,
          post_point: like.price,
          seller: like.userEmail,
          purchase_at: createdAt,
        }))
      );
      setSelectedAmount(
        userLikes.reduce((total, like) => total + like.price, 0)
      );
    } else {
      setPays([]);
      setSelectedAmount(0);
    }
  };

  const handleCheckboxChange = (postId, price) => {
    const selectedpostIndex = payments_list.findIndex(
      (post) => post.post_id === postId
    );
    if (selectedpostIndex === -1) {
      const post = userLikes.find((like) => like.postId === postId);
      setPays([
        ...payments_list,
        {
          post_name: post.postName,
          post_id: post.postId,
          post_point: post.price,
          seller: post.userEmail,
          purchase_at: createdAt,
        },
      ]);
      setSelectedAmount(selectedAmount + price);
    } else {
      const updatedpayments_list = [...payments_list];
      updatedpayments_list.splice(selectedpostIndex, 1);
      setPays(updatedpayments_list);
      setSelectedAmount(selectedAmount - price);
    }
  };

  const handleSetPoint = async () => {
    const currentDate = new Date().toISOString().split('T')[0];
    setCreatedAt(currentDate);

    const response = await PortOne.requestPayment({
      storeId: 'store-8c143d19-2e6c-41e0-899d-8c3d02118d41',
      channelKey: 'channel-key-0c38a3bf-acf3-4b38-bf89-61fbbbecc8a8',
      paymentId: `${crypto.randomUUID()}`,
      orderName: 'point 충전',
      totalAmount: selectedAmount,
      currency: 'CURRENCY_KRW',
      payMethod: 'EASY_PAY',
    });
    if (response.code != null) {
      return alert(response.message);
    }
    const validationData = {
      payment_id: response.paymentId,
      total_point: selectedAmount,
      created_at: createdAt,
      payments_list,
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
  };

  return (
    <StyledWrapper>
      <h1 className="bktitle">장바구니</h1>
      <div className="selectAllContainer">
        <label className="checkbox-label">
    <input
      type="checkbox"
      checked={selectAll}
      onChange={handleSelectAllChange}
    />
    <span className="custom-checkbox"></span>
        </label>
        <div className='postInfo'>강의정보</div>
      </div>
      <div className="cartContainer">
        {userLikes.map((like) => (
          <div key={like.postId} className="cartItem">
            <input
              type="checkbox"
              checked={payments_list.some((post) => post.post_id === like.postId)}
              onChange={() => handleCheckboxChange(like.postId, like.price)}
              className='selectAll'
            />
            <Image
              src={like.imagePost}
              alt="상품 사진"
              width={100}
              height={100}
              className="productImage"
            />
            <div className="productInfo">
              <div className="productName">{like.postName}</div>
              <div className="productPrice">{like.price.toLocaleString()}원</div>
            </div>
            <div className="actionButtons">
              <button onClick={() => handleDeleteLike(like)}>삭제하기</button>
            </div>
          </div>
        ))}
      </div>
      <div className="orderSummary">
        <div className="totalAmount">
          <span>총 상품금액</span>
          <span>{selectedAmount.toLocaleString()}원</span>
        </div>
        <div className="finalTotal">
          <span>결제 예정 금액</span>
          <span>{selectedAmount.toLocaleString()}원</span>
        </div>
        <button className="orderButton" onClick={handleSetPoint}>
          주문하기
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .bktitle {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-left: 315px;
  }

  .selectAllContainer {
    margin-bottom: 20px;
    display: flex;
    background: #ededed;
    padding: 15px;
  }
    .postInfo{
      margin-left: 300px;
    }

  .selectAll{
    border-radius: 50%;
    border: 2px solid #21BF48;
    margin-right: 10px;
  }

  .cartContainer {
    border-radius: 8px;
    padding: 20px;
  }

  .cartItem {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 8px;
    border: 2px solid #E0E0E0;
    padding: 15px;
    margin-bottom: 15px;
  }

  .productImage {
    border-radius: 8px;
    margin-right: 15px;
  }

  .productInfo {
    flex-grow: 1;
  }

  .productName {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .productPrice {
    color: #496af3;
    font-weight: bold;
  }

  .actionButtons button {
    background: #ff3939;
    border: 1px solid #ff0000;
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: 10px;
    cursor: pointer;
    color: white;
  }

  .orderSummary {
    margin-top: 20px;
    background: white;
    border-radius: 8px;
    padding: 20px;

    > div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .finalTotal {
      font-weight: bold;
      font-size: 18px;
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #eee;
    }
  }

  .orderButton {
    width: 100%;
    padding: 15px;
    background: #21BF48;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .cartItem {
      flex-wrap: wrap;
    }

    .productImage {
      order: 1;
      margin-bottom: 10px;
    }

    .productInfo {
      order: 2;
      width: 100%;
      margin-bottom: 10px;
    }

    .actionButtons {
      order: 3;
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
`;