import * as React from "react";
import p from "../assets/images/welcome4.svg";

export const Welcome4: React.FC = () => {
  return (
    <div className="text-center">
      <img src={p} className="w-32.25 h-27.5" />
      <h2 className="text-8 mt-12">
        云备份 <br />
        再也不怕数据丢失
      </h2>
    </div>
  );
};
