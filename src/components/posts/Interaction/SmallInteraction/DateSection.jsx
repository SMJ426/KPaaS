import React from 'react';
import styled from 'styled-components';

export default function DateSection({
  startDate,
  endDate,
  handleDateChange,
  startDaysInMonth,
  endDaysInMonth,
}) {
  return (
    <StyledWrapper>
      <div className="form-group">
        <label htmlFor="start" className="label">
          시작 기간 (년-월-일)
        </label>
        <div className="date-input">
          <select
            id="startYear"
            value={startDate.year}
            onChange={(e) => handleDateChange(e, 'start', 'year')}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={2024 + index} value={2024 + index}>
                {2024 + index}년
              </option>
            ))}
          </select>
          <select
            id="startMonth"
            value={startDate.month}
            onChange={(e) => handleDateChange(e, 'start', 'month')}
            className="days-margin"
          >
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}월
              </option>
            ))}
          </select>
          <select
            id="startDay"
            value={startDate.day}
            onChange={(e) => handleDateChange(e, 'start', 'day')}
            className="days-margin"
          >
            {startDaysInMonth.map((dayOption) => (
              <option key={dayOption} value={dayOption}>
                {dayOption}일
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="end" className="label">
          만료 기간 (년-월-일)
        </label>
        <div className="date-input">
          <select
            id="endYear"
            value={endDate.year}
            onChange={(e) => handleDateChange(e, 'end', 'year')}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={2024 + index} value={2024 + index}>
                {2024 + index}년
              </option>
            ))}
          </select>
          <select
            id="endMonth"
            value={endDate.month}
            onChange={(e) => handleDateChange(e, 'end', 'month')}
            className="days-margin"
          >
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}월
              </option>
            ))}
          </select>
          <select
            id="endDay"
            value={endDate.day}
            onChange={(e) => handleDateChange(e, 'end', 'day')}
            className="days-margin"
          >
            {endDaysInMonth.map((dayOption) => (
              <option key={dayOption} value={dayOption}>
                {dayOption}일
              </option>
            ))}
          </select>
        </div>
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

  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .days-margin {
    margin-left: 50px;
  }
`;
