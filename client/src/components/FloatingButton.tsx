import React from 'react';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <MdAdd size={24} />
    </Button>
  );
};

const Button = styled.button`
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

export default FloatingButton;
