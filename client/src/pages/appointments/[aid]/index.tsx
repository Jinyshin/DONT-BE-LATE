// src/pages/appointments/{aid}.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GroupHeader from '../../../components/GroupHeader';
import { useParams } from 'next/navigation';
import ArrivalList from '../../../components/ArrivalList';

interface Ranking {
  name: string;
  time: number;
  hasArrived: boolean;
}

const app1Rankings: Ranking[] = [
  { name: '김가가', time: -8.0533, hasArrived: true },
  { name: '김나나', time: 9.2244, hasArrived: true },
  { name: '김다다', time: 8.5155, hasArrived: true },
  { name: '김라라', time: 7.3766, hasArrived: true },
  { name: '김마마', time: 0, hasArrived: false },
  { name: '김바바', time: 0, hasArrived: false },
];

const app2Rankings: Ranking[] = [
  { name: '김가가', time: -5.0533, hasArrived: true },
  { name: '김나나', time: -3.2244, hasArrived: true },
  { name: '김다다', time: 3.5155, hasArrived: true },
  { name: '김라라', time: 2.3766, hasArrived: true },
  { name: '김마마', time: 1.5777, hasArrived: true },
  { name: '김바바', time: 0, hasArrived: false },
];

const app3Rankings: Ranking[] = [
  { name: '김가가', time: -6.0533, hasArrived: true },
  { name: '김나나', time: -9.2244, hasArrived: true },
  { name: '김다다', time: 0, hasArrived: false },
  { name: '김라라', time: 0.3766, hasArrived: true },
  { name: '김마마', time: 2.5777, hasArrived: true },
  { name: '김바바', time: 4.0988, hasArrived: true },
];

const getRankingsByAppId = (appId: number): Ranking[] => {
  if (appId === 1) {
    return app1Rankings;
  } else if (appId === 2) {
    return app2Rankings;
  } else if (appId === 3) {
    return app3Rankings;
  }
  return [];
};

const AppointmentDetail: React.FC = () => {
  const params = useParams<{ aid: string }>();
  const [aid, setAid] = useState<number | null>(null);
  const [rankings, setRankings] = useState<{ onTime: Ranking[]; late: Ranking[]; notArrived: Ranking[] }>({
    onTime: [],
    late: [],
    notArrived: []
  });

  useEffect(() => {
    if (params) {
      const aidNumber = parseInt(params.aid);
      setAid(aidNumber);
      const fetchedRankings = getRankingsByAppId(aidNumber);
      setRankings({
        onTime: fetchedRankings.filter((a) => a.hasArrived && a.time <= 0).sort((a, b) => a.time - b.time),
        late: fetchedRankings.filter((a) => a.hasArrived && a.time > 0).sort((a, b) => a.time - b.time),
        notArrived: fetchedRankings.filter((a) => !a.hasArrived),
      });
    }
  }, [params]);

  return (
    <Container>
      <GroupHeader title="약속 상세" />
      <AppointmentWrapper>
        <AppointmentDisplay>밥 약속</AppointmentDisplay>
        <Penalty>오늘의 벌칙: 1등에게 커피 사주기</Penalty>
      </AppointmentWrapper>

      <Card>
        <CardTitle>지각한 사람</CardTitle>
        <ArrivalList arrivals={rankings.late} />
      </Card>

      <Card>
        <CardTitle>빨리 온 사람</CardTitle>
        <ArrivalList arrivals={rankings.onTime} />
      </Card>

      <Card>
        <CardTitle>아직 안 온 사람</CardTitle>
        <ArrivalList arrivals={rankings.notArrived} />
      </Card>

    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
`;

const AppointmentDisplay = styled.div`
  align-self: flex-start;
  margin-left: 2rem;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const AppointmentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem; /* Adjust as necessary to avoid overlap with Header */
  position: relative;
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

const Penalty = styled.div`
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
  align-items: center;
  font-size: 1rem;
  //font-weight: bold;
  color: ${({ theme }) => theme.colors.warning};
`;

export default AppointmentDetail;
