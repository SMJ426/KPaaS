import styled from 'styled-components';

export default function SelectAllCheckbox({
  selectAll,
  handleSelectAllChange,
}) {
  return (
    <StyledWrapper>
      <div className="selectAllContainer">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAllChange}
          />
          <span className="custom-checkbox"></span>
        </label>
        <div className="postInfo">강의정보</div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .selectAllContainer {
    margin-bottom: 20px;
    display: flex;
    background: #ededed;
    padding: 15px;
  }
  .postInfo {
    margin-left: 300px;
  }
`;
