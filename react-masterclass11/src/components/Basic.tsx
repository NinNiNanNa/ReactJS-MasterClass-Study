import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e09, #d0e);
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function Basic() {
  return (
    <Wrapper>
      *{/* 일반 HTML태그에서 framer motion 애니메이션을 사용할때 */}
      <motion.div></motion.div>
      <Box
        transition={{ delay: 3, duration: 3 }}
        animate={{ borderRadius: "100px" }}
      />
    </Wrapper>
  );
}

export default Basic;
