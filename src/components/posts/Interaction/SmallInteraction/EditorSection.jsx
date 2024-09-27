import React from 'react';
import styled from 'styled-components';

export default function EditorSection({ TeacherInfo, setTeacherInfo }) {
  return (
    <StyledWrapper>
      <label htmlFor="TeacherInfo">PT 설명</label>
      <textarea
        id="TeacherInfo"
        value={TeacherInfo}
        onChange={(event) => setTeacherInfo(event.target.value)}
        placeholder="자신이 직접 강의하는 PT를 소개해보세요!"
      />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin-top: 30px;

  textarea {
    width: 100%;
    height: 200px;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  label {
    margin-bottom: 10px;
    font-weight: bold;
  }
`;
