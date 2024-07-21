// src/pages/MonthlyRanking/index.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import MonthSelector from '../../../../components/MonthSelector';
import RankingList from '../../../../components/RankingList';
import GroupBottomNavigation from '../../../../components/GroupBottomNavigation';
import GroupHeader from '../../../../components/GroupHeader';

interface Ranking {
  name: string;
  time: number;
}

const julyRankings: Ranking[] = [
  { name: '김가가', time: -58.0533 },
  { name: '김나나', time: 39.2244 },
  { name: '김다다', time: 38.5155 },
  { name: '김라라', time: 27.3766 },
  { name: '김마마', time: 17.5777 },
  { name: '김바바', time: 13.0988 },
];

const juneRankings: Ranking[] = [
  { name: '김가가', time: -58.0533 },
  { name: '김나나', time: -39.2244 },
  { name: '김다다', time: 38.5155 },
  { name: '김라라', time: 27.3766 },
  { name: '김마마', time: 17.5777 },
  { name: '김바바', time: 13.0988 },
];

const augustRankings: Ranking[] = [
  { name: '김가가', time: -16.0533 },
  { name: '김나나', time: -9.2244 },
  { name: '김다다', time: 30.5155 },
  { name: '김라라', time: 30.3766 },
  { name: '김마마', time: 22.5777 },
  { name: '김바바', time: 4.0988 },
];

const getRankingsByMonth = (month: Date) => {
  if (month.getMonth() === 6) {
    return julyRankings;
  } else if (month.getMonth() === 5) {
    return juneRankings;
  } else if (month.getMonth() === 7) {
    return augustRankings;
  }
  return [];
};

const MonthlyRanking: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const sortedRankings = getRankingsByMonth(currentMonth).sort(
    (a, b) => a.time - b.time
  );

  return (
    <Container>
      <GroupHeader title="월간 랭킹" />
      <MonthSelectorWrapper>
        <MonthSelector
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
      </MonthSelectorWrapper>
      <Card>
        <CardTitle>이번 달 지각 시간</CardTitle>
        <MyRank>내 등수 0등</MyRank>
        <RankingList rankings={sortedRankings} />
      </Card>
      <GroupBottomNavigation activeTab="랭킹" />
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
`;

const MonthSelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem; /* Adjust as necessary to avoid overlap with Header */
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.grayscale.gray20};
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.grayscale.gray80};
  flex: 1;
`;

const MyRank = styled.div`
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  //font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export default MonthlyRanking;
