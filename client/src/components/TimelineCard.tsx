import React from 'react';
import styled from 'styled-components';
import { FiShare2 } from 'react-icons/fi';
import { IoMdMore } from 'react-icons/io';
import { handleShare } from '../utils/share';

interface TimelineCardProps {
  title: string;
  location: string;
  group: string;
  date: string;
  onCheckIn: () => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  title,
  group,
  location,
  date,
  onCheckIn,
}) => (
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
      <div>{location}</div>
      <div>{date}</div>
    </CardContent>
    <CheckInButton onClick={onCheckIn}>도착 체크인</CheckInButton>
  </Card>
);

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

const ShareIcon = styled(FiShare2)`
  width: 22px;
  height: 22px;
  cursor: pointer;
  margin-right: 8px;

  &:active {
    color: ${({ theme }) => theme.colors.gray20};
  }
`;

const MoreIcon = styled(IoMdMore)`
  width: 28px;
  height: 28px;
  cursor: pointer;

  &:active {
    color: ${({ theme }) => theme.colors.gray20};
  }
`;

const CardContent = styled.div`
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

export default TimelineCard;
