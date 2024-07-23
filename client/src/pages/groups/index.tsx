import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import MainBottomNavigation from '../../components/MainBottomNavigation';
import ExpandableFloatingButton from '../../components/ExpandableFloatingButton';
import CreateGroupModal from '../../components/Modal/CreateGroupModal';
import JoinGroupModal from '../../components/Modal/JoinGroupModal';

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
  const [isJoinGroupModalOpen, setJoinGroupModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const router = useRouter();

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

  const handleCreateGroupButtonClick = () => {
    setCreateGroupModalOpen(true);
  };

  const handleJoinGroupButtonClick = () => {
    setJoinGroupModalOpen(true);
  };

  const handleCloseCreateGroupModal = () => {
    setCreateGroupModalOpen(false);
  };

  const handleCloseJoinGroupModal = () => {
    setJoinGroupModalOpen(false);
  };

  const handleCreateGroup = async (groupName: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/groups`,
        {
          name: groupName,
        }
      );

      const newGroup: Group = {
        id: response.data.id,
        name: response.data.name,
        memberCount: `${response.data.num_participants}명`,
      };

      setGroups([...groups, newGroup]);
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setCreateGroupModalOpen(false);
    }
  };

  const handleGroupClick = (groupId: number) => {
    router.push(`/groups/${groupId}`);
  };

  return (
    <PageContainer>
      <Header title="나의 그룹" />
      <Content>
        {groups.map((group) => (
          <GroupItem key={group.id} onClick={() => handleGroupClick(group.id)}>
            <GroupHeader>
              <GroupName>{group.name}</GroupName>
            </GroupHeader>
            <GroupDetails>
              <span>{group.memberCount}</span>
            </GroupDetails>
          </GroupItem>
        ))}
      </Content>
      <ExpandableFloatingButton
        onJoinGroupClick={handleJoinGroupButtonClick}
        onCreateGroupClick={handleCreateGroupButtonClick}
      />
      <MainBottomNavigation activeTab="그룹" />
      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={handleCloseCreateGroupModal}
        onSubmit={handleCreateGroup}
      />

      <JoinGroupModal
        isOpen={isJoinGroupModalOpen}
        onClose={handleCloseJoinGroupModal}
        onSubmit={handleCreateGroup}
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 80px 20px 100px 20px; /* bottom padding 추가 */
`;

const GroupItem = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding: 12px 0;
  cursor: pointer;

  &:last-child {
    margin-bottom: 60px;
  }
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const GroupName = styled.span`
  font-weight: 400;
  font-size: 1.2em;
  flex-grow: 1;
`;

const GroupDetails = styled.div`
  color: #666;
  font-size: 1.1em;
`;

export default GroupsPage;
