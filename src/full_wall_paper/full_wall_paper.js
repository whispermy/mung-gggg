import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import ProgressiveImg from "./ProgressiveImg";

export default function Loading02() {
  const imgsrc = useLocation();
  const url = imgsrc.state.data;
  return (
    <div>
      <Link to="/">
        <h3>Please wating...</h3>
        <PropagateLoader color="#36d7b7"
        loading
        size={20}
        speedMultiplier={0.8}
        />
      </Link>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      
      <ProgressiveImg
        src={url}
      />
    </div>
  );
};


