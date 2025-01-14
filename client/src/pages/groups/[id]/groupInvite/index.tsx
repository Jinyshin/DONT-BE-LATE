import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GroupBottomNavigation from '../../../../components/GroupBottomNavigation';
import GroupHeader from '../../../../components/GroupHeader';
import QRCodeGenerator from '../../../../components/QRCodeGenerator';
import ShareButton from '../../../../components/ShareButton';

const GroupInvite: React.FC = () => {
  const groupId = useParams()?.id as string;
  const [groupLink, setGroupLink] = useState<string>('');
  const [groupCode, setGroupCode] = useState<string>('');

  useEffect(() => {
    const fetchGroupLink = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/groups/${groupId}`
        );
        const groupLink = response.data.participationLink;
        setGroupLink(groupLink);
        setGroupCode(groupLink.substring(groupLink.length - 6));
      } catch (error) {
        console.error('Error fetching group link', error);
      }
    };

    if (groupId) {
      fetchGroupLink();
    }
  }, [groupId, groupCode]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(groupLink).then(() => {
      alert('링크가 복사되었습니다.');
    });
  };

  const handleShareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: '우리 그룹에 들어와',
          text: '같이 밥약잡자',
          url: groupLink,
        })
        .catch((error) => console.error('Error sharing', error));
    } else {
      alert('이 브라우저에서는 공유 기능을 지원하지 않습니다.');
    }
  };

  return (
    <Container>
      <GroupHeader title="친구 초대" />
      {groupLink && <QRCodeGenerator url={groupLink} />}
      <div>그룹코드: {groupCode}</div>
      <ButtonContainer>
        <ShareButton onClick={handleCopyLink} variant="secondary">
          링크 복사
        </ShareButton>
        <ShareButton onClick={handleShareLink} variant="primary">
          링크 공유
        </ShareButton>
      </ButtonContainer>
      <Description>
        <span>같이 만나는 친구들에게 공유하세요.</span>
        <span>링크를 클릭하면 그룹에 자동가입됩니다.</span>
        <span>
          앱이 설치되지 않은 사람은 이 링크를 통해 설치하면 그룹에 자동가입
          됩니다.
        </span>
      </Description>
      <GroupBottomNavigation activeTab="초대" groupId={groupId} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 20px 100px 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Description = styled.div`
  text-align: start;
  color: #333;
  font-size: 14px;
  line-height: 1.5;

  span {
    display: block;
    margin-top: 8px;
  }

  span:first-child {
    margin-top: 20px;
  }
`;

export default GroupInvite;
