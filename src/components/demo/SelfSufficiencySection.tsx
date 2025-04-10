"use client";

import { PanelTop, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

interface SelfCardChartEntry {
    date: string;            // e.g. "Apr 05", or "2025-04-05"
    solar: number;           // % solar contribution
    grid: number;            // % grid contribution
}
interface SelfCardProps {
    title: string;
    icon: React.ReactNode;
    value: string;
    subtext: string;
    chartData: SelfCardChartEntry[];
    glowColor: string;
    metrics: { label: string; value: string | number }[];
}

const SelfCard = ({
    title,
    icon,
    value,
    subtext,
    chartData,
    glowColor,
    metrics,
}: SelfCardProps) => {
    const [option, setOption] = useState({});

    useEffect(() => {
        const dates = chartData.map((d) => d.date);
        const solarData = chartData.map((d) => d.solar);
        const gridData = chartData.map((d) => d.grid);

        setOption({
            tooltip: {
                trigger: "axis",
                backgroundColor: "#111",
                borderColor: glowColor,
                textStyle: { color: "#fff" },
                axisPointer: { type: "shadow" },
                formatter: (params: any) => {
                    const date = chartData[params[0].dataIndex]?.date;
                    const rows = params.map((p: any) => `${p.seriesName}: ${p.value}%`);
                    return `<strong>${date}</strong><br/>${rows.join("<br/>")}`;
                },
            },
            grid: { left: 0, right: 0, top: 10, bottom: 0 },
            xAxis: {
                type: "category",
                data: dates,
                axisLabel: {
                    color: "#ccc",
                    fontSize: 10,
                },
            },
            yAxis: {
                type: "value",
                max: 100,
                show: false,
            },
            series: [
                {
                    name: "Solar",
                    type: "bar",
                    stack: "total",
                    data: solarData,
                    itemStyle: { color: glowColor },
                },
                {
                    name: "Grid",
                    type: "bar",
                    stack: "total",
                    data: gridData,
                    itemStyle: { color: "#334155" }, // dark grey
                },
            ],
        });
    }, [chartData, glowColor]);


    return (
        <div className="relative group h-full">
            {/* Neon hover effect */}
            <div
                className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                style={{
                    border: `2px solid ${glowColor}`,
                    boxShadow: `0 0 12px ${glowColor}, 0 0 24px ${glowColor}`,
                }}
            />

            <div className="relative z-10 flex flex-col justify-between h-full rounded-lg border p-4 transition-all duration-300 group-hover:scale-[1.01]">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-white">{title}</h3>
                    <div
                        className="text-white"
                        style={{
                            textShadow: `0 0 6px ${glowColor}, 0 0 12px ${glowColor}`,
                        }}
                    >
                        {icon}
                    </div>
                </div>

                <div>
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
                </div>

                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {metrics.map((m, i) => (
                        <div key={i} className="flex justify-between">
                            <span>{m.label}</span>
                            <span className="text-white font-medium">{m.value}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-3 h-16">
                    <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
        </div>
    );
};

export default function SelfSufficiencySection() {
    return (
        <div className="grid grid-cols-2 gap-4 h-full">
            <SelfCard
                title="Solar Self-Sufficiency"
                icon={<PanelTop className="w-8 h-8" />}
                value="78%"
                subtext="Last 7 Days"
                chartData={[
                    { date: "Apr 01", solar: 78, grid: 22 },
                    { date: "Apr 02", solar: 72, grid: 28 },
                    { date: "Apr 03", solar: 84, grid: 16 },
                    { date: "Apr 04", solar: 65, grid: 35 },
                    { date: "Apr 05", solar: 89, grid: 11 },
                    { date: "Apr 06", solar: 90, grid: 10 },
                    { date: "Apr 07", solar: 86, grid: 14 },
                ]}
                glowColor="#7bff62"
                metrics={[
                    { label: "Avg Contribution", value: "78%" },
                    { label: "Total Solar Output", value: "314 kWh" },
                    { label: "Days > 80% Solar", value: "4" },
                    { label: "Worst Day", value: "65%" },
                    { label: "Avg Daily Output", value: "44.8 kWh" },
                ]}
            />

            <SelfCard
                title="Load Self-Sufficiency"
                icon={<Zap className="w-8 h-8" />}
                value="61%"
                subtext="Last 7 Days"
                chartData={[
                    { date: "Apr 01", solar: 50, grid: 50 },
                    { date: "Apr 02", solar: 40, grid: 60 },
                    { date: "Apr 03", solar: 45, grid: 55 },
                    { date: "Apr 04", solar: 55, grid: 45 },
                    { date: "Apr 05", solar: 60, grid: 40 },
                    { date: "Apr 06", solar: 65, grid: 35 },
                    { date: "Apr 07", solar: 59, grid: 41 },
                ]}
                glowColor="#e0ff62"
                metrics={[
                    { label: "Grid Independence Avg", value: "61%" },
                    { label: "Solar Contribution", value: "42%" },
                    { label: "Battery Assist", value: "19%" },
                    { label: "Grid Dependency", value: "39%" },
                    { label: "Peak Off-grid Coverage", value: "66%" },
                ]}

            />
        </div>
    );
}
