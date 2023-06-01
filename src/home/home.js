import { Link } from "react-router-dom";
import "./../App.css";
import "./../full_wall_paper/full_wall_paper";

export default function Home() {
    const min =1;
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
    const pname = '/full_wall_paper'
    const imgsrc = `/img/${randomNumber1}/${randomNumber2}`;

   return (
    <div className="Home">
        <h1>Home</h1>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
        
        <Link to={pname} state={{data: imgsrc}}> full_wall_paper</Link>
      </nav>
    </div>
  );
}