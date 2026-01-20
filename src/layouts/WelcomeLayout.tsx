import { animated, useTransition } from "@react-spring/web";
import type { ReactNode } from "react";
import { useRef } from "react";
import { Link, useLocation, useOutlet } from "react-router-dom";

import logo from "../assets/images/logo.svg";

const linkMap = {
  "/welcome/1": "/welcome/2",
  "/welcome/2": "/welcome/3",
  "/welcome/3": "/welcome/4",
  "/welcome/4": "/welcome/xxx",
};

const map: Record<string, ReactNode> = {};

console.log(333333);

export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({});
  const location = useLocation();
  const outlet = useOutlet(); // 用于获取当前路由匹配的子组件
  console.log("outlet@@@@@2", outlet);
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
    config: { duration: 10000 },
  });

  return (
    <div className="bg-[#5f34bf] h-screen flex flex-col items-stretch pb-7">
      <header className="shrink-0 text-center pt-16">
        <img src={logo} className="w-16 inline-block" />
        <h1 className="text-[#D4D4EE] mt-2.5 text-lg font-bold">山竹记账</h1>
      </header>
      <main className="shrink grow m-4">
        {transitions((style, pathname) => (
          <animated.div
            key={pathname}
            style={style}
            className="bg-white rounded-2xl w-full h-full flex justify-center items-center"
          >
            {map.current[pathname]}
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
