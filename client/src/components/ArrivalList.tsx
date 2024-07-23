// src/components/RankingList.tsx
import React from 'react';
import styled from 'styled-components';

interface ArrivalItemProps {
  name: string;
  time: number;
  hasArrived: boolean;
}

interface ArrivalListProps {
  arrivals: ArrivalItemProps[];
}

const ArrivalList: React.FC<ArrivalListProps> = ({ arrivals }) => {
  const formatTime =(time: number)=>{
    const absTime= Math.abs(time);
    const hours =Math.floor(absTime);
    const minutes = Math.floor((absTime*60)%60);
    const seconds = Math.floor((absTime*3600)%60);
    return `${time < 0 ? '-':''}${hours}시간 ${minutes}분 ${seconds}초`;
  }

  return (
    <Container>
      {arrivals.map((item, index) => (
        <ArrivalItem key={index} hasArrived={item.hasArrived} onTime={item.time<=0}>
          {item.hasArrived && 
          (<Rank>
            {index + 1}
            {index + 1 === 1 && item.time<=0 && <Crown>👑</Crown>}
            {index + 1 === 2 && item.time<=0 && <Medal>🥈</Medal>}
            {index + 1 === 3 && item.time<=0 && <Medal>🥉</Medal>}
          </Rank>)}
          <Name>{item.name}</Name>
          {item.hasArrived &&
          <Time time={item.time} >{formatTime(item.time)}</Time>}
        </ArrivalItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 1rem;
`;

const ArrivalItem = styled.div<{ hasArrived: boolean, onTime: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  background-color: ${ ({ hasArrived, onTime }) => {
    if (hasArrived) {
      return onTime? '#5581D926': '#F22E2E26' ;
    }
    else{
      return '#FFF';
    }}};
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Rank = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
  width: 50px
`;

const Crown = styled.span`
  margin-left: 0.5rem;
`;

const Medal = styled.span`
  margin-left: 0.5rem;
`;

const Name = styled.div`
  flex: 1;
  text-align: center;
`;

const Time = styled.div<{time: number}>`
  font-size: 0.8em;
  color:  ${({ time }) => (time > 0 ? '#F22E2E' : '#5581D9')};
`;



export default ArrivalList;
