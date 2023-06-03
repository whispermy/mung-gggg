import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { styled } from "styled-components";

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
  position: related;
  bottom: 0%
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
    padding: 10px;
    border-radius: 5px;
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
            <Link to="/">HOME</Link>
            <Link to="/page3">Detail</Link>
          </Containerbtn>
        </Container2>
      </Container>
    </div>
  );
};


