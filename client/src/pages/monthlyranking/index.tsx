// src/pages/MonthlyRanking.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import MonthSelector from '../../components/MonthSelector';
import RankingList from '../../components/RankingList';

interface Ranking {
  name: string;
  time: number;
}

const initialRankings: Ranking[] = [
  { name: '홍길동', time: -2 },
  { name: '이순신', time: 1 },
  { name: '강감찬', time: 3 },
  { name: '김유신', time: 0 },
];

const MonthlyRanking: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const sortedRankings = [...initialRankings].sort((a, b) => a.time - b.time);

  return (
    <Container>
      <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      <RankingList rankings={sortedRankings} />
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
`;

export default MonthlyRanking;
