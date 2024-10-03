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
          <img
            src="/images/png/카카오페이_CI_combination.png"
            alt="카카오 페이 이미지"
          />
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
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 15px;
    background: #ffeb00;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
    color: #000000;

    > img {
      width: 50px;
      margin-right: 10px;
    }
  }
`;
