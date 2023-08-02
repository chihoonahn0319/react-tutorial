import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/slice/postSlice";
import { nanoid } from "nanoid";
import { auth } from "../firebase"; // Firebase 모듈에서 auth 객체를 가져옵니다. 젤중요 좀 그만 까먹어라

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null); // 로그인한 사용자 정보를 상태로 관리

  useEffect(() => {
    // 로그인 상태 감지
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // 사용자 정보 설정
      } else {
        setUser(null); // 로그아웃 시 사용자 정보 초기화
      }
    });

    // 컴포넌트 언마운트 시에 이벤트 리스너 구독 해제
    return () => unsubscribe();
  }, []);

  // '추가' 버튼 클릭 시 새로운 게시물을 생성하고 목록 페이지로 이동
  const handleAddClick = () => {
    const newPost = {
      id: nanoid(), // 새로운 게시물의 ID를 현재 시간으로 생성
      title: title,
      content: content,
      author: user.email, // 로그인한 사용자가 있을 경우 이메일을 저장하고, 없을 경우 빈 문자열
    };

    // addPost 액션을 디스패치하여 새로운 게시물을 추가
    dispatch(addPost(newPost));

    navigate("/"); // 목록 페이지로 이동
  };

  return (
    <>
      <Header />
      <Container>
        {/* 게시물 생성을 위한 폼 */}
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddClick();
          }}
        >
          <Input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <SubmitButton type="submit">추가하기</SubmitButton>
        </Form>
      </Container>
    </>
  );
}
// 스타일 컴포넌트 정의
const Form = styled.form`
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Input = styled.input`
  width: 100%;
  height: 60px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid lightgrey;
  padding: 8px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  resize: none;
  height: 100%;
  width: 100%;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid lightgrey;
  padding: 12px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  color: white;
  border-radius: 12px;
  background-color: skyblue;
  cursor: pointer;
`;
