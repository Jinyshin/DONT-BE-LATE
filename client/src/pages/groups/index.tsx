import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../../components/Header';
import MainBottomNavigation from '../../components/MainBottomNavigation';

interface Group {
  id: number;
  name: string;
  memberCount: string;
}

// 임시 데이터
const tempGroups: Group[] = [
  {
    id: 1,
    name: '🤖 인간지능 🤖',
    memberCount: '4명',
  },
  {
    id: 2,
    name: '❄️ 눈송아 공부 또하자 ❄️',
    memberCount: '18명',
  },
  {
    id: 3,
    name: '전진! 기술혁명 소프트웨어',
    memberCount: '15명',
  },
  {
    id: 4,
    name: '갓쭈고 (갓생레쭈고라는뜻)',
    memberCount: '41명',
  },
  {
    id: 5,
    name: '❄️ 송이들 공부방 ❄️',
    memberCount: '33명',
  },
  {
    id: 6,
    name: '야망송 열품타 인증 스터디',
    memberCount: '10명',
  },
  {
    id: 7,
    name: '몰캠그룹이',
    memberCount: '3명',
  },
];

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    // 임시 데이터를 사용하여 상태 설정
    setGroups(tempGroups);
  }, []);
  // useEffect(() => {
  //   const fetchGroups = async () => {
  //     try {
  //       const response = await axios.get('/api/groups'); // TODO: 서버에서 데이터 가져오기
  //       setGroups(response.data);
  //     } catch (error) {
  //       console.error('Error fetching groups:', error);
  //     }
  //   };

  //   fetchGroups();
  // }, []);

  return (
    <Container>
      <Header title="나의 그룹" />
      {groups.map((group) => (
        <GroupItem key={group.id}>
          <GroupHeader>
            <GroupName>{group.name}</GroupName>
          </GroupHeader>
          <GroupDetails>
            <span>{group.memberCount}</span>
          </GroupDetails>
        </GroupItem>
      ))}
      <FloatingButton>+</FloatingButton>
      <MainBottomNavigation />
    </Container>
  );
};

const Container = styled.div`
  padding: 80px 20px 20px 20px;
`;

const GroupItem = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding: 16px 0;
  &:last-child {
    border-bottom: none;
  }
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const GroupName = styled.span`
  font-weight: 600;
  font-size: 1em;
  flex-grow: 1;
`;

const GroupDetails = styled.div`
  color: #666;
  font-size: 0.9em;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 16px;
  background-color: #5581d9;
  color: white;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export default GroupsPage;
