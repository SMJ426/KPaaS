import styled from 'styled-components';

export default function Modal({ children, onClose }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  position: relative;

  width: 90vw;
  max-width: 800px;
  height: 90vh;
  max-height: 800px;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s;

  &:hover {
    color: #e74c3c;
  }
`;
