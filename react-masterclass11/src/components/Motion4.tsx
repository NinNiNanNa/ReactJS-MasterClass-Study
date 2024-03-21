import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #7500ff, #4500ff);
`;

const BiggerBox = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 40px;
  align-items: center;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

// const boxVariants = {
//   hover: { rotateZ: 90 },
//   click: { borderRadius: "100px" },
//   drag: { backgroundColor: "rgb(46, 204, 113)", transition: { duration: 5 } },
// };

function Motion4() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Wrapper>
        <BiggerBox ref={biggerBoxRef}>
          <Box
            drag
            /* 수학적으로 계산하는 방법 */
            // dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
            /* 레퍼런스를 이용하는 방법 */
            dragConstraints={biggerBoxRef}
            // 0.5가 기본값이다.
            dragElastic={0.5}
            dragSnapToOrigin
            // variants={boxVariants}
            // whileDrag="drag"
            // whileHover="hover"
            // whileTap="click"
          />
        </BiggerBox>
      </Wrapper>
    </>
  );
}

export default Motion4;
