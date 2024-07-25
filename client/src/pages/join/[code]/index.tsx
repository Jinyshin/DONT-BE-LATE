import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { styled } from 'styled-components';

const JoinGroup = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    const joinGroup = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        console.log(token);
        if (!token) {
          router.push(`/`);
          return;
        }

        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/groups/join`,
          { groupCode: code },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        router.push('/groups');
      } catch (error) {
        console.error('Error joining group:', error);
      }
    };

    if (code) {
      joinGroup();
    }
  }, [code, router]);

  return (
    <Container>
      <Message>참여중…</Message>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;

const Message = styled.div`
  font-size: 1.5rem;
  color: #333;
`;

export default JoinGroup;
