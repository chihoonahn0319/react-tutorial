import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import styled from "styled-components";

export default function Login() {
  return (
    <>
      <Header />
      <Container>
        <FormContainer>
          <Form>
            <Input type="text" placeholder="이메일" />
            <Input type="password" placeholder="비밀번호" />
            <LoginButton>로그인하기</LoginButton>
            <SignupButton>회원가입하러 가기</SignupButton>
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
