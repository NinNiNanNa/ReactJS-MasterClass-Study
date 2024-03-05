import styled from "styled-components";

const Father = styled.div`
  display: flex;
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
const Text = styled.span`
  color: white;
`;

function App() {
  return (
    <>
      <h2>styled components 사용</h2>
      <Father>
        <BoxOne>
          <Text>Hello</Text>
        </BoxOne>
        <BoxTwo />
      </Father>
      <hr />
      <h2>태그에 직접적인 CSS</h2>
      <div style={{ display: "flex" }}>
        <div style={{ backgroundColor: "teal", width: 100, height: 100 }}></div>
        <div
          style={{ backgroundColor: "tomato", width: 100, height: 100 }}
        ></div>
      </div>
    </>
  );
}

export default App;
