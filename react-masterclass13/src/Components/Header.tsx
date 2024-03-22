import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.nav)`
  padding: 20px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  font-size: 14px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: ${(props) => props.theme.red};
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  svg {
    height: 25px;
  }
`;

const Circle = styled(motion.span)`
  margin: 0 auto;
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
  padding: 5px 10px 5px 40px;
  z-index: -1;
  position: absolute;
  right: 0;
  font-size: 16px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid ${(props) => props.theme.white.lighter};
  transform-origin: right center;
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [1, 0, 1],
    transition: {
      // 반복 무한
      repeat: Infinity,
    },
  },
};

const navVariants = {
  top: {
    background: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
  },
  scroll: {
    background: "linear-gradient(rgba(0, 0, 0, 1),rgba(0, 0, 0, 1))",
  },
};

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");
  // console.log(homeMatch, tvMatch);
  // const toggleSearch = () => setSearchOpen((prev) => !prev);
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const toggleSearch = () => {
    if (searchOpen) {
      // trigger the close animation
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      // trigger the open animation
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };
  useMotionValueEvent(scrollY, "change", (scroll) => {
    // console.log(scroll);
    if (scroll > 80) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });

  return (
    <Nav variants={navVariants} initial={"top"} animate={navAnimation}>
      <Col>
        <Logo
          variants={logoVariants}
          initial="normal"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
            fill="#d81f26"
          />
        </Logo>
        <Items>
          <Item>
            <Link to="/">
              Home {homeMatch?.isExact && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              Tv Shows {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -210 : 0 }}
            transition={{ type: "linear" }}
            fillRule="evenodd"
            clipRule="evenodd"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"></path>
          </motion.svg>
          <Input
            initial={{ scaleX: 0 }}
            // animate={{ scaleX: searchOpen ? 1 : 0 }}
            animate={inputAnimation}
            transition={{ type: "linear" }}
            placeholder="Search for movie or tv show..."
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
