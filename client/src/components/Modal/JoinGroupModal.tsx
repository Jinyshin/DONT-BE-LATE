import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (groupName: string) => void;
}

const JoinGroupModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [groupCode, setGroupCode] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setGroupCode('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onSubmit(groupCode);
    setGroupCode('');
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>그룹 참여</Title>
          <CloseIcon onClick={onClose}>
            <MdClose size={24} />
          </CloseIcon>
        </Header>
        <Content>
          <Label>그룹 코드</Label>
          <Input
            type="text"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            placeholder="참여 코드를 입력하세요"
          />
        </Content>
        <Footer>
          <CloseButton onClick={onClose}>닫기</CloseButton>
          <SubmitButton onClick={handleSubmit}>참여하기</SubmitButton>
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
  margin-top: 30px;
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

export default JoinGroupModal;
