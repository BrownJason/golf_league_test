/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Marquee } from "../magicui/marquee";
import { useState } from "react";

function getDate(inDate: any): string {
  const dateParts = inDate.split(/[-T:.Z]/);
  const date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4], dateParts[5]));

  return date.toLocaleDateString("en-US") + " at " + date.toLocaleTimeString();
}

function getTime(inDate: any): string {
  const dateParts = inDate.split(/[-T:.Z]/);
  const date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4], dateParts[5]));

  return date.toLocaleTimeString();
}

export default function Events({ espn_event, eventStartDate, eventEndDate }: { espn_event: any; eventStartDate: string; eventEndDate: string }) {
  const [isReverse, setIsReverse] = useState(false);

  console.log(espn_event);

  return (
    <>
      <div className="flex items-center w-full">
        <div className="flex flex-col items-center mx-auto bg-[#243E2A] border border-[#9A9540] rounded-xl shadow shadow-black shadow-lg p-6 my-8 text-center">
          <div className="flex text-3xl hover:text-4xl ">
            <a href={`https://www.espn.com/golf/leaderboard?tournamentId=${espn_event.id}`} target="_blank">
                {espn_event.name}
            </a>
          </div>
          <div className="flex flex-col mx-auto items-center my-2">
            <div className="flex text-wrap text-xl">
              <em>When to watch:</em>
            </div>
            <div>
              {getDate(eventStartDate)} thru {getDate(eventEndDate)}
            </div>
          </div>
          <div className="flex flex-col mx-auto items-center my-2">
            <div className="flex text-wrap text-xl">
              <em>Where to watch:</em>
            </div>
            <div>{espn_event.competitions[0].broadcast}</div>
          </div>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className={`[--duration:300s]`} onClick={() => setIsReverse(!isReverse)} reverse={isReverse}>
          {espn_event.competitions[0].competitors.map((res: any) => {
            return (
              <div key={res.athlete.fullName} className="bg-[#243E2A] border border-[#9A9540] grid grid-cols-2 p-2 rounded-lg h-32 mr-6 shadow shadow-black shadow-lg">
                <div className="flex flex-col mx-auto">
                  <div className="text-xl text-wrap mr-4 2-48">{res.athlete.fullName}</div>
                  <div>Current score: {res.score}</div>
                  <div className="flex">Tee Time: {getTime(res.linescores[0].teeTime)}</div>
                </div>
                <div className="flex items-center p-0 ml-4">
                  <Image src={`${res.athlete.flag.href}`} alt={res.athlete.flag.alt} width={128} height={128} />
                </div>
              </div>
            );
          })}
        </Marquee>
      </div>
    </>
  );
}
