import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { styled } from "styled-components";

export default function Loading02() {
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

  {/* TODO: button container create*/}

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
            <Link to="/">HOME</Link>
          </Containerbtn>
        </Container2>
      </Container>
    </div>
  );
};


