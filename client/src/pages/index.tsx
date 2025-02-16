import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { signIn } from '../utils/apis/accounts';
import { BadRequestException, NotFoundException } from '../utils/apis/common';
import { Jwt } from '../utils/apis/token';
import { debugPrint } from '../utils/debug';


const kakaoRedirectUrl= process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL || 'default';

const LoginPage = () => {
  const router = useRouter();
  useEffect(()=>{
    const token = localStorage.getItem('accessToken');
    if(!!token){
      router.push('/home');
    }
  },[]);


  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  type Handler = React.ChangeEventHandler<HTMLInputElement>;
  const onEmailChanged: Handler = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChanged: Handler = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupClick = () => {
    router.push('/signup');
  };

  const handleLogin = async () => {
    try {
      let { accessToken } = await signIn({ email, password });
      let token = Jwt.fromString(accessToken)!;

      debugPrint("accessToken:", accessToken);

      token.storeToLocalStorage();
      router.push('/home');
    } catch (e) {
      if (e instanceof BadRequestException) {
        alert('bad request');
      } else if (e instanceof NotFoundException) {
        alert('no such account');
      } else {
        console.error('unknown error >', e);
      }
    }
  }

  const handleKakaoLogin = () => {
    router.push(kakaoRedirectUrl);
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Form onSubmit={handleLogin}>
        <FormControl>
          <label htmlFor="email">이메일:</label>
          <Input type="email" id="email" name="email" value={email} onChange={onEmailChanged} required />
        </FormControl>
        <FormControl>
          <label htmlFor="password">비밀번호:</label>
          <Input type="password" id="password" name="password" value={password} onChange={onPasswordChanged} required />
        </FormControl>
        <LogInButton type="button" onClick={handleLogin}>로그인</LogInButton>
        <KakaoLogInButton type="button" onClick={handleKakaoLogin}>
          <img src="/assets/kakao-symbol.png" width="10px" style={{marginRight: "8px", verticalAlign: "-0.5px"}} />
          <span>카카오로 시작하기</span>
        </KakaoLogInButton>
      </Form>
      <TextButton onClick={handleSignupClick}>회원 가입하기</TextButton>
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

const LogInButton = styled.button`
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

const KakaoLogInButton = styled.button`
  margin-top: 1rem;
  background-color: #FEE500;
  color: #191919;
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

const Title = styled.h1`
  font-size: 2em;
  text-align: left;
  margin-bottom: 20px;
`;

export default LoginPage;
