import { Link } from "react-router-dom";
import "./../App.css";
import "./../full_wall_paper/full_wall_paper";

export default function Home() {
    const min =1;
    const max= 4;
    let randomNumber1 = Math.floor(Math.random() * (max-min) + min);
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