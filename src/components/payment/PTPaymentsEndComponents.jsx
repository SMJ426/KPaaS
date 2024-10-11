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
  z-index: 100;
  white-space: pre-line;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 400px; 
  width: 100%; 
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); 
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
  background-color: #3b82f6 !important;
  color: white !important;
  padding: 0.5rem 1rem !important;
  border-radius: 0.25rem !important;
  border: none !important;
  cursor: pointer !important;
  font-weight: bold !important;
  align-items: center !important;

  &:hover {
    background-color: #2563eb !important;
  }
`;

export const PTPaymentsEndComponents = ({ isOpen, onClose, isSuccess }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    window.location.href = 'http://default-front-07385-26867304-b1e33c76cd35.kr.lb.naverncp.com:30'; 
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{isSuccess ? '결제 완료' : '결제 실패'}</ModalTitle>
        <ModalDescription>
          {isSuccess
            ? '결제가 성공적으로 완료되었습니다.'
            : '결제 진행 중 문제가 발생했습니다.\n다시 시도해 주세요.'}
        </ModalDescription>
        <ModalButton onClick={handleClose}>확인</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};
