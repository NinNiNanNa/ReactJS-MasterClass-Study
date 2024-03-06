import styled, { keyframes } from "styled-components";

// dark모드 / light 모드
const Wrap = styled.div`
  width: 100vw;
  background-color: ${(props) => props.theme.backgroundColor};
`;
const Title = styled.h2`
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoxOne = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;
const BoxTwo = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;
// 위 BoxOne, BoxTwo 의 중복된 코드를 줄이는 법
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;
// Box의 모든 스타일에서 "border-radius" 스타일 추가
const Circle = styled(Box)`
  border-radius: 50px;
`;
const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;
// "attrs"를 사용하여 속성값을 설정할 수 있다.
const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: tomato;
`;
// 애니메이션
const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    border-radius: 100px;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 0px;
  }
`;
const Emoji = styled.span`
  font-size: 36px;
`;
const BoxMove = styled.div`
  width: 200px;
  height: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite;
  ${Emoji} {
    &:hover {
      font-size: 98px;
    }
    &:active {
      opacity: 0;
    }
  }
`;

function App() {
  return (
    <>
      <Wrap>
        <Title>태그에 직접적인 CSS</Title>
        <div style={{ display: "flex" }}>
          <div
            style={{ backgroundColor: "teal", width: 100, height: 100 }}
          ></div>
          <div
            style={{ backgroundColor: "tomato", width: 100, height: 100 }}
          ></div>
        </div>
        <hr />
        <Title>styled components 사용1</Title>
        <Wrapper>
          <BoxOne />
          <BoxTwo />
        </Wrapper>
        <hr />
        <Title>styled components 사용2</Title>
        <Wrapper>
          <Box bgColor="teal" />
          <Box bgColor="tomato" />
        </Wrapper>
        <hr />
        <Title>styled components 사용3</Title>
        <Wrapper>
          <Box bgColor="teal" />
          <Circle bgColor="tomato" />
        </Wrapper>
        <hr />
        <Title>styled components 사용4</Title>
        <Wrapper>
          <Btn>Log in</Btn>
          <Btn as="a" href="/">
            Log in
          </Btn>
        </Wrapper>
        <hr />
        <Title>styled components 사용5</Title>
        <Wrapper>
          <Input />
          <Input />
          <Input />
          <Input />
          <Input />
        </Wrapper>
        <hr />
        <Title>Animations</Title>
        <Wrapper>
          <BoxMove>
            <Emoji as="p">😎</Emoji>
          </BoxMove>
          <Emoji as="p">🔥</Emoji>
        </Wrapper>
      </Wrap>
    </>
  );
}

export default App;
