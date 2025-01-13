import { useRouter } from 'next/router';
import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import styled from 'styled-components';

interface GroupHeaderProps {
  title: string;
}

const GroupHeader: React.FC<GroupHeaderProps> = ({ title }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/groups');
  };

  return (
    <HeaderContainer>
      <BackButton onClick={handleBack}>
        <MdArrowBack size={24} />
      </BackButton>
      <TitleContainer>
        <HeaderTitle>{title}</HeaderTitle>
      </TitleContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #fff;
  padding: 10px 20px;
  color: #000;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 1000;
`;

const BackButton = styled.button`
  position: absolute;
  left: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const HeaderTitle = styled.h1`
  font-size: 1em;
  margin: 0;
`;

export default GroupHeader;
