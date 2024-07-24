import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';


const SignupPage = () => {
  const router=useRouter();
  const params = useSearchParams();

  const [ email, setEmail ] = useState("");
  const [ nickname, setNickname ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ profileUrl, setProfileUrl ] = useState("");


  type Handler = React.ChangeEventHandler<HTMLInputElement>;
  const onEmailChanged: Handler = (e) => {
    setEmail(e.target.value);
  };

  const onNicknameChanged: Handler = (e) => {
    setNickname(e.target.value);
  };

  const onPasswordChanged: Handler = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupClick = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/accounts/signup`;
    console.log(url);

    try {
      await axios.post(
        url!,
        {
          email,
          nickname,
          password,
          profileUrl,
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      router.push('/');
    } catch(e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 400) {
          alert('bad request');
        } else {
          alert('unknown error');
        }
      }
    }
  };

  const handleSinginClick = () => {
    router.push('/');
  };

  useEffect(() => {
    const callback = () => {
      if (params.has("email")) {
        setEmail(params.get("email")!);
      }

      if (params.has("nickname")) {
        setNickname(params.get("nickname")!);
      }

      if (params.has("profile_url")) {
        setProfileUrl(params.get("profile_url")!);
      }
    };

    callback();
  }, [params]);

  return (
    <Container>
      <Title>회원가입</Title>
      <Form>
        <FormControl>
          <label htmlFor="email">이메일:</label>
          <Input type="email" id="email" name="email" value={email} onChange={onEmailChanged} readOnly={!!params.get("email")} required />
        </FormControl>
        <FormControl>
          <label htmlFor="password">비밀번호:</label>
          <Input type="password" id="password" name="password" value={password} onChange={onPasswordChanged} required />
        </FormControl>
        <FormControl>
          <label htmlFor="nickname">닉네임:</label>
          <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onNicknameChanged} readOnly={!!params.get("nickname")} required />
        </FormControl>
        <FormControl>
          <Input type="text" id="profile_url" value={profileUrl} onChange={() => {}} hidden />
        </FormControl>
        <SignUpButton type="button" onClick={handleSignupClick}>회원 가입하기</SignUpButton>
      </Form>
      <LoginInfo>이미 계정이 있다면?</LoginInfo>
      <TextButton onClick={handleSinginClick}>로그인하기</TextButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin-bottom: 1rem;
`;

const FormControl = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SignUpButton = styled.button`
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.grayscale.white};
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  width: 100%;

  cursor: pointer;

  &:active {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
  }
`;

const TextButton = styled.button`
  background-color: transparent;
  border: 2px solid transparent;
  color: #007bff;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #007bff;
    color: #0056b3;
  }
`;

const LoginInfo = styled.span`
  color: #007bff;
  font-size: 14px; /* 폰트 크기를 줄임 */
  transition: all 0.3s ease;
  text-align: center; /* 텍스트 정렬 */

  &:hover {
    color: #0056b3;
  }
`;

const Title = styled.h1`
  font-size: 2em;
  text-align: left;
  margin-bottom: 20px;
`;

export default SignupPage;
