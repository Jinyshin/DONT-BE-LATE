import styled from 'styled-components';
import TimelineCard from '../components/TimelineCard';
import { formatDate } from '../utils/dateFormatter';
import {useRouter} from 'next/router';

export default function Home() {
  const handleCheckIn = () => {
    alert('Checked in!');
  };
  const router= useRouter();

  const appointments = [
    {
      title: '밥 약속',
      group: '상우와 아이들',
      location: '사당역 2호선 00식당',
      date: formatDate('2024-05-26T10:00:00'),
    },
    {
      title: '취업 스터디',
      group: '몰캠이들',
      location: '사당역 2호선 00카페',
      date: formatDate('2024-05-26T14:00:00'),
    },
  ];

  return (
    <Container>
      <Title>나의 약속</Title>
      {appointments.map((appointment, index) => (
        <TimelineCardWrapper key={index}>
          <TimelineCard
            title={appointment.title}
            group={appointment.group}
            location={appointment.location}
            date={appointment.date}
            onCheckIn={handleCheckIn}
          />
        </TimelineCardWrapper>
      ))}

    </Container>

  );
}

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2em;
  text-align: left;
  margin-bottom: 20px;
`;

const TimelineCardWrapper = styled.div`
  margin-bottom: 15px;
`;
