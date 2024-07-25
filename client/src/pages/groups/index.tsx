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

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isJoinGroupModalOpen, setJoinGroupModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/groups`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const formattedGroups = response.data.map((group: any) => ({
          id: group.id,
          name: group.name,
          memberCount: `${group.num_participants}명`,
        }));
        setGroups(formattedGroups);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

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
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/groups`,
        {
          name: groupName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const handleJoinGroup = async (groupCode: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/groups/join`,
        {
          groupCode: groupCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const joinedGroup: Group = {
        id: response.data.gid,
        name: response.data.name,
        memberCount: `${response.data.num_participants}명`,
      };

      setGroups([...groups, joinedGroup]);
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setJoinGroupModalOpen(false);
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
        onSubmit={handleJoinGroup}
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
