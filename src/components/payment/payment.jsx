'use client';
import * as PortOne from '@portone/browser-sdk/v2';
import { completePay } from '@compoents/util/payment-util';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useState } from 'react';
import { generateUUID } from './payUUID';
import { PTPaymentsEndComponents } from './PTPaymentsEndComponents';
import ChoiceModal from '../login/ChoiceComponents';

export default function Payment({ accessToken, postId, post }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSetPoint = async () => {
    if (!accessToken || accessToken.trim() === '') {
      setShowChoiceModal(true);
      return;
    } else {
      const currentDate = new Date().toISOString().split('T')[0];

      try {
        const response = await PortOne.requestPayment({
          storeId: 'store-8c143d19-2e6c-41e0-899d-8c3d02118d41',
          channelKey: 'channel-key-0c38a3bf-acf3-4b38-bf89-61fbbbecc8a8',
          paymentId: generateUUID(),
          orderName: 'point 충전',
          totalAmount: post.price,
          currency: 'CURRENCY_KRW',
          payMethod: 'EASY_PAY',
          redirectUrl: `http://default-front-07385-26867304-b1e33c76cd35.kr.lb.naverncp.com:30`,
        });

        if (response.code != null) {
          setIsSuccess(false);
          setIsModalOpen(true);
          return;
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
        setIsSuccess(!Endresponse.charge);
        setIsModalOpen(true);
      } catch (error) {
        setIsSuccess(false);
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseChoiceModal = () => {
    setShowChoiceModal(false);
  };

  return (
    <>
      <StyledWrapper onClick={handleSetPoint}>
        <div>바로 구매하기</div>
        <PTPaymentsEndComponents
          isOpen={isModalOpen}
          onClose={closeModal}
          isSuccess={isSuccess}
        />
      </StyledWrapper>
      <ChoiceModal show={showChoiceModal} onClose={handleCloseChoiceModal} />
    </>
  );
}

const StyledWrapper = styled.button`
  display: flex;
`;
