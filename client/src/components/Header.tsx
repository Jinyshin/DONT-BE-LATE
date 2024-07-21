import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <HeaderContainer>
    <HeaderTitle>{title}</HeaderTitle>
  </HeaderContainer>
);

const HeaderContainer = styled.header`
  background-color: #fff;
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px; /* 고정된 높이 설정 */
  z-index: 1000; /* Ensure it stays on top of other content */
`;

const HeaderTitle = styled.h1`
  font-size: 2em;
  margin: 20px 0 0 0; /* top, right, bottom, left */
`;

export default Header;
