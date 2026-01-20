import * as React from "react";
import p from "../assets/images/welcome1.svg";

export const Welcome1: React.FC = () => {
  return (
    <div className="text-center">
      <img src={p} className="w-32 h-32.5" />
      <h2 className="text-8 mt-12">
        会挣钱 <br />
        还要会省钱
      </h2>
    </div>
  );
};
