"use client";

import { BatteryCharging, BatteryFull } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

interface BatteryOverviewData {
    batteryCapacity: number;
    batteryPercentage: number;
    inflowStats: { label: string; value: string }[];
    energySource: { green: number; grid: number };
    healthMetrics: { label: string; value: string | number }[];
}

// 🔧 Mock Data (replace with API data later)
const demoBatteryData: BatteryOverviewData = {
    batteryCapacity: 125,
    batteryPercentage: 80,
    inflowStats: [

        { label: "Daily Inflow", value: "124 MWh" },
        { label: "Month To Date", value: "2.4 GWh" },
        { label: "Year To Date", value: "18.2 GWh" },
        { label: "Avg Daily Inflow", value: "118 MWh" },
        { label: "Peak Inflow (7D)", value: "142 MWh" },


    ],
    energySource: { green: 85, grid: 15 },
    healthMetrics: [
        { label: "Green Energy", value: "85%" },
        { label: "Grid Energy", value: "15%" },
        { label: "State of Health", value: "99.9%" },
        { label: "Total Cycles Today", value: "0.3" },
        { label: "Total Cycles Completed", value: "13" },
    ],
};

export default function BatteryOverviewSection() {
    const [socChart, setSocChart] = useState({});
    const [energySplitChart, setEnergySplitChart] = useState({});

    const {
        batteryCapacity,
        batteryPercentage,
        inflowStats,
        energySource,
        healthMetrics,
    } = demoBatteryData;

    useEffect(() => {
        setSocChart({
            graphic: {
                elements: [
                    {
                        type: "image",
                        left: "center",
                        top: "center",
                        style: {
                            image:
                                "data:image/svg+xml;utf8," +
                                encodeURIComponent(`
            <svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' fill='none' stroke='#fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'>
              <path d='M5 7h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z'/>
              <path d='M11 6v2'/>
              <path d='m10 10-2 4h3l-2 4'/>
              <line x1='22' y1='11' x2='22' y2='13'/>
            </svg>
          `),
                            width: 36,
                            height: 36,
                        },
                    },
                ],
            },

            series: [
                {
                    type: "gauge",
                    startAngle: 90,
                    endAngle: -270,
                    progress: {
                        show: true,
                        width: 8,
                        itemStyle: { color: "#7bff62" },
                    },
                    axisLine: {
                        lineStyle: {
                            width: 8,
                            color: [[batteryPercentage / 100, "#7bff62"], [1, "#333"]],
                        },
                    },
                    pointer: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false },
                    detail: {
                        fontSize: 18,
                        color: "#ffffff",
                        formatter: `{value}%`,
                        offsetCenter: [0, "65%"],
                    },
                    data: [{ value: batteryPercentage }],
                },
            ],
        });


        setEnergySplitChart({
            tooltip: {
                trigger: "item",
                formatter: "{b}: {d}%",
            },
            series: [
                {
                    name: "Energy Source",
                    type: "pie",
                    radius: ["50%", "70%"],
                    label: {
                        show: true,
                        formatter: "{b}: {d}%",
                        color: "#fff",
                        fontSize: 12,
                    },
                    labelLine: { show: true },
                    data: [
                        { value: energySource.green, name: "Green Energy", itemStyle: { color: "#7bff62" } },
                        { value: energySource.grid, name: "Grid Energy", itemStyle: { color: "#00e0ff" } },
                    ],
                },
            ],
        });
    }, [batteryPercentage, energySource]);

    // 💡 Reusable Card Wrapper
    const GlowingCard = ({
        children,
        glowColor = "#7bff62",
    }: {
        children: React.ReactNode;
        glowColor: string;
    }) => (
        <div className="relative group h-full transition-all duration-300 hover:scale-[1.01]">
            <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300"
                style={{
                    border: `2px solid ${glowColor}`,
                    boxShadow: `0 0 12px ${glowColor}, 0 0 24px ${glowColor}`,
                }}
            />
            <div className="relative z-10 border rounded-lg p-4 h-full">
                {children}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-2 gap-4 h-full text-sm text-white">
            {/* 🔋 Battery Status Card */}
            <GlowingCard glowColor="#7bff62">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Battery Status</h3>
                    <BatteryCharging className="text-[#7bff62] w-6 h-6" />
                </div>

                <div className="text-3xl font-bold text-[#7bff62] mb-1">
                    {batteryCapacity}{" "}
                    <span className="text-base text-white font-medium">kW</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">25% of Max Capacity</p>

                <div className="w-full h-48 mb-4">
                    <ReactECharts option={socChart} style={{ height: "100%", width: "100%" }} />
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">
                    Battery is {batteryPercentage}% charged
                </p>

                <div className="mt-2 text-xs space-y-1">
                    {inflowStats.map((stat, idx) => (
                        <div key={idx} className="flex justify-between">
                            <span>{stat.label}</span>
                            <span>{stat.value}</span>
                        </div>
                    ))}
                </div>
            </GlowingCard>

            {/* ⚡ Energy Source + Health Card */}
            <GlowingCard glowColor="#00e0ff">
                <div className="flex justify-end items-center mb-2">
                    <h3 className="text-lg font-semibold">Energy Source & Health</h3>
                    <BatteryFull className="text-[#00e0ff] w-6 h-6" />
                </div>
                <div className="flex flex-col justify-between mt-12">
                    <div className="h-48 w-full mb-4">
                        <ReactECharts option={energySplitChart} style={{ height: "100%", width: "100%" }} />
                    </div>

                    <div className="mt-[2rem] text-xs space-y-1">
                        {healthMetrics.map((metric, idx) => (
                            <div key={idx} className="flex justify-between">
                                <span>{metric.label}</span>
                                <span>{metric.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </GlowingCard>
        </div>
    );
}
