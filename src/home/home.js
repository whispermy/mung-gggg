import { Link } from "react-router-dom";
import "./../App.css";
import "./../full_wall_paper/full_wall_paper";

export default function Home() {
   return (
    <div className="Home">
        <h1>Home</h1>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
        
        <Link to="/full_wall_paper">full_wall_paper</Link> |{" "}
      </nav>
    </div>
  );
}