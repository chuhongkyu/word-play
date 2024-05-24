import Image from "next/image";

export default function Footer() {
    return (
      <footer className="footer">
        <div className="footer-content">
            <h4 className="body-1">세대 갈등 해결 신조어 배우기</h4>
            <p className="body-2 desc">이 프로젝트는 세대 갈등을 해결하기 위한 웹 기반 게임을 제공합니다. 젊은 세대와 노년 세대 사이의 소통 부재와 오해를 줄이기 위해, 양 세대가 서로의 언어와 문화를 이해할 수 있도록 돕는 것이 목적입니다.</p>
            <hr/>
            <h4>게임 목표</h4>
            <ul className="footer-list body-2">
                <li>젊은 세대와 노년 세대의 소통 증진: 서로의 언어와 문화를 이해함으로써 세대 갈등을 줄입니다.</li>
                <li>상호 존중과 이해의 향상: 각 세대의 특징과 가치를 인식하고 존중하는 데 기여합니다.</li>
            </ul>
            <div className="social-media-links" style={{ display: "none" }}>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <span className="footer-bottom">
                <Image width={150} height={80} src={'/assets/img/nabo_down.png'} alt={"nabo-img-down"}/>
                <p className="body-2 name">제작자: 서울신입생</p>
            </span>
        </div>
      </footer>
    );
  }
  