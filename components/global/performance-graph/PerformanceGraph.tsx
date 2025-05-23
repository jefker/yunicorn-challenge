"use client"

import React, { useEffect, useMemo, useState } from "react";
import {Area, AreaChart, CartesianGrid, XAxis, YAxis} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
} from "@/shadcn/ui/chart"
import Image from "next/image";

import plus from "@/public/icons/plus.svg";

const DiamondDot = (props: any) => {
  const { cx, cy, fill } = props;
  return (
    <polygon
      points={`${cx - 5},${cy} ${cx},${cy - 5} ${cx + 5},${cy} ${cx},${cy + 5}`}
      fill={fill}
    />
  );
};

export default function PerformanceGraph({
  title,
  data,
}: {
  title?: string;
  data: { date: string; performance: number }[];
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  const chartData = useMemo(() => {
    let compounded = 1;
    let previousCompounded = 1;
    return data
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((entry, index, arr) => {
        const currentPerformance = entry.performance;
        compounded *= 1 + currentPerformance / 100;

        const change = (compounded - previousCompounded) / previousCompounded * 100;
        previousCompounded = compounded;

        return {
          date: entry.date,
          dateFormatted: new Date(entry.date).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          performance: (compounded - 1) * 100,
          change,
        };
      });
  }, [data]);

  const firstDate = new Date(data[0]?.date);
  const lastDate = new Date(data[data.length - 1]?.date);
  const amountOfWeeks = Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 7) + 1);
  const latestCompounded = chartData[chartData.length - 1]?.performance ?? 0;

  return (
    <div className="bg-gradient-to-tr from-[#17232A] to-[#2F4956] pt-[3rem] lg:pt-[4rem] pb-[3rem]">
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-[2rem] mb-[3rem] lg:mb-[5rem] px-[3rem] lg:px-[5rem]">
        <h3 className="text-white text-[4rem] lg:text-[6rem] font-display italic">{title}</h3>

        <div className="flex justify-center">
          <div className="flex flex-col items-start gap-[1.5rem] py-[.75rem] border-r border-[#374B54] pr-[3rem] mr-[3rem]">
            <div className="bg-white rounded-[.5rem] flex items-center h-[5.5rem] gap-[1rem] py-[.75rem] pl-[.75rem] pr-[1.5rem]">
              <Image
                className="!h-full !w-auto flex-shrink-0"
                src={plus}
                alt=""
              />
              <p className="mb-0 leading-none text-[#303F48]">{latestCompounded.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</p>
            </div>
            <p className="mb-0 text-white italic text-[2rem] leading-none">Gesamte Rendite</p>
          </div>

          <div className="flex flex-col items-start gap-[1.5rem] py-[.75rem]">
            <div className="bg-white rounded-[.5rem] flex items-center h-[5.5rem] py-[.75rem] px-[1.5rem]">
              <p className="mb-0 leading-none text-[#303F48]">{amountOfWeeks} Wochen</p>
            </div>
            <p className="mb-0 text-white italic text-[2rem] leading-none">Zeit</p>
          </div>
        </div>
      </div>

      <div className="pl-[2rem] sm:pl-[3rem] lg:pl-[5rem]">
        <ChartContainer config={{}} className="lg:aspect-[230/97]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 0,
            }}
          >
            <CartesianGrid
              stroke="rgba(255, 255, 255, .1)"
              strokeDasharray="0"
            />

            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const [day, month, year] = value.split(".");
                const dateObj = new Date(`${year}-${month}-${day}`);
                const dayPart = dateObj.toLocaleDateString("de-DE", { day: "2-digit" });
                const monthShort = dateObj.toLocaleDateString("de-DE", { month: "short" });
                return `${monthShort} ${dayPart}.`;
              }}
              tick={{
                className: "axis-tick-label",
                fontSize: "1.3rem",
              }}
            />

            <YAxis
              orientation="right"
              tickMargin={2}
              tickFormatter={(value) => `${value.toFixed(0)}%`}
              tick={{
                className: "axis-tick-label",
                fontSize: "1.3rem",
              }}
            />

            <ChartTooltip
              content={({ payload }) => {
                const entry = payload?.[0]?.payload;
                if (!entry) return null;

                const change = entry.change ?? 0;
                const isPositive = change >= 0;

                return (
                  <div className="flex flex-col gap-[2rem] p-[1.5rem] bg-[#303F48] rounded-[.5rem] shadow-sm relative gradient-border-white before:opacity-20 min-w-[23rem]">
                    <p className="text-[1.75rem] text-white text-opacity-60 leading-none mb-0">
                      {entry.dateFormatted}
                    </p>
                    <div className="flex gap-[2rem] items-center justify-between">
                      <p className="text-[2.625rem] text-white leading-none mb-0">
                        {entry.performance.toFixed(2).replace(".", ",")}%
                      </p>
                      <p className={`text-[1.75rem] px-[.75rem] py-[.625rem] leading-none mb-0 rounded-[.5rem] relative gradient-border-white ${isPositive ? "bg-[#A38753] bg-opacity-20 text-[#E3C898] before:opacity-10" : "bg-[#B55454] bg-opacity-30 text-white text-opacity-80 before:opacity-5"}`}>
                        <span className="text-[1.5rem] inline-block mr-[.5rem] -translate-y-[.25rem]">{isPositive ? "▲" : "▼"}</span>
                        {(isPositive ? "+" : "") + change.toFixed(2).replace(".", ",")}%
                      </p>
                    </div>
                  </div>
                );
              }}
            />

            <defs>
              <linearGradient id="customInterestGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A38753" />
                <stop offset="100%" stopColor="#A38753" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              dataKey="performance"
              type="monotone"
              fill="url(#customInterestGradient)"
              stroke="url(#customInterestGradient)"
              strokeWidth={2}
              dot={isMobile ? false : <DiamondDot fill="#A38753" />}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  )
}