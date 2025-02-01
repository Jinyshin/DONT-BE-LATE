import Link from 'next/link';
import React, { useState } from 'react';
import { MdEvent, MdLeaderboard, MdMailOutline } from 'react-icons/md';
import styled from 'styled-components';

interface GroupBottomNavigationProps {
  activeTab?: string;
  groupId: string;
}

const GroupBottomNavigation: React.FC<GroupBottomNavigationProps> = ({
  activeTab: propsActiveTab,
  groupId,
}) => {
  const [activeTab, setActiveTab] = useState(propsActiveTab);

  return (
    <Nav>
      <NavItem
        href={`/groups/${groupId}`}
        active={activeTab === '약속' ? 'true' : 'false'}
        onClick={() => setActiveTab('약속')}
      >
        <MdEvent size={24} />
        <span>약속</span>
      </NavItem>
      <NavItem
        href={`/groups/${groupId}/monthlyranking`}
        active={activeTab === '랭킹' ? 'true' : 'false'}
        onClick={() => setActiveTab('랭킹')}
      >
        <MdLeaderboard size={24} />
        <span>랭킹</span>
      </NavItem>
      <NavItem
        href={`/groups/${groupId}/groupInvite`} // 동적 경로로 수정
        active={activeTab === '초대' ? 'true' : 'false'}
        onClick={() => setActiveTab('초대')}
      >
        <MdMailOutline size={24} />
        <span>초대</span>
      </NavItem>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: #fff;
  border-top: 1px solid #eaeaea;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000; /* Ensure it stays on top of other content */
`;

const NavItem = styled(Link)<{ active: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ active }) => (active === 'true' ? '#5581D9' : '#999999')};
  text-decoration: none;
  font-size: 0.9em;

  svg {
    margin-bottom: 5px;
  }

  span {
    font-size: 0.75em;
  }

  &:hover {
    color: #5581d9;
  }
`;

export default GroupBottomNavigation;
