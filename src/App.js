import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useState } from "react";

export default function App() {
  // useState를 사용하여 todos 배열과 setTodos 함수를 정의
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "안치훈은 진짜 개바보입니다",
      content: "나는 후니.",
      author: "안치훈",
    },
    {
      id: 2,
      title: "김말똥 멍청이입니다",
      content: "나는 말똥.",
      author: "김말똥",
    },
    {
      id: 3,
      title: "김개똥은 바보입니다",
      content: "나는 개똥.",
      author: "김개똥",
    },
  ]);

  return (
    // 페이지 이동
    <Routes>
      <Route path="/" element={<Main todos={todos} setTodos={setTodos} />} />
      <Route
        path="/detail/:id"
        element={<Detail todos={todos} setTodos={setTodos} />}
      />
      <Route
        path="/create"
        element={<Create todos={todos} setTodos={setTodos} />}
      />
      <Route
        path="/edit/:id"
        element={<Edit todos={todos} setTodos={setTodos} />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
