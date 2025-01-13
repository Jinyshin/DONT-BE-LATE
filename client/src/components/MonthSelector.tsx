// src/components/MonthSelector.tsx
    //MonthSelector for Monthly Ranking
import React, { useState } from 'react';
import styled from 'styled-components';
import { formatMonth, getNextMonth, getPreviousMonth } from '../utils/dateUtil';

interface MonthSelectorProps {
  monthWhenCalled: Date;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({monthWhenCalled, currentMonth, setCurrentMonth }) => {
  const [showDropdown, setShowDropdown]= useState(false);
  const isThereNextMonth =
    (monthWhenCalled.getFullYear() > currentMonth.getFullYear()) ||
    ((monthWhenCalled.getFullYear() == currentMonth.getFullYear())
      && (getPreviousMonth(monthWhenCalled)> getPreviousMonth(currentMonth)));

  const prevLimit=new Date(monthWhenCalled.getFullYear(),
  monthWhenCalled.getMonth()-6+1, 1)

  const isTherePrevMonth =
    (prevLimit.getFullYear() < currentMonth.getFullYear()) ||
    ((prevLimit.getFullYear() == currentMonth.getFullYear())
      && (getPreviousMonth(prevLimit)< getPreviousMonth(currentMonth)));

  const handleNextMonth = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(getPreviousMonth(currentMonth));
  };

  const handleMonthClick = () => {
    setShowDropdown(!showDropdown);
  };

  const selectMonth=(month: Date)=>{
    setCurrentMonth(month);
    setShowDropdown(false);
  }

  const getPastMonths = (count: number)=>{
    const months = [];
    for (let i=0; i<count; i++){
      months.push(
        getPreviousMonth(
          new Date(monthWhenCalled.getFullYear(),
                    monthWhenCalled.getMonth()-i+1, 1)
                  ));
    }
    return months;
  }

  return (
    <Container>
      { isTherePrevMonth?
        <ArrowButton onClick={handlePreviousMonth}>{"<"}</ArrowButton>
      : <GrayArrowButton>{"<"}</GrayArrowButton>
      }


      <MonthDisplay onClick={handleMonthClick}>
        {formatMonth(currentMonth)} <DropdownIcon>▼</DropdownIcon>
      </MonthDisplay>


      {isThereNextMonth?
        <ArrowButton onClick={handleNextMonth}>{">"}</ArrowButton>
      : <GrayArrowButton>{">"}</GrayArrowButton>
      }
      {showDropdown && (
        <Dropdown>
          {getPastMonths(6).map((month, index) => (
            <DropdownItem key={index} onClick={() => selectMonth(month)}>
              {formatMonth(month)}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background-color: #5581D913;
  padding: 0.1rem;
  border-radius: 4px;
  //box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ArrowButton = styled.button`
  background: #5581D913;
  border: none;
  border-radius: 5px;
  margin: 0.3rem;
  font-size: 1.5em;
  cursor: pointer;
`;

const GrayArrowButton = styled.button`
  background: #00000013;
  border: none;
  border-radius: 5px;
  margin: 0.3rem;
  font-size: 1.5em;
  cursor: pointer;
`;

const MonthDisplay = styled.div`
  margin: 0 1rem;
  font-size: 1em;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const DropdownIcon = styled.span`
  margin-left: 0.5rem;
  font-size: 0.8em;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 60%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 60%;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  white-space: nowrap; /* 한 줄로 유지 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 ...으로 표시 */
  align-items: 'center';

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default MonthSelector;