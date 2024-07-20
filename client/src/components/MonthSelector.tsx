// src/components/MonthSelector.tsx
import React from 'react';
import styled from 'styled-components';
import { getNextMonth, getPreviousMonth, formatMonth } from '../utils/dateUtil';

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ currentMonth, setCurrentMonth }) => {
  const handleNextMonth = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(getPreviousMonth(currentMonth));
  };

  const handleMonthClick = () => {
    alert('모달을 띄워서 월 선택 기능 구현');
  };

  return (
    <Container>
      <ArrowButton onClick={handlePreviousMonth}>{"<"}</ArrowButton>
      <MonthDisplay onClick={handleMonthClick}>{formatMonth(currentMonth)}</MonthDisplay>
      <ArrowButton onClick={handleNextMonth}>{">"}</ArrowButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

const MonthDisplay = styled.span`
  margin: 0 1rem;
  font-size: 1.5em;
  cursor: pointer;
`;

export default MonthSelector;
