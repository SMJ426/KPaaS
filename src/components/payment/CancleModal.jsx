import React from 'react';
import styled, { keyframes } from 'styled-components';

export default function CancleModal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <StyledWrapper>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="title">결제 취소</h2>
          <p className="message">{message}</p>
          <button className="close-button" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const StyledWrapper = styled.div`
    font-family: 'Spoqa Han Sans Neo';
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: ${fadeIn} 0.3s ease-out;
  }

  .modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 90%;
    width: 400px;
    animation: ${slideIn} 0.3s ease-out;
  }

  .title {
    margin: 0 0 20px;
    color: #333;
    font-size: 24px;
    font-weight: 600;
  }

  .message {
    margin: 0 0 25px;
    color: #666;
    font-size: 16px;
    line-height: 1.5;
  }

  .close-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
