'use client';
import * as PortOne from '@portone/browser-sdk/v2';
import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DeleteLike, LikeList } from '@compoents/util/post-util';
import { completePay } from '@compoents/util/payment-util';
import styled from 'styled-components';
import SelectAllCheckbox from './bucketoptions/SelectAllCheckbox';
import OrderSummary from './bucketoptions/OrderSummary';
import CartItem from './bucketoptions/CartItem';
import LoadingIndicator from '@compoents/components/UI/LoadingIndicator';
import { generateUUID } from '../payment/payUUID';

export default function BucketForm({ initialLikes, nick_name, accessToken }) {
  const [payments_list, setPays] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [createdAt, setCreatedAt] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['userLikes', nick_name],
    queryFn: ({ pageParam = 0 }) => LikeList(nick_name, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.last || !lastPage.content || lastPage.content.length === 0) {
        return undefined;
      }
      return lastPage.number + 1;
    },
    initialData: { pages: [initialLikes], pageParams: [0] },
  });

  const allLikes = data?.pages.flatMap((page) => page.content) || [];

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setCreatedAt(currentDate);
  }, []);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setPays(
        allLikes.map((like) => ({
          post_name: like.post_name,
          post_id: like.post_id,
          post_point: like.price,
          seller: like.email,
          purchase_at: createdAt,
        }))
      );
      setSelectedAmount(
        allLikes.reduce((total, like) => total + like.price, 0)
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
      const post = allLikes.find((like) => like.post_id === postId);
      setPays([
        ...payments_list,
        {
          post_name: post.post_name,
          post_id: post.post_id,
          post_point: post.price,
          seller: post.email,
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
      paymentId: generateUUID(),
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
      await DeleteLike(accessToken, like.post_id);
      // 삭제 후 쿼리를 무효화하여 데이터를 다시 불러옵니다.
      queryClient.invalidateQueries(['userLikes', nick_name]);
    } catch (error) {
      console.error('좋아하는 상품 삭제 중 오류가 발생했습니다.', error);
    }
  };

  if (status === 'loading') return <LoadingIndicator />;
  if (status === 'error') return <p>에러가 발생했습니다.</p>;

  return (
    <StyledWrapper>
      <h1 className="bktitle">장바구니</h1>
      <SelectAllCheckbox
        selectAll={selectAll}
        handleSelectAllChange={handleSelectAllChange}
      />
      <InfiniteScroll
        dataLength={allLikes.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<LoadingIndicator />}
        className="cartContainer"
      >
        {allLikes.map((like) => (
          <CartItem
            key={like.post_id}
            like={like}
            isChecked={payments_list.some(
              (post) => post.post_id === like.post_id
            )}
            onCheckboxChange={handleCheckboxChange}
            onDelete={handleDeleteLike}
          />
        ))}
      </InfiniteScroll>
      <OrderSummary selectedAmount={selectedAmount} onOrder={handleSetPoint} />
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

  .selectAll {
    border-radius: 50%;
    border: 2px solid #21bf48;
    margin-right: 10px;
  }

  .cartContainer {
    border-radius: 8px;
    padding: 20px;
  }
`;
