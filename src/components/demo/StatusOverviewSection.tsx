"use client";

import {
    Sun,
    BatteryCharging,
    PlugZap,
} from "lucide-react";

interface MetricProps {
    label: string;
    value: string | number;
    unit?: string;
}

const Metric = ({ label, value, unit }: MetricProps) => (
    <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="text-foreground font-light">
            {value}
            {unit && <span className="text-xs ml-1 text-muted-foreground">{unit}</span>}
        </span>
    </div>
);

interface StatusCardProps {
    title: string;
    icon: React.ReactNode;
    metrics: MetricProps[];
    bg?: string;
}

const StatusCard = ({ title, icon, metrics }: StatusCardProps) => {
    return (
        <div className="relative group">
            {/* Green neon glow on hover */}
            <div
                className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                style={{
                    border: "2px solid #7bff62", // bright green
                    boxShadow: "0 0 12px #7bff62, 0 0 24px #a2ff62",
                }}
            />

            {/* Main card content */}
            <div className="relative z-10 flex flex-col justify-between rounded-lg border p-4 transition-all duration-300 group-hover:scale-[1.01] ">
                <div className="flex flex-col items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <div
                        className="text-white transition-all duration-300 group-hover:text-[#a2ff62]"
                        style={{
                            transition: "all 0.1s ease-in-out",
                        }}
                    >
                        <div className="group-hover:[text-shadow:_0_0_6px_#7bff62,_0_0_12px_#a2ff62] transition-all">
                            {icon}
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    {metrics.map((metric, idx) => (
                        <Metric key={idx} {...metric} />
                    ))}
                </div>
            </div>
        </div>
    );
};


export default function StatusOverviewSection() {
    return (
        <>
            <div className="text-sm px-2 py-1">SITE LOCATION : Delhi </div>
            <div className="grid grid-cols-3 gap-4 h-[90%]">
                {/* Solar Grid */}
                <StatusCard
                    title="Solar "
                    icon={<Sun className="w-20 h-20" />}
                    // bg="bg-yellow-50"
                    metrics={[
                        { label: " Output", value: 38.6, unit: "kW" },
                        { label: " Load", value: 27.4, unit: "kW" },
                        { label: "Utilization", value: "71", unit: "%" },
                        { label: "Efficiency", value: "93", unit: "%" },
                    ]}
                />

                {/* Battery */}
                <StatusCard
                    title="Battery"
                    icon={<BatteryCharging className="w-20 h-20" />}
                    // bg="bg-blue-50"
                    metrics={[
                        { label: "Capacity", value: 120, unit: "kWh" },
                        { label: "SOC", value: "64", unit: "%" },
                        { label: "SOH", value: "95", unit: "%" },
                        { label: "Cycles Today", value: 3, unit: " " },
                    ]}
                />

                {/* Grid */}
                <StatusCard
                    title="Grid"
                    icon={<PlugZap className="w-20 h-20" />}
                    // bg="bg-green-50"
                    metrics={[
                        { label: "Grid Import", value: 6.4, unit: "kW" },
                        { label: "Grid Export", value: 2.1, unit: "kW" },
                        { label: "Net Usage", value: 4.3, unit: "kW" },
                        { label: "Frequency", value: 50.1, unit: "Hz" },
                    ]}
                />
            </div>
        </>
    );
}
