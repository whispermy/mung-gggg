import React from "react";
import { Link } from "react-router-dom";

export default function Page3() {
  const min = 1;
  let max= 6;
  let randomNumber1 = Math.floor(Math.random() * (max-min) + min);
  switch(randomNumber1) {
    case 1:
      max = 5;
      break;
    case 2:
      max = 5;
      break;
    case 3:
      max = 6;
      break;
    case 4:
      max = 4;
      break;
    case 5:
      max = 4;
      break;
        
    default:
      break;
  }
  let randomNumber2 = Math.floor(Math.random() * (max-min) + min);
  const p2name = '/full_wall_paper';
  const imgsrc2 = `./../img/${randomNumber1}/${randomNumber2}`;

  return (
    <div className="Page3">
      <h1>Page3</h1>
      <Link to={p2name} state={{data: imgsrc2}}> full_wall_paper</Link>
    </div>
  );
}