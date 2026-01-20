import * as React from "react";
import p from "../assets/images/welcome3.svg";

export const Welcome3: React.FC = () => {
  return (
    <div className="text-center">
      <img src={p} className="w-32.5 h-27" />
      <h2 className="text-8 mt-6">
        数据可视化 <br />
        收支一目了然
      </h2>
    </div>
  );
};
