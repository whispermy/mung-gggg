// import "./../App.css";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import "./../full_wall_paper/full_wall_paper";
import "./home.css";

export default function Home() {
  const Main = styled.div`
  background-color: #f1f3f5;
  background-size: cover;
  background-position: center center;
  width: 100vw;
  height: 100vh;
  `;

  const Contents = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(88, 87, 87);
  text-align: center;
  `;

  const H1 = styled.h1`
  font-family: "Questrial", sans-serif;
  font-size: 80px;
  margin-bottom: 50px;
  `;

  const PageContent = styled.main`
  display: grid;
  grid-gap: 1rem;
  padding: 1rem;
  max-width: 1024px;
  margin: 0 auto;
  font-family: var(--font-sans);

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 800px) {
    grid-template-columns: repeat(4, 1fr);
  }
  `;

  const Card = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
  text-align: center;
  color: whitesmoke;
  background-color: whitesmoke;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1),
    0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.1);

  @media (min-width: 600px) {
    height: 350px;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 110%;
    background-size: cover;
    background-position: 0 0;
    transition: transform calc(var(--d) * 1.5) var(--e);
    pointer-events: none;
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    pointer-events: none;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.009) 11.7%,
      rgba(0, 0, 0, 0.034) 22.1%,
      rgba(0, 0, 0, 0.072) 31.2%,
      rgba(0, 0, 0, 0.123) 39.4%,
      rgba(0, 0, 0, 0.182) 46.6%,
      rgba(0, 0, 0, 0.249) 53.1%,
      rgba(0, 0, 0, 0.32) 58.9%,
      rgba(0, 0, 0, 0.394) 64.3%,
      rgba(0, 0, 0, 0.468) 69.3%,
      rgba(0, 0, 0, 0.54) 74.1%,
      rgba(0, 0, 0, 0.607) 78.8%,
      rgba(0, 0, 0, 0.668) 83.6%,
      rgba(0, 0, 0, 0.721) 88.7%,
      rgba(0, 0, 0, 0.762) 94.1%,
      rgba(0, 0, 0, 0.79) 100%
    );
    transform: translateY(-50%);
    transition: transform calc(var(--d) * 2) var(--e);
  }

  &:nth-child(1):before {
    background-image: url(/img/sea.jpg);
  }

  &:nth-child(2):before {
    background-image: url(/img/rain.jpg);
  }

  &:nth-child(3):before {
    background-image: url(/img/cafe.jpg);
  }

  &:nth-child(4):before {
    background-image: url(/img/fantasy.jpg);
  }
  `;

  const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  transition: transform var(--d) var(--e);
  z-index: 1;

  > * + * {
    margin-top: 1rem;
  }
  `;

  const Title = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 1.2;
  `;

  const Copy = styled.div`
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-style: italic;
  line-height: 1.35;
  `;

  const Btn = styled.button`
  cursor: pointer;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.65rem;
  font-weight: bold;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
  color: white;
  background-color: black;
  border: none;

  &:hover {
    background-color: #0d0d0d;
  }

  &:focus {
    outline: 1px dashed yellow;
    outline-offset: 3px;
  }
  `;

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
    <div>
      <Main>
        <Contents>
          <H1> Simple ASMR for you</H1>
          <PageContent>
            <Card>
              <Content>
                <Title>Diving in to the Sea</Title>
                <Link to={pname} state={{data: imgsrc}}> 
                <Btn>Start ASMR</Btn>
                </Link>
              </Content>
            </Card>
            <Card>
              <Content>
                <Title>Rain is falling besides you</Title>
                <Link to={pname} state={{data: imgsrc}}> 
                <Btn>Start ASMR</Btn>
                </Link>
              </Content>
            </Card>
            <Card>
              <Content>
                <Title>Sip of coffee</Title>
                <Link to={pname} state={{data: imgsrc}}> 
                <Btn>Start ASMR</Btn>
                </Link>
              </Content>
            </Card>
            <Card>
              <Content>
                <Title>Fantasies around us</Title>
                <Link to={pname} state={{data: imgsrc}}> 
                <Btn>Start ASMR</Btn>
                </Link>
              </Content>
            </Card>
          </PageContent>
        </Contents>
      </Main>
    </div>
  );
}