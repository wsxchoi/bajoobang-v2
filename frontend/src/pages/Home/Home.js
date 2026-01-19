import React from 'react';
import './Home.css'; 
import { ReactComponent as Toggle } from '../../components/images/toggle.svg';
import { ReactComponent as Pin } from '../../components/images/pin.svg';
import { ReactComponent as File } from '../../components/images/file.svg';
import { ReactComponent as Number } from '../../components/images/number.svg';
import { ReactComponent as LogoW } from '../../components/images/logo-white.svg';

function Homepage() {
  return (
    <div className="Homepage">

      <div className="main-content">
        <h1 className="main-title">ANYONE <span className="main-title2">Can Do This</span></h1>
        <h1 className="main-title">ANYWHERE, ANYTIME</h1>
        <p className="description">자취방이 필요한 누구나, 용돈이 필요한 누군가 <p>houser가 해결해드립니다</p></p>
        <div className="buttons">
          <button className="main-button1">자취방 발품이 필요하신가요?</button>
          <button className="main-button2">용돈이 필요하신가요?</button>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo"><LogoW/>
          <p>더 많은 정보를 얻고 싶으시다면 하단 아이콘을 클릭해주세요</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <a href="/home"><Toggle></Toggle> Home</a>
              <a href="/about"><Toggle></Toggle>About Us</a>
              <a href="/map"><Toggle></Toggle>발품지도</a>
              <a href="/sales"><Toggle></Toggle>매물지도</a>
              <a href="/mypage"><Toggle></Toggle>마이페이지</a>
            </div>
            <div className="footer-column">
              <h4>Be With You</h4>
              <p><Pin></Pin>Korea, Dongguk University</p>
              <p><File></File>Hello@Email.com</p>
              <p><Number></Number>+62 123 456 789</p>
            </div>
            <div className="footer-column">
              <h4>Developers</h4>
              <p><Toggle></Toggle>Kim Hyo-beom</p>
              <p><Toggle></Toggle>Choi Woosung</p>
              <p><Toggle></Toggle>Park Joo-hyung</p>
              <p><Toggle></Toggle>Kim Yumin</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
