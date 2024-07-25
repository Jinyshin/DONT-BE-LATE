import React from 'react';
import styled from 'styled-components';
import { MdMoreHoriz, MdShare } from 'react-icons/md';
import { handleShare } from '../utils/share';
import AppointmentParticipants from './AppointmentParticipant';
import confetti from 'canvas-confetti';

interface TimelineCardProps {
  title: string;
  location: string;
  group: string;
  date: string;
  time: string;
  checked: boolean;
  participants: string[];
  onCheckIn: () => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  title,
  group,
  location,
  date,
  time,
  checked,
  participants,
  onCheckIn,
}) => {
  const handleCheckIn = () => {
    onCheckIn();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <IconsWrapper>
          <ShareIcon onClick={() => handleShare(title, location, date)} />
          <MoreIcon />
        </IconsWrapper>
      </CardHeader>
      <CardContent>
        <GroupName>{group}</GroupName>
        <AppointmentParticipants participants={participants} />
        <Location>장소: {location}</Location>
        <DateTimeWrapper>
          <span>일정: {date} </span>
          <span>{time}</span>
        </DateTimeWrapper>
      </CardContent>
      {checked ? (
        <CheckedInButton>체크인 완료</CheckedInButton>
      ) : (
        <CheckInButton onClick={handleCheckIn}>도착 체크인</CheckInButton>
      )}
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grayscale.gray20};
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.grayscale.white};
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.grayscale.gray80};
  flex: 1;
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ShareIcon = styled(MdShare)`
  width: 22px;
  height: 22px;
  cursor: pointer;
  margin-right: 8px;

  &:active {
    color: ${({ theme }) => theme.colors.gray20};
  }
`;

const MoreIcon = styled(MdMoreHoriz)`
  width: 28px;
  height: 28px;
  cursor: pointer;

  &:active {
    color: ${({ theme }) => theme.colors.gray20};
  }
`;

const CardContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.grayscale.gray60};
`;

const GroupName = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const Location = styled.div`
  margin-top: 0.2rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.grayscale.gray60};
`;

const DateTimeWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 0.2rem;
  width: 100%;

  & > span {
    margin-right: 0.5rem; /* 요소들 사이의 간격 추가 */
  }

  & > span:last-child {
    margin-right: 0; /* 마지막 요소의 간격 제거 */
  }
`;

const CheckInButton = styled.button`
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

const CheckedInButton = styled.button`
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.grayscale.gray20};
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

export default TimelineCard;
