import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
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

function Motion5() {
  const x = useMotionValue(0);
  // const scale = useTransform(x, [-600, 0, 600], [2, 1, 0.1]);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );

  /* useEffect() 사용 */
  // useEffect(() => {
  //   // x.on("change", () => console.log(x.get()));
  //   scale.on("change", () => console.log(scale.get()));
  // }, [x]);

  /* useMotionValueEvent() 사용 */
  // useMotionValueEvent(x, "change", (x) => {
  //   console.log("x", x);
  // });
  // useMotionValueEvent(scale, "change", (scale) => {
  //   console.log("scale", scale);
  // });

  return (
    <>
      <Wrapper style={{ background: gradient }}>
        {/* <button onClick={() => x.set(200)}>click me</button> */}
        {/* <Box style={{ x : x, scale: scale }} drag="x" dragSnapToOrigin /> */}
        <Box style={{ x, rotateZ }} drag="x" dragSnapToOrigin />
      </Wrapper>
    </>
  );
}

export default Motion5;
