"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface DayAheadPricePoint {
    timestamp: string; // ISO format
    price: number;
}

interface LineChartProps {
    data?: DayAheadPricePoint[];
    isLoading?: boolean;
}

// Utility: Generate hourly data for today and tomorrow
function generateDemoData(): DayAheadPricePoint[] {
    const data: DayAheadPricePoint[] = [];
    const now = new Date();
    now.setMinutes(0, 0, 0); // round to hour

    for (let i = -12; i < 36; i++) {
        const date = new Date(now);
        date.setHours(now.getHours() + i);
        data.push({
            timestamp: date.toISOString(),
            price: Math.round(30 + Math.random() * 10), // €30–40
        });
    }

    return data;
}

export default function LineChart({ data = generateDemoData(), isLoading = false }: LineChartProps) {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<echarts.EChartsType | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.dispose();
        }

        const chart = echarts.init(chartRef.current);
        chartInstance.current = chart;

        // Convert to IST-based "now"
        const now = new Date();
        const nowIST = new Date(now.getTime() + (330 * 60 * 1000)); // +5:30 in ms

        const pastData = data.filter((d) => new Date(d.timestamp).getTime() <= nowIST.getTime());
        const futureData = data.filter((d) => new Date(d.timestamp).getTime() > nowIST.getTime());

        const xAxisData = data.map((d) => d.timestamp);

        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: "axis",
                formatter: (params: any) => {
                    const point = params[0];
                    const localTime = new Date(point.axisValue).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                        day: "numeric",
                        month: "short",
                    });
                    return `${localTime}<br/>Price: €${point.data}`;
                },
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: xAxisData,
                axisLabel: {
                    color: "#ccc",
                    formatter: (value: string) =>
                        new Date(value).toLocaleTimeString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            hour: "2-digit",
                            hour12: false,
                        }),
                },
                axisLine: { lineStyle: { color: "#888" } },
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    color: "#ccc",
                    formatter: (val: number) => `€${val}`,
                },
                splitLine: { lineStyle: { color: "#333" } },
            },
            series: [
                {
                    name: "Past Prices",
                    type: "line",
                    data: pastData.map((d) => d.price),
                    symbol: "none",
                    itemStyle: { color: "#FFD700" },
                    lineStyle: { color: "#FFA500", width: 2 },
                    areaStyle: { color: "rgba(255, 215, 0, 0.15)" },
                },
                {
                    name: "Future Prices",
                    type: "line",
                    data: [
                        ...new Array(pastData.length).fill(null),
                        ...futureData.map((d) => d.price),
                    ],
                    symbol: "circle",
                    symbolSize: 6,
                    itemStyle: { color: "#FFD700" },
                    lineStyle: {
                        color: "#FFA500",
                        width: 2,
                        type: "dashed",
                    },
                    areaStyle: { color: "rgba(255, 165, 0, 0.1)" },
                },
            ],
            grid: {
                top: 20,         // reduced from default
                bottom: 10,
                left: "3%",
                right: "3%",
                containLabel: true,
            },
        };

        chart.setOption(option);

        const handleResize = () => chart.resize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.dispose();
            chartInstance.current = null;
        };
    }, [data]);

    if (isLoading) {
        return <div className="w-full h-full flex items-center justify-center text-sm text-muted">Loading...</div>;
    }

    return (
        <>
            <div className="font-semibold text-xs text-white mb-2">Day Ahead Prices</div>
            <div
                ref={chartRef}
                style={{ width: "100%", height: "200px" }}
                className="z-10"
            />
        </>
    );
}
