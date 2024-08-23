import React from 'react';
import styled from 'styled-components';

function ReceivedMessages({ receiveMessages }) {
  console.log('receiveMessages >> ', receiveMessages);
  const senderData = receiveMessages.sender;

  const date = new Date(receiveMessages.time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');

  const formattedTime = `${period} ${formattedHours}:${formattedMinutes}`;

  const profileSrc = senderData.profile_image
    ? senderData.profile_image
    : receiveMessages.profile_image;
  return (
    <StyledWrapper>
      <img src={profileSrc} alt={senderData.nick_name} />
      <div className="wrapper-content">
        <p>{receiveMessages.content}</p>
        <span>{formattedTime}</span>
      </div>
    </StyledWrapper>
  );
}

export default ReceivedMessages;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  padding-left: 15px;
  margin-bottom: 10px;

  > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .wrapper-content {
    display: flex;
    align-items: end;
    gap: 7px;

    > p {
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 14px;
      width: fit-content;
      max-width: 500px;
      height: auto;

      background-color: #ebecee;
      padding: 10px 14px;
      border-radius: 5px 25px 25px 25px;
      word-wrap: break-word;
      white-space: pre-wrap;
    }

    > span {
      font-size: 12px;
      color: #868b94;
    }
  }
`;
