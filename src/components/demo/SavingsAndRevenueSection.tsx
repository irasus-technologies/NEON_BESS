"use client";

import { PiggyBank, HandCoins } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import ECharts (client-only)
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

interface MetricCardProps {
    title: string;
    icon: React.ReactNode;
    value: string;
    subtext: string;
    chartData: number[];
    glowColor?: string;
    extraMetrics?: {
        label: string;
        value: string | number;
    }[];
}

const MetricCard = ({
    title,
    icon,
    value,
    subtext,
    chartData,
    glowColor = "#7bff62",
    extraMetrics = [],
}: MetricCardProps) => {
    const [option, setOption] = useState({});

    useEffect(() => {
        setOption({
            grid: { left: 0, right: 0, top: 10, bottom: 0 },
            xAxis: {
                type: "category",
                data: chartData.map((_, i) => `Day ${i + 1}`),
                show: false,
            },
            yAxis: {
                type: "value",
                show: false,
            },
            tooltip: {
                trigger: "axis",
                backgroundColor: "#111",
                borderColor: glowColor,
                textStyle: {
                    color: "#fff",
                },
                formatter: (params: any) => {
                    const val = params?.[0]?.value;
                    return `Value: <strong>${val}</strong>`;
                },
            },
            series: [
                {
                    data: chartData,
                    type: "line",
                    smooth: true,
                    symbol: "circle",
                    symbolSize: 6,
                    lineStyle: {
                        color: glowColor,
                        width: 2,
                    },
                    itemStyle: {
                        color: glowColor,
                    },
                    areaStyle: {
                        color: glowColor,
                        opacity: 0.15,
                    },
                },
            ],
        });
    }, [chartData, glowColor]);

    return (
        <div className="relative group h-full">
            {/* Neon glow on hover */}
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
                        className="text-white group-hover:text-[#a2ff62]"
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

                    {extraMetrics.length > 0 && (
                        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                            {extraMetrics.map((item, idx) => (
                                <div key={idx} className="flex justify-between">
                                    <span>{item.label}</span>
                                    <span className="text-white font-medium">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-3 h-16">
                    <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
                </div>
            </div>
        </div>
    );
};

export default function SavingsAndRevenueSection() {
    return (
        <div className="grid grid-cols-2 gap-4 h-full">
            <MetricCard
                title="Total Savings"
                icon={<PiggyBank className="w-10 h-10" />}
                value="₹2.1 Cr"
                subtext="Saved vs Grid Cost"
                chartData={[20, 22, 23, 28, 32, 34, 38]}
                glowColor="#7bff62"
                extraMetrics={[
                    { label: "This Month", value: "₹18.5L" },
                    { label: "Monthly Avg", value: "₹15.2L" },
                    { label: "Best Day", value: "₹1.3L" },
                ]}
            />

            <MetricCard
                title="Revenue Generated"
                icon={<HandCoins className="w-10 h-10" />}
                value="₹75.4 L"
                subtext="YTD Earnings"
                chartData={[10, 14, 18, 22, 25, 26, 29]}
                glowColor="#e0ff62"
                extraMetrics={[
                    { label: "This Month", value: "₹6.9L" },
                    { label: "Net Margin", value: "₹2.4L" },
                    { label: "Growth", value: "12.4%" },
                ]}
            />
        </div>
    );
}
