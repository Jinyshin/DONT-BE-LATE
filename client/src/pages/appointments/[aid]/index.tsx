// src/pages/appointments/{aid}.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useSearchParams } from 'next/navigation';
import { EarlyArrivalList, LateArrivalList,NotArrivalList } from '../../../components/ArrivalList';
import axios from 'axios';
import AppointmentDetailHeader from '../../../components/AppointmentDetailHeader';
import PushModalExample from '../../../components/Modal/PushModalExample';

const AppointmentDetail: React.FC = () => {
  const [isModalOpen, setIsModalOpen] =  useState<boolean>(false);

  const params = useParams<{ aid: string }>();
  const searchParams = useSearchParams();
  const [aid, setAid] = useState<number | null>(null);

  const [latecheckins, setLatecheckins]= useState<{name: string, latency: number}[]>([]);
  const [earlycheckins, setEarlycheckins]= useState<{name: string, latency: number}[]>([]);
  const [incompletecheckins, setIncompletecheckins]= useState<{name: string}[]>([]);

  const [title, setTitle]= useState<string>("...");
  const [penalty, setPenalty]= useState<string>("...");
  const [meetAt, setMeetAt] = useState<Date>(new Date());

  const appointmentdata={
    title: title,
    penalty: penalty,
    latecheckins: latecheckins,
    earlycheckins: earlycheckins,
    incompletecheckins: incompletecheckins,
    meet_at: meetAt
  };

  useEffect(() => {
    if (params) {
      const aidNumber = parseInt(params.aid);
      setAid(aidNumber);
      const fetchedAppDetail =  async (aid: number) => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/appointments/${aid}`);
          const data = response.data;

          setTitle(data.title);
          setPenalty(data.penalty);
          setLatecheckins(data.latecheckins);
          setEarlycheckins(data.earlycheckins);
          setIncompletecheckins(data.incompletecheckins);
          setMeetAt(data.meet_at);
        } catch (error) {
          console.error('Failed to fetch appointment details:', error);
        }
      };
      fetchedAppDetail(aidNumber);

      const modalParam = searchParams.get('modal');
        setIsModalOpen(modalParam === 'true');
      
    }
  }, [params, searchParams]);

  const closeModal = () =>{
    setIsModalOpen(false);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('modal');
    window.history.replaceState({},'',currentUrl.toString());
  }

  return (
    <Container>
      <AppointmentDetailHeader title="약속 상세" />
      <AppointmentWrapper>
        <AppointmentDisplay>{title}</AppointmentDisplay>
        <Penalty>오늘의 벌칙: {penalty}</Penalty>
      </AppointmentWrapper>

      <Card>
        <CardTitle>지각한 사람</CardTitle>
        <LateArrivalList checkins={latecheckins} />
      </Card>

      <Card>
        <CardTitle>빨리 온 사람</CardTitle>
        <EarlyArrivalList checkins={earlycheckins} />
      </Card>

      <Card>
        <CardTitle>아직 안 온 사람</CardTitle>
        <NotArrivalList checkins={incompletecheckins}/>
      </Card>

      {isModalOpen && <PushModalExample appointmentdata={appointmentdata} onClose = {closeModal} />}
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
