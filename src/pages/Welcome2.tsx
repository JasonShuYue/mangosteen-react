import * as React from "react";
import p from "../assets/images/welcome2.svg";

export const Welcome2: React.FC = () => {
  return (
    <div className="text-center">
      <img src={p} className="w-32 h-37.5" />
      <h2 className="text-8 mt-12">
        每日提醒 <br />
        不会遗漏每一笔账单
      </h2>
    </div>
  );
};
