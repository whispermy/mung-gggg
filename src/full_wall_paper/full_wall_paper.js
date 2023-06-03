import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { styled } from "styled-components";
import detailIcon from "./detail.png";
import homeIcon from "./home.png";

export default function Loading02() {
  const audioRef = useRef(null);
  const imgsrc = useLocation();
  const url = imgsrc.state.data;

  const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(${url}/full.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  `;

  const Container2 = styled.div`
  position: absolute;
  bottom: 5%;
  right: 2.5%;
  
  border: none;
  padding: 1%;
  font-weight: normal;
  font-size: 50px;
  `;

  const Containerbtn = styled.div`
  display: grid;
  position: related;
  width: 30%; /* 원하는 너비로 조정 */
  height: 30%; /* 원하는 높이로 조정 */
  right: 0%;
  bottom: 0%;
  border: none;
  font-weight: normal;
  font-size: 50px;
  `;

  const Spin = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  `;

  const AudioPlayer = styled.audio`
    /* Add your custom styles here */
    width: 100%;
    background-color: #f1f1f1;
    padding: 1%;
    border-radius: 1%;
  `;

  const LinkIcon = styled.img`
    /* Add your custom styles for the icon here */
    width: 20%; /* 원하는 너비로 조정 */
    height: 20%; /* 원하는 높이로 조정 */
  `;

  const LinkWrapper = styled.div`
    display: flex; /* 링크를 가로로 정렬하기 위해 추가 */
    align-items: center; /* 세로 중앙 정렬을 위해 추가 */
    margin-top: -5%; /* 링크 간의 간격을 조정 */
  `;

  {/* TODO: button container create*/}
  const handleAudioEnded = () => {
    audioRef.current.currentTime = 0; // 음원을 처음으로 되감기
    audioRef.current.play(); // 음원 재생
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, []);

  return (
    <div>
      {/* TODO: image blur and music load */}
      <Spin>
        <PropagateLoader color="#36d7b7"
          loading
          size={20}
          speedMultiplier={0.8}
          />
      </Spin>
      {/* TODO: music button create */}
      {/* TODO: home button create and routing */}
      <Container>
        <Container2>
          <Containerbtn>
            <AudioPlayer controls ref={audioRef} autoPlay>
              <source src={`${url}/audio.mp3`} type="audio/mpeg" />
            </AudioPlayer>
            <LinkWrapper>
              <Link to="/">
                <LinkIcon src={homeIcon} alt="home"></LinkIcon>
              </Link>
              <Link to="/page3">
                <LinkIcon src={detailIcon} alt="detail page"></LinkIcon>
              </Link>
            </LinkWrapper>
          </Containerbtn>
        </Container2>
      </Container>
    </div>
  );
};


