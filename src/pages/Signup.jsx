import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import styled from "styled-components";
import {
  auth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "../firebase";
import { useNavigate } from "react-router-dom"; // useNavigate를 import합니다.

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // useNavigate를 사용하여 navigate 함수를 가져옵니다.

  const handleSignup = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      alert("이메일 주소를 입력해주세요.");
      return;
    }

    if (password.trim() === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    // 추가 검증: 비밀번호는 최소 6자 이상
    if (password.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // Firebase에서 이메일이 이미 사용 중인지 확인
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        // 이미 이메일이 존재하는 경우
        alert("이미 등록된 이메일 주소입니다.");
        return;
      }
      // Firebase 회원가입 함수 호출
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 회원가입 성공
      alert("회원가입이 성공적으로 완료되었습니다.\n 자동으로 로그인됩니다!.");

      // 로그인 페이지로 이동
      navigate("/");
    } catch (error) {
      // 회원가입 실패
      const errorMessage = error.message;
      console.error("회원가입 실패:", errorMessage);
      // 여기서 사용자에게 에러 메시지를 표시할 수 있습니다.
      alert(errorMessage);
    }
  };
  const handleLoginButtonClick = () => {
    navigate("/login");
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
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <SignupButton onClick={handleSignup}>회원가입하기</SignupButton>
            <LoginButton onClick={handleLoginButtonClick}>
              로그인하러 가기
            </LoginButton>
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

const SignupButton = styled.button`
  width: 100%;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background-color: #ff6969;
  color: white;
  cursor: pointer;
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
`;
