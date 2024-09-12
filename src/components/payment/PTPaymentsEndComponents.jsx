import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 400px;
  width: 100%;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ModalDescription = styled.p`
  margin-bottom: 1.5rem;
`;

const ModalButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
  align-items: 

  &:hover {
    background-color: #2563eb;
  }
`;

export const PTPaymentsEndComponents = ({ isOpen, onClose, isSuccess }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalTitle>
          {isSuccess ? 'PT 등록 완료' : 'PT 등록 실패'}
        </ModalTitle>
        <ModalDescription>
          {isSuccess
            ? 'PT 등록이 성공적으로 완료되었습니다.'
            : 'PT 등록 중 문제가 발생했습니다. 다시 시도해 주세요.'}
        </ModalDescription>
        <ModalButton onClick={onClose}>확인</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};