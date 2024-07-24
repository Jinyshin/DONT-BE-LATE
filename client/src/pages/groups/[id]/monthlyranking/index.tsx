// src/pages/MonthlyRanking/index.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MonthSelector from '../../../../components/MonthSelector';
import RankingList from '../../../../components/RankingList';
import GroupBottomNavigation from '../../../../components/GroupBottomNavigation';
import GroupHeader from '../../../../components/GroupHeader';
import { useParams } from 'next/navigation';
import axios from 'axios';


type Ranking = {
  name: string;
  time: number;
}

const MonthlyRanking: React.FC = () => {
  const params = useParams();
  const [ year, setYear ] = useState(0);
  const [ month, setMonth ] = useState(0);
  const [ token, setToken ] = useState('');
  const [ rankings, setRankings ] = useState<Ranking[]>([]);

  const monthWhenCalled = new Date();
  const [ currentMonth, setCurrentMonth ] = useState(monthWhenCalled);

  useEffect(() => {
    const callback = async () => {
      if (!params?.id) {
        return;
      }

      const { id } = params;
      // const year = new Date().getFullYear();
      // const month = new Date().getMonth() + 1;
      const year = 2024;
      const month = currentMonth.getMonth() + 1;
      const accessToken = localStorage.getItem('accessToken') ?? '';

      type Response = {
        rankings: {
          user: {
            nickname: string;
            profile_url: string;
          };
          accumulated_time: number;
          year: number;
          month: number;
        }[];
      }
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/groups/${id}/ranking`
      const { data } = await axios.get<Response>(
        url,
        {
          params: { year, month },
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      )
      console.log(data);
      const rankings = data
        .rankings
        .map((r) => ({
          name: r.user.nickname,
          time: r.accumulated_time / 3600
        }));

      setYear(year);
      setMonth(month);
      setToken(accessToken);
      setRankings(rankings);
    };

    callback();
  }, [params, currentMonth]);

  return (
    <Container>
      <GroupHeader title="월간 랭킹" />
      <MonthSelectorWrapper>
        <MonthSelector
        monthWhenCalled={monthWhenCalled}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
      </MonthSelectorWrapper>
      <Card>
        <CardTitle>이번 달 지각 시간</CardTitle>
        <MyRank>내 등수 0등</MyRank>
        <RankingList rankings={rankings} />
      </Card>
      <GroupBottomNavigation activeTab="랭킹" groupId={params?.id as string} />
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
