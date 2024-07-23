import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    appointmentName: string,
    appointmentLocation: string,
    appointmentDate: string,
    appointmentPenalty: string
  ) => void;
}

const CreateAppointmentModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentLocation, setAppointmentLocation] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentPenalty, setAppointmentPenalty] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAppointmentName('');
      setAppointmentLocation('');
      setAppointmentDate('');
      setAppointmentPenalty('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onSubmit(
      appointmentName,
      appointmentLocation,
      appointmentDate,
      appointmentPenalty
    );
    setAppointmentName('');
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>약속 잡기</Title>
          <CloseIcon onClick={onClose}>
            <MdClose size={24} />
          </CloseIcon>
        </Header>
        <Content>
          <Label>무슨 약속인가요?</Label>
          <Input
            type="text"
            value={appointmentName}
            onChange={(e) => setAppointmentName(e.target.value)}
            placeholder="새 약속의 이름을 입력하세요"
          />
          <Label>어느 장소인가요?</Label>
          <Input
            type="text"
            value={appointmentLocation}
            onChange={(e) => setAppointmentLocation(e.target.value)}
            placeholder="약속 장소명을 입력하세요"
          />
          <Label>언제인가요?</Label>
          <Input
            type="text"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            placeholder="약속 일정을 입력하세요"
          />
          <Label>지각 벌칙을 정하세요!</Label>
          <Input
            type="text"
            value={appointmentPenalty}
            onChange={(e) => setAppointmentPenalty(e.target.value)}
            placeholder="벌칙을 입력하세요"
          />
        </Content>
        <Footer>
          <CloseButton onClick={onClose}>닫기</CloseButton>
          <SubmitButton onClick={handleSubmit}>생성하기</SubmitButton>
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
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #333;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  color: #333;
  box-sizing: border-box;
  transition: border 0.2s;
  font-size: 1rem;

  &:focus {
    border-color: #5581d9;
    outline: none;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const CloseButton = styled.button`
  background-color: #f08e8e;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: #5581d9;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  margin-left: 10px;
  font-size: 1rem;
  cursor: pointer;
`;

export default CreateAppointmentModal;
