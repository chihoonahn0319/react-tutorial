// Login.js (Login 컴포넌트)
import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import styled from "styled-components";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // 로그인 성공
      alert("로그인이 성공적으로 완료되었습니다.");
      navigate("/"); // 로그인 성공 후 main 페이지로 이동
    } catch (error) {
      // 로그인 실패
      const errorMessage = error.message;
      console.error("로그인 실패:", errorMessage);
      alert("회원정보가 일치하지 않습니다.");
    }
  };

  useEffect(() => {
    // 로그인 상태 감지
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("현재 로그인한 사용자 정보:", user);
      } else {
        console.log("로그인되지 않은 상태입니다.");
      }
    });

    // 컴포넌트 언마운트 시에 이벤트 리스너 구독 해제(정확히 이해는안감..)
    return () => unsubscribe();
  }, []);

  const handleSignupButtonClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <Header />
      <Container>
        <FormContainer>
          <Form>
            <Input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton onClick={handleLogin}>로그인하기</LoginButton>
            <SignupButton onClick={handleSignupButtonClick}>
              회원가입하러 가기
            </SignupButton>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
}

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 600px;
  align-items: center;
`;

const Form = styled.form`
  width: 360px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgrey;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 12px;
`;

const LoginButton = styled.button`
  width: 100%;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background-color: #78c1f3;
  color: white;
  cursor: pointer;
  margin-bottom: 12px;
`;

const SignupButton = styled.button`
  width: 100%;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background-color: #ff6969;
  color: white;
  cursor: pointer;
`;
