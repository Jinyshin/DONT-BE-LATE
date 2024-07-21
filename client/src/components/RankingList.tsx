// src/components/RankingList.tsx
import React from 'react';
import styled from 'styled-components';

interface RankingItemProps {
  name: string;
  time: number;
}

interface RankingListProps {
  rankings: RankingItemProps[];
}

const RankingList: React.FC<RankingListProps> = ({ rankings }) => {
  const formatTime =(time: number)=>{
    const absTime= Math.abs(time);
    const hours =Math.floor(absTime);
    const minutes = Math.floor((absTime*60)%60);
    const seconds = Math.floor((absTime*3600)%60);
    return `${time < 0 ? '-':''}${hours}시간 ${minutes}분 ${seconds}초`;
  }

  return (
    <Container>
      {rankings.map((item, index) => (
        <RankingItem key={index} rank={index + 1}>
          <Rank>
            {index + 1}
            {index + 1 === 1 && <Crown>👑</Crown>}
            {index + 1 === 2 && <Medal>🥈</Medal>}
            {index + 1 === 3 && <Medal>🥉</Medal>}
          </Rank>
          <Name>{item.name}</Name>
          <Time time={item.time}>{formatTime(item.time)}</Time>
        </RankingItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 1rem;
`;

const RankingItem = styled.div<{ rank: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  background-color: ${({ rank }) => (rank <= 3 ? '#5581D926' : '#FFF')}; /* 1, 2, 3위는 특별한 배경 */
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

const Time = styled.div`
  font-size: 0.8em;
  color:  ${({ time }) => (time > 0 ? '#F22E2E' : '#5581D9')};
`;

export default RankingList;
