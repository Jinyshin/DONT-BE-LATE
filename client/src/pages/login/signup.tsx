import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SignupPage = () => {
  const [showSignupOptions, setShowSignupOptions] = useState(false);
  const router=useRouter();

  const handleSignupClick = () => {
    setShowSignupOptions(true);
  };

  const handleEmailSignupClick = () => {
    alert('Email Signup Form will appear');
    // Logic to show email signup form
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={() => alert('Kakao Login')}>카카오 로그인하기</button>
      <button onClick={handleSignupClick}>회원 가입하기</button>

      {showSignupOptions && (
        <div className="signup-options">
          <h2>회원 가입</h2>
          <button onClick={handleEmailSignupClick}>이메일로 회원가입</button>
          <button onClick={() => alert('Kakao Signup')}>카카오로 회원가입</button>
        </div>
      )}
    </div>
  );
};

export default SignupPage