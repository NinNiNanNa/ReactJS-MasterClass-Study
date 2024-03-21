import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const Wrapper = styled.div`
  width: 100vw;
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(65, 3, 255), rgb(2, 83, 255));
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function Motion6() {
  const x = useMotionValue(0);
  const { scrollY, scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("scrollY: ", latest);
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("scrollYProgress: ", latest);
  });
  return (
    <>
      <Wrapper>
        {/* <Box style={{ scale: scale }} /> */}
        <Box style={{ scale }} />
      </Wrapper>
    </>
  );
}

export default Motion6;
