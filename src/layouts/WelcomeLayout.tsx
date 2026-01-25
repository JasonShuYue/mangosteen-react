import { animated, useTransition } from "@react-spring/web";
import type { ReactNode } from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useOutlet, useNavigate } from "react-router-dom";

import logo from "../assets/images/logo.svg";
import { useSwipe } from "../hooks/useSwipe";
import { useLocalStore } from "../stores/useStores";

const linkMap = {
  "/welcome/1": "/welcome/2",
  "/welcome/2": "/welcome/3",
  "/welcome/3": "/welcome/4",
  "/welcome/4": "/welcome/xxx",
};

export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({});
  const animating = useRef(false);
  const location = useLocation();
  const outlet = useOutlet(); // 用于获取当前路由匹配的子组件
  const [extraStyle, setExtraStyle] = useState({ position: "relative" });
  const main = useRef<HTMLElement>(null);
  const { direction } = useSwipe(main, {
    onTouchStart: (e) => e.preventDefault(),
  });
  const nav = useNavigate();

  const { setHasReadWelcomes } = useLocalStore();

  map.current[location.pathname] = outlet;

  const transitions = useTransition(location.pathname, {
    // 进入状态
    from: {
      transform:
        location.pathname === "/welcome/1"
          ? "translateX(0%)"
          : "translateX(100%)",
    },
    // 稳定状态
    enter: { transform: "translateX(0%)" },
    // 退出状态
    leave: { transform: "translateX(-100%)" },
    config: { duration: 300 },
    onStart: () => {
      setExtraStyle({ position: "absolute" });
    },
    onRest: () => {
      animating.current = false;
      setExtraStyle({ position: "relative" });
    },
  });

  useEffect(() => {
    if (direction === "left") {
      console.log("animating.current::::", animating.current);

      if (animating.current) {
        return;
      }
      animating.current = true;
      nav(linkMap[location.pathname]);
    }
  }, [direction, location.pathname, linkMap]);

  const onSkip = () => {
    setHasReadWelcomes(true);
  };

  return (
    <div className="bg-[#5f34bf] h-screen flex flex-col items-stretch pb-7">
      <header className="shrink-0 text-center pt-16">
        <img src={logo} className="w-16 h-17.25 inline-block" />
        <h1 className="text-[#D4D4EE] mt-2.5 text-lg font-bold">山竹记账</h1>
      </header>
      <main className="shrink grow relative" ref={main}>
        {transitions((style, pathname) => (
          <animated.div
            key={pathname}
            style={{ ...style, ...extraStyle }}
            className="w-full h-full flex p-4"
          >
            <div className="bg-white rounded-2xl flex justify-center items-center grow">
              {map.current[pathname]}
            </div>
          </animated.div>
        ))}
      </main>
      <footer className="shrink-0 text-center text-24px text-white grid grid-cols-3 grid-rows-1">
        <Link
          style={{ gridArea: "1 / 2 / 2 / 3" }}
          to={linkMap[location.pathname]}
        >
          下一页
        </Link>
        <Link
          style={{ gridArea: "1 / 3 / 2 / 4" }}
          to="/welcome/xxx"
          onClick={onSkip}
        >
          跳过
        </Link>
      </footer>
    </div>
  );
};
