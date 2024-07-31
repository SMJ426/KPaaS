import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

export default function FollowModal({ isOpen, onClose, list }) {
  if (!isOpen) return null;

  return (
    <StyledWrapper>
      <div className="modalContent">
        <button className="closeBtn" onClick={onClose}>
          X
        </button>
        <ul className="modalList">
          {list.map((item) => (
            <Link
              key={item.nick_name}
              href={`/profile/${item.nick_name}`}
              className="modalListItem"
            >
              <li className="flex">
                <Image
                  src={item.profile_image}
                  alt="프로필 사진"
                  width={50}
                  height={50}
                  priority
                  className="followImg"
                />
                <p className="names">{item.nick_name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  .modalContent {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;

    .closeBtn {
      float: right;
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
    }

    .modalList {
      list-style: none;
      margin: 0;
      padding: 0;

      .modalListItem {
        align-items: center;

        .flex {
          display: flex;
          .followImg {
            margin-left: 5px;
            margin-top: 3px;
            margin-right: 15px;
            border-radius: 50%;
          }
          .names {
            margin: 0;
            font-size: 20px;
            margin-top: 15px;
          }
        }
      }
    }

    .modal {
      background-color: #ffffff;
      z-index: 10;
      flex-shrink: 0;
      padding: 10px;
      border-radius: 8px;
      filter: drop-shadow(10px 10px 50px rgba(0, 0, 0, 0.2));
      text-align: center;
      color: var(--gray-600, #808389);
      font-family: 'Pretendard Variable';
    }
  }
`;
