import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { MdEvent, MdLeaderboard, MdMailOutline } from 'react-icons/md';

const GroupBottomNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('약속');

  return (
    <Nav>
      <NavItem
        href="/appointments"
        active={activeTab === '약속'}
        onClick={() => setActiveTab('약속')}
      >
        <MdEvent size={24} />
        <span>약속</span>
      </NavItem>
      <NavItem
        href="/ranking"
        active={activeTab === '랭킹'}
        onClick={() => setActiveTab('랭킹')}
      >
        <MdLeaderboard size={24} />
        <span>랭킹</span>
      </NavItem>
      <NavItem
        href="/invitations"
        active={activeTab === '초대'}
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
  left: 0; /* 화면의 왼쪽 끝에 고정 */
  right: 0; /* 화면의 오른쪽 끝에 고정 */
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000; /* Ensure it stays on top of other content */
`;

const NavItem = styled(Link)<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ active }) => (active ? '#5581D9' : '#999999')};
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
