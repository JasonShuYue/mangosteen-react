import { animated, useTransition } from "@react-spring/web";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { Link, useLocation, useOutlet } from "react-router-dom";

import logo from "../assets/images/logo.svg";

const linkMap = {
  "/welcome/1": "/welcome/2",
  "/welcome/2": "/welcome/3",
  "/welcome/3": "/welcome/4",
  "/welcome/4": "/welcome/xxx",
};

export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({});
  const location = useLocation();
  const outlet = useOutlet(); // 用于获取当前路由匹配的子组件
  const [extraStyle, setExtraStyle] = useState({ position: "relative" });

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
      setExtraStyle({ position: "relative" });
    },
  });

  return (
    <div className="bg-[#5f34bf] h-screen flex flex-col items-stretch pb-7">
      <header className="shrink-0 text-center pt-16">
        <img src={logo} className="w-16 h-17.25 inline-block" />
        <h1 className="text-[#D4D4EE] mt-2.5 text-lg font-bold">山竹记账</h1>
      </header>
      <main className="shrink grow relative">
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
        <Link style={{ gridArea: "1 / 3 / 2 / 4" }} to="/welcome/xxx">
          跳过
        </Link>
      </footer>
    </div>
  );
};
