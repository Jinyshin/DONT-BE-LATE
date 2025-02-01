import Image from 'next/image';
import styled from 'styled-components';

const AppointmentParticipants = ({
  participants,
}: {
  participants: string[];
}) => {
  const AppointmentParticipantProfiles = styled.div`
    display: flex;
    flex-direction: row;
    overflow: hidden;
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
    background-color: white;
  `;

  return (
    <AppointmentParticipantProfiles>
      {participants.map((profileUrl, i) => (
        <AppointmentParticipantProfileImageContainer key={i} idx={i}>
          <Image
            src={profileUrl || '/assets/default-profile.png'}
            alt=""
            width={32}
            height={32}
          />
        </AppointmentParticipantProfileImageContainer>
      ))}
    </AppointmentParticipantProfiles>
  );
};

export default AppointmentParticipants;
