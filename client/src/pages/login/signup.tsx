import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';


const SignupPage = () => {
  const router=useRouter();

  const handleSignupClick = () => {
    router.push('/login');
  };

  const handleLogin=()=>{
    router.push('/');
  }

  return (
    <Container>
      <Title>회원가입</Title>
      <Form>
        <FormControl>
          <label htmlFor="email">이메일:</label>
          <Input type="email" id="email" name="email" required />
        </FormControl>
        <FormControl>
          <label htmlFor="password">비밀번호:</label>
          <Input type="password" id="password" name="password" required />
        </FormControl>
        <FormControl>
          <label htmlFor="password">닉네임:</label>
          <Input type="password" id="password" name="password" required />
        </FormControl>
        <SignUpButton onClick={handleSignupClick}>회원 가입하기</SignUpButton>
      </Form>
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

const Title = styled.h1`
  font-size: 2em;
  text-align: left;
  margin-bottom: 20px;
`;

export default SignupPage;
