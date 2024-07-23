import React, { useState } from 'react';
import styled from 'styled-components';
import TimelineCard from '../../components/TimelineCard';
import Header from '../../components/Header';
import MainBottomNavigation from '../../components/MainBottomNavigation';
import { formatDate } from '../../utils/dateFormatter';
import CheckinModal from '../../components/CheckinModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen]= useState<boolean>(false);
  const handleCheckIn = () => {
    setIsModalOpen(true);
  };

  const onClose= ()=>{
    setIsModalOpen(false);
  };

  // 임시 데이터
  const appointments = [
    {
      title: '밥 약속',
      group: '상우와 아이들',
      location: '사당역 2호선 00식당',
      checked: true,
      date: formatDate('2024-05-26T10:00:00'),
    },
    {
      title: '취업 스터디',
      group: '몰캠이들',
      location: '사당역 2호선 00카페',
      checked: false,
      date: formatDate('2024-05-26T14:00:00'),
    },
  ];

  return (
    <Container>
      <Header title="나의 약속" />
      <Content>
        {appointments.map((appointment, index) => (
          <TimelineCardWrapper key={index}>
            <TimelineCard
              title={appointment.title}
              group={appointment.group}
              location={appointment.location}
              date={appointment.date}
              checked={appointment.checked}
              onCheckIn={handleCheckIn}
            />
          </TimelineCardWrapper>
        ))}
      </Content>
      <MainBottomNavigation activeTab='홈' />
      <CheckinModal isOpen= {isModalOpen} onClose={onClose} time={-3.234}/>

    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */
  padding-top: 60px; /* 헤더 높이 만큼 패딩 추가 */
`;

const Content = styled.div`
  padding: 20px;
`;

const TimelineCardWrapper = styled.div`
  margin-bottom: 15px;
`;
