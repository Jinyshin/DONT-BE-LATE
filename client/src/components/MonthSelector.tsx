// src/components/MonthSelector.tsx
    //MonthSelector for Monthly Ranking
import React,{useState} from 'react';
import styled from 'styled-components';
import { getNextMonth, getPreviousMonth, formatMonth } from '../utils/dateUtil';

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ currentMonth, setCurrentMonth }) => {
  const [showDropdown, setShowDropdown]= useState(false);
  
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
          new Date(currentMonth.getFullYear(),
                    currentMonth.getMonth()-i, 1)
                  ));
    }
    return months;
  }

  return (
    <Container>
      <ArrowButton onClick={handlePreviousMonth}>{"<"}</ArrowButton>
      <MonthDisplay onClick={handleMonthClick}>
        {formatMonth(currentMonth)} <DropdownIcon>▼</DropdownIcon>
      </MonthDisplay>
      <ArrowButton onClick={handleNextMonth}>{">"}</ArrowButton>
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
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default MonthSelector;