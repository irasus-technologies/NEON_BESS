"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, Sun, Moon, Droplets, Thermometer, CloudSun, Zap } from "lucide-react";
import { ForecastDay } from "./WeatherBox"; // optional if split

interface WeatherModalProps {
    open: boolean;
    onOpenChange: (val: boolean) => void;
    today: ForecastDay;
    tomorrow: ForecastDay;
    city: string;
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    humidity: { morning: string; evening: string };
}

export function WeatherDetailsModal({
    open,
    onOpenChange,
    today,
    tomorrow,
    city,
    sunrise,
    sunset,
    moonrise,
    moonset,
    humidity,
}: WeatherModalProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/70 fixed inset-0 z-40" />
                <Dialog.Content className="z-50 fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-background text-white border border-white/10 rounded-lg shadow-xl p-6 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold">{city.toUpperCase()} - Weather Details</h2>
                        <Dialog.Close asChild>
                            <button className="text-white hover:text-red-500 transition">
                                <X className="w-5 h-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    <div className="text-sm space-y-3">
                        {[{ label: "Today", ...today }, { label: "Tomorrow", ...tomorrow }].map((day, idx) => (
                            <div key={idx} className="bg-primary/10 p-3 rounded-md space-y-1">
                                <div className="text-xs text-white/80 font-semibold">{day.label}</div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-1 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Thermometer className="w-4 h-4" /> Max: {day.max_temp}°C / Min: {day.min_temp}°C
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CloudSun className="w-4 h-4" /> {day.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="grid grid-cols-2 gap-3 mt-2 text-xs text-white/90">
                            <div className="flex items-center gap-2">
                                <Sun className="w-4 h-4 text-yellow-400" /> Sunrise: {sunrise}
                            </div>
                            <div className="flex items-center gap-2">
                                <Sun className="w-4 h-4 text-orange-400" /> Sunset: {sunset}
                            </div>
                            <div className="flex items-center gap-2">
                                <Moon className="w-4 h-4 text-indigo-400" /> Moonrise: {moonrise}
                            </div>
                            <div className="flex items-center gap-2">
                                <Moon className="w-4 h-4 text-purple-400" /> Moonset: {moonset}
                            </div>
                            <div className="flex items-center gap-2">
                                <Droplets className="w-4 h-4 text-sky-400" /> Morning Humidity: {humidity.morning}%
                            </div>
                            <div className="flex items-center gap-2">
                                <Droplets className="w-4 h-4 text-sky-300" /> Evening Humidity: {humidity.evening}
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
