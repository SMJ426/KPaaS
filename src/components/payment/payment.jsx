'use client';
import * as PortOne from '@portone/browser-sdk/v2';
import { completePay } from '@compoents/util/payment-util';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

export default function Payment({ accessToken, postId, post }) {
  const router = useRouter();

  const handleSetPoint = async () => {
    if (!accessToken) {
      router.push('/user/login');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    try {
      const response = await PortOne.requestPayment({
        storeId: 'store-8c143d19-2e6c-41e0-899d-8c3d02118d41',
        channelKey: 'channel-key-0c38a3bf-acf3-4b38-bf89-61fbbbecc8a8',
        paymentId: `${crypto.randomUUID()}`,
        orderName: 'point 충전',
        totalAmount: post.price,
        currency: 'CURRENCY_KRW',
        payMethod: 'EASY_PAY',
        redirectUrl: `http://localhost:3000`,
      });

      if (response.code != null) {
        return alert(response.message);
      }

      const validationData = {
        payment_id: response.paymentId,
        total_point: post.price,
        created_at: currentDate,
        payments_list: [
          {
            post_id: parseInt(postId),
            post_point: post.price,
            seller: post.email,
            purchase_at: currentDate,
          },
        ],
      };

      const Endresponse = await completePay(accessToken, validationData);
      if (Endresponse.charge == true) {
        alert(Endresponse.message);
      } else {
        alert(Endresponse.message);
      }
    } catch (error) {
      console.error('포인트 설정 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <StyledWrapper>
      <button className="buy-btn" onClick={handleSetPoint}>
        구매하기
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
  .buy-btn {
    width: 113px;
    height: 40px;
    flex-shrink: 0;
    background: #496af3;
    border-radius: 10px;
    border: 0;
    color: #ffffff;
    font-family: 'Pretendard Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 44px;
    cursor: pointer;
  }

  @media screen and (max-width: 786px) {
    .buy-btn {
      width: 93px;
      height: 40px;
      flex-shrink: 0;
      background: #496af3;
      border-radius: 10px;
      border: 0;
      color: #ffffff;
      font-family: 'Pretendard Variable';
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin-left: 44px;
    }
  }
`;
