import React from "react";

export default function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="300px" height="100px" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text x="50" y="40" className="font-bold text-4xl text-white" style={{ textShadow: "1px 1px 2px black" }}>
        CHAMPIONS
      </text>
      <text x="120" y="70" className="font-bold text-2xl text-white" style={{ textShadow: "1px 1px 2px black" }}>
        LEAGUE
      </text>
      <text x="180" y="90" className="font-bold text-2xl text-white" style={{ textShadow: "1px 1px 2px black" }}>
        RI
      </text>
    </svg>
  );
}
