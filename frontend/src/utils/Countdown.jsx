import React from "react";
import { useCountdown } from "../Hooks/useCountdown";
export default function Countdown() {
  const [days, hours, minutes, seconds] = useCountdown('Sep 27 2023 23:52:42 GMT+0700');
  return (
    <>
      <div className="grid grid-flow-col text-center auto-cols-max items-center">
        <div className="flex flex-col p-2 rounded-box text-black">
          <span className="countdown font-mono text-4xl md:text-5xl">
            <span style={{ "--value": days }}></span>
          </span>
          <span className="font-bold">days</span>
        </div>
        <span className="text-xl font-bold text-[#DB4444]">:</span>
        <div className="flex flex-col p-2 rounded-box text-black">
          <span className="countdown font-mono text-4xl md:text-5xl">
            <span style={{ "--value": hours }}></span>
          </span>
          <span className="font-bold">hours</span>
        </div>
        <span className="text-xl font-bold text-[#DB4444]">:</span>
        <div className="flex flex-col p-2 rounded-box text-black">
          <span className="countdown font-mono text-4xl md:text-5xl">
            <span style={{ "--value": minutes }}></span>
          </span>
          <span className="font-bold">min</span>
        </div>
        <span className="text-xl font-bold text-[#DB4444]">:</span>
        <div className="flex flex-col p-2 rounded-box text-black">
          <span className="countdown font-mono text-4xl md:text-5xl">
            <span style={{ "--value": seconds }}></span>
          </span>
          <span className="font-bold">sec</span>
        </div>
      </div>
    </>
  );
}
