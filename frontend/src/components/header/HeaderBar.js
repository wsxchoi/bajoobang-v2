import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HeaderBar.css'; // CSS 파일 임포트
import { AuthContext } from '../../AuthContext';

function HeaderBar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm('로그아웃을 하시겠습니까?');
    if (!confirmLogout) return;

    try {
      const sessionId = sessionStorage.getItem('sessionId');
      const response = await axios.post('/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${sessionId}`,
        },
        withCredentials: true,
      });
      console.log('Logout successful:', response.data);
      logout();
      alert('로그아웃되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <header className="header-bar">
      <NavLink to="/" exact className="logo">
        <h1>BJB</h1>
      </NavLink>
      <nav className="navbar">
        <NavLink to="/" exact activeClassName="active" className="nav-item">
         HOME
        </NavLink>
        <NavLink to="/about" activeClassName="active" className="nav-item">
          ABOUT US
        </NavLink>
        <NavLink to="/domap" activeClassName="active" className="nav-item">
          발품지도
        </NavLink>
        <NavLink to="/helpmap" activeClassName="active" className="nav-item">
          매물지도
        </NavLink>
        <NavLink to="/mypage" activeClassName="active" className="nav-item">
          마이페이지
        </NavLink>
      </nav>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <span className="login-btn" onClick={handleLogout}>로그아웃</span>
        ) : (
          <NavLink to="/login" className="login-btn">
            로그인 / 회원가입
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default HeaderBar;
