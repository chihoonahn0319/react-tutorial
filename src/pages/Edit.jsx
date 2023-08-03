import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { updatePost } from "../redux/slice/postSlice";
import { useMutation, useQueryClient } from "react-query"; // react-query의 useMutation과 useQueryClient 임포트
import axios from "axios"; // axios 임포트

import Header from "../common/Header";
import Container from "../common/Container";

export default function Edit() {
  // useDispatch를 이용하여 dispatch 함수 가져오기
  const dispatch = useDispatch();
  // useNavigate를 이용하여 라우팅 함수 가져오기
  const navigate = useNavigate();
  // useParams를 이용하여 URL 파라미터 값 가져오기
  const { id } = useParams();

  // useSelector를 이용하여 Redux의 상태 가져오기
  const todos = useSelector((state) => state.게시글);
  // 게시글 ID에 해당하는 게시글 찾기
  const post = todos.find((post) => post.id === id);

  // useState를 이용하여 title과 content 상태 변수 초기화
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");

  // useQueryClient를 이용하여 queryClient 가져오기
  const queryClient = useQueryClient();

  // useMutation을 이용하여 데이터 수정 처리 함수 생성
  const editPostMutation = useMutation(async (updatedPost) => {
    // axios를 이용하여 서버에 수정 요청 보내기
    const response = await axios.put(
      `http://localhost:3001/posts/${id}`,
      updatedPost
    );
    return response.data;
  });

  // 게시글 수정 제출 처리 함수
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // 수정된 게시글 데이터 생성
    const updatedPost = { ...post, title, content };

    try {
      // react-query를 이용하여 비동기 수정 처리
      await editPostMutation.mutateAsync(updatedPost);

      // react-query 캐시 갱신
      queryClient.invalidateQueries("posts");

      // Redux 상태 업데이트
      dispatch(updatePost(updatedPost));

      // 홈으로 이동
      navigate("/");
    } catch (error) {
      console.error("게시물 업데이트 중 오류 발생:", error);
    }
  };

  // 게시글이 없는 경우 에러 페이지 표시
  if (!post) {
    return (
      <>
        <div>없는 페이지입니다.</div>
        <Link to="/">홈으로 이동</Link>
      </>
    );
  }

  // 게시글 수정 페이지 렌더링
  return (
    <Fragment>
      <Header />
      <Container>
        <Form onSubmit={handleEditSubmit}>
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
          <SubmitButton type="submit">수정하기</SubmitButton>
        </Form>
      </Container>
    </Fragment>
  );
}

// 스타일드 컴포넌트를 이용하여 스타일 정의
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
  background-color: orange;
  cursor: pointer;
`;
