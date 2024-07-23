import React, { useState } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

interface CheckinModalProps {
  isOpen: boolean;
  onClose: () => void;
  time: number;
}

const CheckinModal: React.FC<CheckinModalProps> = ({ isOpen, onClose, time }) => {
  const [groupName, setGroupName] = useState('');
  const isLate: boolean = time>0;
  const formatTime =(time: number)=>{
    const absTime= Math.abs(time);
    const hours =Math.floor(absTime);
    const minutes = Math.floor((absTime*60)%60);
    const seconds = Math.floor((absTime*3600)%60);
    return `${hours}시간 ${minutes}분 ${seconds}초`;
  }
  const formattedTime=formatTime(time);


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
        <Content color={isLate? '#F22E2E': '#5581D9'}>
          {isLate?
          `${formattedTime} 늦게 도착하셨습니다.`
          :`${formattedTime} 일찍 도착하셨습니다.`
          }
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

const Content = styled.div<{color: string}>`
  margin-top: 20px;
  color: ${(props)=>props.color};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #333;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  color: #333;
  box-sizing: border-box;
  transition: border 0.2s;

  &:focus {
    border-color: #5581d9;
    outline: none;
  }
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

const SubmitButton = styled.button`
  background-color: #5581d9;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 10px;
`;

export default CheckinModal;
