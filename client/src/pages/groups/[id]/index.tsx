import Image from 'next/image';
import GroupBottomNavigation from '../../../components/GroupBottomNavigation';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiShare2 } from 'react-icons/fi';
import { IoMdMore } from 'react-icons/io';
import styled from 'styled-components';
import GroupHeader from '../../../components/GroupHeader';
import FloatingButton from '../../../components/FloatingButton';
import CreateAppointmentModal from '../../../components/Modal/CreateAppointmentModal';

type Group = ReturnType<typeof getGroupById>;
type Appointment = Group['appointments'][number];
export default function Group() {
  const params = useParams<{ id: string }>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getGroupInfo = async (id: number) => {
      try {
        const { appointments } = await getGroupById(id);
        setAppointments(appointments);
      } catch (e) {}
    };

    if (params != null) {
      const { id } = params;
      getGroupInfo(parseInt(id));
    }
  }, [params]);

  const id = parseInt(params?.id);
  const now = Date.now() / 1000;
  const toggleIsAccepted = (aid: number) => async () => {
    const toggledAppointments = appointments.map((e) => {
      if (e.id === aid) {
        return {
          ...e,
          isAccepted: !e.isAccepted,
        };
      } else {
        return e;
      }
    });
    alert('toggled');

    setAppointments(toggledAppointments);
  };
  const currentAppointments = appointments.filter(
    ({ datetime }) => datetime > now
  );
  const previousAppointments = appointments.filter(
    ({ datetime }) => datetime <= now
  );

  const handleFloatingButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateAppointment = () => {};

  return (
    <>
      <Container>
        <GroupHeader title="우리의 일정" />
        <Content>
          <CurrentAppointments
            h={toggleIsAccepted}
            appointments={currentAppointments}
          />
          <PreviousAppointments
            h={toggleIsAccepted}
            appointments={previousAppointments}
          />
        </Content>
      </Container>
      <GroupBottomNavigationPlaceholder />
      <FloatingButton onClick={handleFloatingButtonClick} />
      <GroupBottomNavigation activeTab="약속" groupId={params?.id as string} />
      <CreateAppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateAppointment}
      ></CreateAppointmentModal>
    </>
  );
}

const toAppointment = (appId: number) => {
  const router = useRouter();
  return () => {
    router.push(`/appointments/${appId}`);
  };
};

const CurrentAppointments = ({
  h,
  appointments,
}: {
  h: (aid: number) => () => Promise<void>;
  appointments: Appointment[];
}) => {
  return (
    <section>
      <details open={true}>
        <Summary>
          <h2>돌아올 약속</h2>
        </Summary>
        <AppointmentList>
          {appointments.map((e) => (
            <li key={e.id.toString()}>
              <AppointmentCard onClick={toAppointment(e.id)}>
                <GroupAppointmentCard h={h} appointment={e} />
              </AppointmentCard>
            </li>
          ))}
        </AppointmentList>
      </details>
    </section>
  );
};

const PreviousAppointments = ({
  h,
  appointments,
}: {
  h: (aid: number) => () => Promise<void>;
  appointments: Appointment[];
}) => {
  return (
    <section>
      <details>
        <Summary>
          <h2>지난 약속</h2>
        </Summary>
        <AppointmentList>
          {appointments.map((e) => (
            <li key={e.id.toString()}>
              <AppointmentCard onClick={toAppointment(e.id)}>
                <GroupAppointmentCard h={h} appointment={e} />
              </AppointmentCard>
            </li>
          ))}
        </AppointmentList>
      </details>
    </section>
  );
};

const GroupAppointmentCard = ({
  h,
  appointment,
}: {
  h: (aid: number) => () => Promise<void>;
  appointment: Appointment;
}) => {
  const { id, title, datetime, location, isAccepted, participants } =
    appointment;

  return (
    <>
      <AppointmentCardHeader>
        <AppointmentCardTitle>{title}</AppointmentCardTitle>
        <AppointmentCardToolbox>
          <ShareIcon />
          <MoreIcon />
        </AppointmentCardToolbox>
      </AppointmentCardHeader>
      <AppointmentBody>
        <AppointmentParticipants participants={participants} />
        <AppointmentLocation>{location}</AppointmentLocation>
        <AppointmentDatetime>
          {new Date(datetime * 1000).toISOString()}
        </AppointmentDatetime>
        {isAccepted ? (
          <AppointmentDeclineButton h={h(id)} />
        ) : (
          <AppointmentAcceptButton h={h(id)} />
        )}
      </AppointmentBody>
    </>
  );
};

const AppointmentParticipants = ({
  participants,
}: {
  participants: Appointment['participants'];
}) => {
  const AppointmentParticipantProfiles = styled.div`
    display: flex;
    flex-direction: row;
    overflow: scroll;
  `;

  const AppointmentParticipantProfileImageContainer = styled.div<{
    idx: number;
  }>`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-bottom: 8px;
    overflow: hidden;
    transform: translateX(${(props) => props.idx * -40}%);
    background-color: lightgrey;
  `;

  return (
    <AppointmentParticipantProfiles>
      {participants.map(({ profileUrl }, i) => (
        <AppointmentParticipantProfileImageContainer key={i} idx={i}>
          <Image src={profileUrl} alt="" width={32} height={32} />
        </AppointmentParticipantProfileImageContainer>
      ))}
    </AppointmentParticipantProfiles>
  );
};

const AppointmentAcceptButton = ({ h }: { h: () => Promise<void> }) => {
  const AcceptButton = styled.button`
    margin-top: 1rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.grayscale.white};
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    width: 100%;

    cursor: pointer;

    &:active {
      background-color: ${({ theme }) => theme.colors.secondaryDark};
    }
  `;

  return <AcceptButton onClick={h}>참석</AcceptButton>;
};

const AppointmentDeclineButton = ({ h }: { h: () => Promise<void> }) => {
  const DeclineButton = styled.button`
    margin-top: 1rem;
    background-color: ${({ theme }) => theme.colors.warning};
    color: ${({ theme }) => theme.colors.grayscale.white};
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    width: 100%;

    cursor: pointer;

    &:active {
      background-color: ${({ theme }) => theme.colors.secondaryDark};
    }
  `;

  return <DeclineButton onClick={h}>불참</DeclineButton>;
};

const Container = styled.main`
  width: 100%;
  padding: 8px 16px;
  box-sizing: border-box;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 60px 0 100px 0;
`;

const Summary = styled.summary`
  list-style: none;
`;

const AppointmentList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  li:not(:first-child) {
    margin-top: 16px;
  }
`;

const AppointmentCard = styled.article`
  padding: 16px 16px;
  border: 1px solid grey;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
`;

const AppointmentCardHeader = styled.header`
  height: 32px;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AppointmentCardTitle = styled.h3`
  max-width: 232px;
  height: 28px;
  margin: 0;
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const AppointmentCardToolbox = styled.aside`
  display: flex;
  gap: 8px;
  flex-direction: row;
  align-items: center;
`;

const ShareIcon = styled(FiShare2)`
  width: 22px;
  height: 22px;
  display: block;
  cursor: pointer;

  &:active {
    color: ${({ theme }) => theme.colors.gray20};
  }
`;

const MoreIcon = styled(IoMdMore)`
  width: 28px;
  height: 28px;
  display: block;
  cursor: pointer;

  &:active {
    color: ${({ theme }) => theme.colors.gray20};
  }
`;

const AppointmentBody = styled.div``;

const AppointmentLocation = styled.p`
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.grayscale.gray60};
`;

const AppointmentDatetime = styled.p`
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.grayscale.gray60};
`;

const GroupBottomNavigationPlaceholder = styled.div`
  height: 63px;
`;

const getGroupById = (id: number) => {
  const generateAppointments = (aid: number) => {
    const generateDatetime = () => {
      const datetimes = [
        Date.parse('2024-07-13T11:00:00') / 1000,
        Date.parse('2024-07-15T12:00:00') / 1000,
        Date.parse('2024-07-17T13:00:00') / 1000,
        Date.parse('2024-07-19T12:00:00') / 1000,
        Date.parse('2024-07-21T16:00:00') / 1000,
        Date.parse('2024-07-23T15:00:00') / 1000,
        Date.parse('2024-07-25T18:00:00') / 1000,
        Date.parse('2024-07-27T17:00:00') / 1000,
        Date.parse('2024-07-29T15:00:00') / 1000,
      ];

      return datetimes[aid % datetimes.length];
    };
    const randomLoction = () => {
      const locations = [
        '신촌역',
        '사당역 4번 출구',
        '강남역 10번 출구',
        '대학로 291 N1 김병호김삼열IT융합빌딩',
      ];
      const locationIdx = Math.floor(Math.random() * locations.length);

      return locations[locationIdx];
    };
    const generateParticipants = (pid: number) => {
      return {
        id: pid,
        name: `participant ${pid}`,
        profileUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ9ZbUUdXffCmlIetQlXY-CcYTSQcZRF1Wvw&s',
      };
    };

    const participants = Array.from(new Array(100).keys())
      .sort((a, b) => Math.random() - 0.5)
      .slice(0, 2 + Math.floor(Math.random() * 3))
      .map(generateParticipants);

    return {
      id: aid,
      title: `Demo Group ${id} Appointment ${aid}`,
      datetime: generateDatetime(),
      location: randomLoction(),
      isAccepted: Math.random() < 0.5,
      participants,
    };
  };

  const appointments = Array.from(new Array(100).keys())
    .sort((a, b) => Math.random() - 0.5)
    .slice(0, 8)
    .map(generateAppointments)
    .sort((a, b) => {
      if (a.datetime < b.datetime) {
        return -1;
      } else if (a.datetime == b.datetime) {
        return 0;
      } else {
        return 1;
      }
    });

  return {
    id: id,
    name: `Demo Group Name ${id}`,
    appointments,
  };
};
