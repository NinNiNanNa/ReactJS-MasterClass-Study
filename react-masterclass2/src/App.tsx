import styled, { keyframes } from "styled-components";
import Circle from "./Circle";

function App() {
  return (
    <div>
      <Circle borderColor="black" bgColor="teal" />
      <Circle text="im here" bgColor="tomato" />
    </div>
  );
}

export default App;