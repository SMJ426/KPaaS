import styled from 'styled-components';
import Image from 'next/image';

export default function CartItem({
  like,
  isChecked,
  onCheckboxChange,
  onDelete,
}) {
  return (
    <StyledWrapper>
      <div className="cartItem">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheckboxChange(like.postId, like.price)}
          className="selectAll"
        />
        <Image
          src={like.imagePost}
          alt="상품 사진"
          width={100}
          height={100}
          className="productImage"
        />
        <div className="productInfo">
          <div className="productName">{like.postName}</div>
          <div className="productPrice">{like.price.toLocaleString()}원</div>
        </div>
        <div className="actionButtons">
          <button onClick={() => onDelete(like)}>삭제하기</button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cartItem {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 8px;
    border: 2px solid #e0e0e0;
    padding: 15px;
    margin-bottom: 15px;
  }

  .productImage {
    border-radius: 8px;
    margin-right: 15px;
  }

  .productInfo {
    flex-grow: 1;
  }

  .productName {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .productPrice {
    color: #496af3;
    font-weight: bold;
  }

  .actionButtons button {
    background: #ff3939;
    border: 1px solid #ff0000;
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: 10px;
    cursor: pointer;
    color: white;
  }

  @media (max-width: 768px) {
    .cartItem {
      flex-wrap: wrap;
    }

    .productImage {
      order: 1;
      margin-bottom: 10px;
    }

    .productInfo {
      order: 2;
      width: 100%;
      margin-bottom: 10px;
    }

    .actionButtons {
      order: 3;
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
`;
