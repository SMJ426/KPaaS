import React from 'react';
import styled from 'styled-components';

function RequestMessages({ requestMessages }) {
  console.log('requestMessages >> ', requestMessages);

  const date = new Date(requestMessages.time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');

  const formattedTime = `${period} ${formattedHours}:${formattedMinutes}`;
  return (
    <StyledWrapper>
      <span>{formattedTime}</span>
      <p>{requestMessages.content}</p>
    </StyledWrapper>
  );
}

export default RequestMessages;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  gap: 7px;

  padding-right: 15px;
  margin-bottom: 10px;

  > span {
    font-size: 12px;
    color: #868b94;
  }

  > p {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    width: fit-content;
    max-width: 500px;
    height: auto;
    background-color: #3797f0;
    color: #ffffff;
    padding: 10px 14px;
    border-radius: 20px 5px 20px 20px;

    word-wrap: break-word;
    white-space: pre-wrap;
  }
`;
