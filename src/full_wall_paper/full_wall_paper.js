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

  return (
    <div>
      <Container>
        {/* <ProgressiveImg
          src={url}
        /> */}
      </Container>
      <Link to="/">
        <h3>Please wating...</h3>
        <PropagateLoader color="#36d7b7"
        loading
        size={20}
        speedMultiplier={0.8}
        />
      </Link>
    </div>
  );
};


