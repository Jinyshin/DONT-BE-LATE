import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { MdHomeFilled, MdPeopleAlt } from 'react-icons/md';

interface MainBottomNavigationProps{
  activeTab?: string;
}

const MainBottomNavigation: React.FC<MainBottomNavigationProps> = ({activeTab: propsActiveTab}) => {
  const [activeTab, setActiveTab] = useState(propsActiveTab||'홈');

  return (
    <Nav>
      <NavItem
        href="/home"
        active={activeTab === '홈' ? 'true' : 'false'}
        onClick={() => setActiveTab('홈')}
      >
        <MdHomeFilled size={24} />
        <span>홈</span>
      </NavItem>
      <NavItem
        href="/groups"
        active={activeTab === '그룹' ? 'true' : 'false'}
        onClick={() => setActiveTab('그룹')}
      >
        <MdPeopleAlt size={24} />
        <span>그룹</span>
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

export default MainBottomNavigation;
