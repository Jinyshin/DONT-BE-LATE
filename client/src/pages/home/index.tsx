import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TimelineCard from '../../components/TimelineCard';
import Header from '../../components/Header';
import MainBottomNavigation from '../../components/MainBottomNavigation';
import { formatDate } from '../../utils/dateFormatter';
import CheckinModal from '../../components/Modal/CheckinModal';

interface Appointment {
  id: number;
  title: string;
  location: string;
  meet_at: string;
  group_name: string;
  checked_in: boolean;
  participants: string[];
}

interface FormattedAppointment extends Appointment {
  formattedDate: string;
  formattedTime: string;
}

export default function Home() {
  const [appointments, setAppointments] = useState<FormattedAppointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [checkinTime, setCheckinTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/appointments`
        );
        const formattedAppointments = response.data.map(
          (appointment: Appointment) => {
            const { formattedDate, formattedTime } = formatDate(
              appointment.meet_at
            );
            return {
              ...appointment,
              formattedDate,
              formattedTime,
            };
          }
        );
        setAppointments(formattedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleCheckIn = async (aid: number) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/appointments/${aid}/checkin`
      );
      setCheckinTime(response.data.time_difference);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === aid
            ? { ...appointment, checked_in: true }
            : appointment
        )
      );
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Header title="나의 약속" />
      <Content>
        {appointments.map((appointment) => (
          <TimelineCardWrapper key={appointment.id}>
            <TimelineCard
              title={appointment.title}
              group={appointment.group_name}
              location={appointment.location}
              date={appointment.formattedDate}
              time={appointment.formattedTime}
              participants={appointment.participants}
              checked={appointment.checked_in}
              onCheckIn={() => handleCheckIn(appointment.id)}
            />
          </TimelineCardWrapper>
        ))}
      </Content>
      <MainBottomNavigation activeTab="홈" />
      <CheckinModal
        isOpen={isModalOpen}
        onClose={onClose}
        time={checkinTime ?? 0}
      />
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh;
  padding-top: 60px;
`;

const Content = styled.div`
  padding: 20px 20px 100px 20px;
`;

const TimelineCardWrapper = styled.div`
  margin-bottom: 15px;
`;
