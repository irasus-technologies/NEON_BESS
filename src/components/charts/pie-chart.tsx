"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface Category {
    label: string;
    value: number;
    color: string;
}

interface EnergyChartData {
    greenFactor: number;
    usage: Category[];
    supply: Category[];
}

interface PieChartProps {
    data?: EnergyChartData;
    isLoading?: boolean;
}

const defaultData: EnergyChartData = {
    greenFactor: 18,
    usage: [
        { label: "Building", value: 124, color: "#FFD700" },
        { label: "DC Chargers", value: 78, color: "#FF8C00" },
        { label: "AC Chargers", value: 62, color: "#FF4500" },
        { label: "Battery Storage", value: 1, color: "#00FA9A" },
    ],
    supply: [
        { label: "Grid", value: 124, color: "#66CDAA" },
        { label: "Battery", value: 122, color: "#32CD32" },
        { label: "Solar", value: 68, color: "#FFD700" },
        { label: "Wind", value: 20, color: "#87CEEB" },
    ],
};

export default function PieChart({ data = defaultData, isLoading = false }: PieChartProps) {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<echarts.EChartsType | null>(null);

    const outerRingData = [...data.usage, ...data.supply].map((item) => ({
        value: item.value,
        name: item.label,
        itemStyle: { color: item.color },
    }));

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.dispose();
        }

        const chart = echarts.init(chartRef.current);
        chartInstance.current = chart;

        const option: any = {
            tooltip: {
                trigger: "item",
                formatter: "{b}: {c} MW ({d}%)",
            },
            graphic: {
                elements: [
                    {
                        type: "text",
                        left: "center",
                        top: "center",
                        style: {
                            text: `${data.greenFactor}%\nGreen factor`,
                            fill: "#fff",
                            font: "600 12px sans-serif",
                            textAlign: 'center',
                        },
                    },
                ],
            },
            series: [
                {
                    name: "Green Factor",
                    type: "pie",
                    radius: ["28%", "38%"], // slightly smaller radius to reduce outer overlap
                    center: ["50%", "50%"], //
                    label: { show: false },
                    data: [
                        {
                            value: data.greenFactor,
                            name: "Green",
                            itemStyle: { color: "#00c49a" },
                        },
                        {
                            value: 100 - data.greenFactor,
                            name: "Other",
                            itemStyle: { color: "#2f2f2f" },
                        },
                    ],
                },
                {
                    name: "Energy Breakdown",
                    type: "pie",
                    radius: ["48%", "68%"],
                    label: { show: false },
                    labelLine: { show: false },
                    data: outerRingData,
                },
            ],
            grid: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
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
            <div className="text-md tracking-tight text-green-300">
                TOTAL GREEN FACTOR TODAY
            </div>
            <div
                ref={chartRef}
                style={{ width: "100%", height: "260px" }}
                className="z-10"
            />
            {/* Custom Legend */}
            <div className=" grid grid-cols-1 gap-6 text-sm text-white font-light">
                <div>
                    <h4 className="font-semibold mb-3">ENERGY USAGE</h4>
                    {data.usage.map((item) => {
                        const total = data.usage.reduce((sum, i) => sum + i.value, 0);
                        const percent = ((item.value / total) * 100).toFixed(2);
                        return (
                            <div key={item.label} className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    {item.label}
                                </div>
                                <div className="flex gap-2 font-mono">
                                    <span>{item.value} MW</span>
                                    <span>{percent}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div>
                    <h4 className="font-semibold mb-3">ENERGY SUPPLY</h4>
                    {data.supply.map((item) => {
                        const total = data.supply.reduce((sum, i) => sum + i.value, 0);
                        const percent = ((item.value / total) * 100).toFixed(2);
                        return (
                            <div key={item.label} className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    {item.label}
                                </div>
                                <div className="flex gap-2 font-mono">
                                    <span>{item.value} MW</span>
                                    <span>{percent}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </>
    );
}
