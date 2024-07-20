import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
`;

const CardContent = styled.div`
  margin-top: 0.5rem;
  font-size: 1rem;
`;

const CheckInButton = styled.button`
  background-color: #00cc66;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

interface TimelineCardProps {
  title: string;
  location: string;
  date: string;
  onCheckIn: () => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  title,
  location,
  date,
  onCheckIn,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <button>Share</button>
    </CardHeader>
    <CardContent>
      <div>{location}</div>
      <div>{date}</div>
    </CardContent>
    <CheckInButton onClick={onCheckIn}>도착 체크인</CheckInButton>
  </Card>
);

export default TimelineCard;
