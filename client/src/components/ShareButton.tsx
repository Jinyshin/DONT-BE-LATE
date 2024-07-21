import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const ShareButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
}) => {
  return (
    <StyledButton onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  background: ${({ variant }) =>
    variant === 'primary' ? '#5581D9' : '#6c757d'};
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background: ${({ variant }) =>
      variant === 'primary' ? '#0264cc' : '#5a6268'};
  }
`;

export default ShareButton;
