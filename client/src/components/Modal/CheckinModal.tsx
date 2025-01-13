import confetti from 'canvas-confetti';
import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

interface CheckinModalProps {
  isOpen: boolean;
  onClose: () => void;
  time: number;
}

const CheckinModal: React.FC<CheckinModalProps> = ({
  isOpen,
  onClose,
  time,
}) => {
  const isLate: boolean = time > 0;

  const formatTime = (time: number) => {
    const absTime = Math.abs(time);
    const hours = Math.floor(absTime / 3600);
    const minutes = Math.floor((absTime % 3600) / 60);
    const seconds = Math.floor(absTime % 60);
    let formattedTime = '';
    if (hours > 0) formattedTime += `${hours}시간 `;
    if (minutes > 0) formattedTime += `${minutes}분 `;
    formattedTime += `${seconds}초`;

    return formattedTime;
  };

  const formattedTime = formatTime(time);

  useEffect(() => {
    if (isOpen && !isLate) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.4 },
        angle: 90,
        gravity: 3,
        zIndex: 10000,
      });
    }
  }, [isOpen, isLate]);

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>체크인 완료</Title>
          <CloseIcon onClick={onClose}>
            <MdClose size={24} />
          </CloseIcon>
        </Header>
        <Content>
          {isLate ? (
            <Message>
              <FormattedTime color="#F22E2E">{formattedTime}</FormattedTime>{' '}
              <br />
              늦게 도착했어요 😓
            </Message>
          ) : (
            <Message>
              <FormattedTime color="#5581D9">{formattedTime}</FormattedTime>{' '}
              <br />
              빨리 도착했어요 🤩
            </Message>
          )}
        </Content>
        <Footer>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </Footer>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  margin: 20px;
  padding: 20px;
  border-radius: 15px;
  width: 400px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
`;

const CloseIcon = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 5px;
`;

const Content = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  color: black;
`;

const FormattedTime = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  background-color: #f08e8e;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  cursor: pointer;
`;

export default CheckinModal;
