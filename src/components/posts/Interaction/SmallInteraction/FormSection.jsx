import React from 'react';
import styled from 'styled-components';

export default function FormSection({
  postName,
  setPostName,
  price,
  setPrice,
  categoryId,
  handleCategorySelect,
  selectList,
  location,
  handleLocationSelect,
  selectlocationList,
  totalNumber,
  setTotalnumber,
  errors,
}) {
  return (
    <StyledWrapper>
      <div className="form-group">
        <label htmlFor="postname">PT 강의 제목</label>
        <input
          type="text"
          id="postname"
          value={postName}
          onChange={(event) => setPostName(event.target.value)}
          placeholder="상품명을 입력해 주세요"
        />
        {errors.postName && <p className="error">{errors.postName}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="price">가격</label>
        <div className="price-input">
          <input
            type="text"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="totalprice"
          />
          <span>원</span>
        </div>
        {errors.price && <p className="error">{errors.price}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="categoryId">PT 장소</label>
        <select
          id="categoryId"
          value={categoryId}
          onChange={handleCategorySelect}
        >
          {selectList.map((item) => (
            <option value={item.value} key={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="location" className="label">
          지역
        </label>
        <select
          className="inputFielded"
          type="text"
          id="locationId"
          required
          value={location}
          onChange={handleLocationSelect}
        >
          {selectlocationList.map((locate, index) => (
            <option className="options" value={locate} key={index}>
              {locate}
            </option>
          ))}
        </select>
        {errors.location && <p className="error">{errors.location}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="totalNumber">모집 회원 수</label>
        <div className="totals">
          <input
            type="text"
            id="totalNumber"
            value={totalNumber}
            onChange={(event) => setTotalnumber(event.target.value)}
            className="totalInput"
          />
          <span>명</span>
        </div>
        {errors.totalNumber && <p className="error">{errors.totalNumber}</p>}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .form-group {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  input,
  select,
  textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .price-input {
    display: flex;
    align-items: center;

    .totalprice {
      width: 80px;
    }

    span {
      margin-left: 10px;
    }
  }

  .totals {
    display: flex;
    align-items: center;

    .totalInput {
      width: 80px;
    }
    span {
      margin-left: 10px;
    }
  }

  .days-margin {
    margin-left: 50px;
  }

  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
`;
