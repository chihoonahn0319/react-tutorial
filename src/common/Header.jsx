import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { auth } from "../firebase";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // onAuthStateChanged 이벤트 리스너 등록
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // 컴포넌트 언마운트 시에 이벤트 리스너 구독 해제
    return () => unsubscribe();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 등록 및 언마운트 시에 해제

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      alert("로그아웃되었습니다.");
    } catch (error) {
      console.error("로그아웃 실패:", error.message);
    }
  };

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
            <div>환영합니다! {user.email} 님!</div>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
}
