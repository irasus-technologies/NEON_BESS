"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { EChartsOption, DefaultLabelFormatterCallbackParams } from "echarts";
interface SolarDataPoint {
    hour: number; // 0–23
    value: number;
}

interface SolarForecastData {
    forecast: SolarDataPoint[];
    actual: SolarDataPoint[];
}

interface Props {
    data?: SolarForecastData;
    isLoading?: boolean;
}

const generateMockData = (): SolarForecastData => {
    const points = Array.from({ length: 24 }, (_, i) => {
        const base = Math.sin((Math.PI * (i - 6)) / 18) * 3;
        return {
            hour: i,
            value: Math.max(0, base + Math.random() * 0.2),
        };
    });

    const nowHour = new Date().getHours();
    const actual = points.map((pt, i) => ({
        hour: pt.hour,
        value: i <= nowHour ? pt.value * 0.9 + Math.random() * 0.2 : 0,
    }));

    return { forecast: points, actual };
};

export default function SolarForecastChart({ data = generateMockData(), isLoading = false }: Props) {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<echarts.EChartsType | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.dispose();
        }

        const chart = echarts.init(chartRef.current);
        chartInstance.current = chart;

        const hours = data.forecast.map((d) => `${String(d.hour).padStart(2, "0")}:00`);
        const forecastData = data.forecast.map((d) => (d.value * 1000).toFixed(0));
        const actualData = data.actual.map((d) => (d.value * 1000).toFixed(0));

        const now = new Date();
        const currentHour = now.getHours();

        const option: echarts.EChartsOption = {
            title: {
                text: `SOLAR POWER           Today - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,


                left: 10,
                top: 5,
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 'bold',
                },
            },
            tooltip: {
                trigger: 'axis',
                formatter: (params: any[]) => {
                    if (!Array.isArray(params)) {
                        params = [params];
                    }

                    const label = params[0].axisValue;
                    const tooltip = params
                        .map((p) => `${p.seriesName}: ${(Number(p.data)).toLocaleString()} W`)
                        .join('<br/>');
                    return `<strong>${label}</strong><br/>${tooltip}`;
                },
                backgroundColor: "#222",
                borderColor: "#333",
                textStyle: { color: "#fff" },
            } as echarts.TooltipComponentOption,
            legend: {
                top: 5,
                right: 10,
                textStyle: { color: "#aaa", fontSize: 10 },
                data: ["Estimation", "Realisation"],
            },
            grid: {
                top: 60,
                left: 40,
                right: 20,
                bottom: 30,
            },
            xAxis: {
                type: "category",
                data: hours,
                axisLabel: { color: "#999", fontSize: 10 },
                axisLine: { lineStyle: { color: "#555" } },
            },
            yAxis: {
                type: "value",
                name: "X 1000",
                axisLabel: {
                    formatter: (val: number) => (val / 1000).toFixed(1),
                    color: "#999",
                    fontSize: 10,
                },
                splitLine: { lineStyle: { color: "#333" } },
                axisLine: { show: false },
                nameTextStyle: { color: "#999", fontSize: 10 },
            },
            series: [
                {
                    name: "Estimation",
                    type: "line",
                    data: forecastData,
                    smooth: true,
                    areaStyle: {
                        color: "rgba(0, 255, 0, 0.3)",
                    },
                    lineStyle: {
                        color: "#32CD32",
                        width: 2,
                    },
                    symbol: "none",
                },
                {
                    name: "Realisation",
                    type: "line",
                    data: actualData,
                    smooth: true,
                    areaStyle: {
                        color: "rgba(255, 165, 0, 0.4)",
                    },
                    lineStyle: {
                        color: "#FFA500",
                        width: 2,
                    },
                    symbol: "none",
                },
                {
                    type: "line",
                    markLine: {
                        silent: true,
                        symbol: "none",
                        data: [
                            {
                                xAxis: `${String(currentHour).padStart(2, "0")}:00`,
                            },
                        ],
                        lineStyle: {
                            color: "#fff",
                            width: 1,
                            type: "solid",
                        },
                        label: {
                            show: true,
                            formatter: `{c} MW`,
                            position: "insideEndTop",
                            color: "#fff",
                            fontSize: 10,
                        },
                    },
                },
            ],
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
        return (
            <div className="w-full h-60 flex items-center justify-center text-sm text-muted">
                Loading...
            </div>
        );
    }

    return <div ref={chartRef} style={{ width: "100%", height: "260px" }} />;
}
