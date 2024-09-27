import styled from 'styled-components';

export default function RecommendPrice({ price }) {
  return (
    <StyledWrapper>
      <div className="wrapper-price">
        <p>수강비</p>
        <span>{price}원</span>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .wrapper-price {
    display: flex;
    gap: 8px;
    > p {
      font-weight: bold;
      color: #29363d;
    }
    > span {
      color: #29363d;
    }

    span,
    p {
      font-family: 'Pretendard';
    }
  }
`;
