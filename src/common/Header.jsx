import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { auth } from "../firebase"; // Firebase 모듈에서 auth 객체를 가져온당
export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // 로그인한 사용자 정보를 상태로 관리!
  // onClick 이벤트 핸들러를 추가하여 클릭 시 "Main" 페이지로 이동하도록 설정
  const handleHomeClick = () => {
    navigate("/");
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null); // 사용자 상태 초기화
      alert("로그아웃되었습니다.");
    } catch (error) {
      console.error("로그아웃 실패:", error.message);
    }
  };

  // 로그인 상태 감지
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user); // 사용자 정보 설정
    } else {
      setUser(null); // 로그아웃 시 사용자 정보 초기화
    }
  });

  return (
    <header
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px 0 24px",
      }}
    >
      <h1
        style={{
          color: "pink",
          cursor: "pointer",
        }}
        onClick={handleHomeClick}
      >
        <FaHome />
      </h1>
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        {user ? (
          <>
            {/* 로그인한 이메일 표시 */}
            <div>환영합니다! {user.email} 님!</div>
            {/* 로그아웃 버튼 */}
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          // 로그인이 안된 경우 로그인과 회원가입 버튼 표시
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
}
