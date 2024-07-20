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
  return (
    <Container>
      {rankings.map((item, index) => (
        <RankingItem key={index} rank={index + 1}>
          <Rank>{index + 1}</Rank>
          <Name>{item.name}</Name>
          <Time>{item.time} 시간</Time>
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
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  background-color: ${({ rank }) => (rank <= 3 ? '#FFD700' : '#FFF')}; /* 1, 2, 3위는 금색 배경 */
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Rank = styled.span`
  font-weight: bold;
  font-size: 1.2em;
`;

const Name = styled.span`
  flex: 1;
  text-align: center;
`;

const Time = styled.span`
  font-size: 1.2em;
`;

export default RankingList;
