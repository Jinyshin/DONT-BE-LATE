import React, { useState } from 'react';
import styled from 'styled-components';

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
      {isExpanded && (
        <ButtonsContainer>
          <ActionButton onClick={onJoinGroupClick}>그룹 참여</ActionButton>
          <ActionButton onClick={onCreateGroupClick}>그룹 생성</ActionButton>
        </ButtonsContainer>
      )}
      <MainButton onClick={handleButtonClick}>+</MainButton>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 80px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainButton = styled.button`
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

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

const ActionButton = styled.button`
  background-color: #ffffff;
  color: #5581d9;
  border: 1px solid #5581d9;
  border-radius: 20px;
  width: 120px;
  height: 40px;
  font-size: 14px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #5581d9;
    color: white;
  }
`;

export default ExpandableFloatingButton;
