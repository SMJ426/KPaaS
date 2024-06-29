import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

function AnnouncementRenderer({ announcementData }) {
  return (
    <StyledWrapper>
      <p>{announcementData.desc}</p>
      <p>{announcementData.createdAt}</p>
    </StyledWrapper>
  );
}

export default AnnouncementRenderer;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;

  height: 56px;
  font-weight: 400;
  font-size: 16px;
  font-family: 'Pretendard';
  color: #29363d;
  border-bottom: 1px solid #eeeeee;
`;
