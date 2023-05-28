import React from "react";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const Loading02 = () =>{
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
    </div>
  );
};

export default Loading02;

