import styled from 'styled-components';

export default function OrderSummary({ selectedAmount, onOrder }) {
  return (
    <StyledWrapper>
      <div className="orderSummary">
        <div className="totalAmount">
          <span>총 상품금액</span>
          <span>{selectedAmount.toLocaleString()}원</span>
        </div>
        <div className="finalTotal">
          <span>결제 예정 금액</span>
          <span>{selectedAmount.toLocaleString()}원</span>
        </div>
        <button className="orderButton" onClick={onOrder}>
          주문하기
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .orderSummary {
    margin-top: 20px;
    background: white;
    border-radius: 8px;
    padding: 20px;

    > div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .finalTotal {
      font-weight: bold;
      font-size: 18px;
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #eee;
    }
  }

  .orderButton {
    width: 100%;
    padding: 15px;
    background: #21bf48;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
  }
`;
