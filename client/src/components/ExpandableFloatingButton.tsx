import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import styled, { css, keyframes } from 'styled-components';

interface ExpandableFloatingButtonProps {
  onJoinGroupClick: () => void;
  onCreateGroupClick: () => void;
}

const ExpandableFloatingButton: React.FC<ExpandableFloatingButtonProps> = ({
  onJoinGroupClick,
  onCreateGroupClick,
}) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleButtonClick = () => {
    setExpanded(!isExpanded);
  };

  return (
    <Container>
      <ButtonsContainer isExpanded={isExpanded}>
        <ActionButton onClick={onJoinGroupClick}>참여</ActionButton>
        <ActionButton onClick={onCreateGroupClick}>생성</ActionButton>
      </ButtonsContainer>
      <MainButton onClick={handleButtonClick} isExpanded={isExpanded}>
        {isExpanded ? <MdClose size={24} /> : <MdAdd size={24} />}
      </MainButton>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 80px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const MainButton = styled.button<{ isExpanded: boolean }>`
  background-color: #5581d9;
  color: white;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.25s ease-out;
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ButtonsContainer = styled.div<{ isExpanded: boolean }>`
  display: ${({ isExpanded }) => (isExpanded ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  ${({ isExpanded }) =>
    isExpanded &&
    css`
      animation: ${slideIn} 0.1s ease-out forwards;
    `}
`;

const ActionButton = styled.button`
  background-color: #ffffff;
  color: #5581d9;
  border: 1px solid #5581d9;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 16px;
  margin-right: 4px;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  padding: 0 8px; /* Add padding for better text alignment */

  &:hover {
    background-color: #5581d9;
    color: white;
    transform: scale(1.1);
  }
`;

export default ExpandableFloatingButton;
