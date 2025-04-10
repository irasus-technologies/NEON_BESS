"use client";

import { useEffect, useState } from "react";
import { CloudSun, Zap, Sun } from "lucide-react";
import { WeatherDetailsModal } from "./WeatherDetailsModal";

export interface ForecastDay {
    date: string;
    min_temp: string;
    max_temp: string;
    description: string;
}

interface WeatherData {
    city: string;
    weather: {
        current: {
            temperature: {
                max: {
                    value: string;
                    departure: string;
                };
                min: {
                    value: string;
                    departure: string;
                };
            };
            rainfall: string | null;
            humidity: {
                morning: string;
                evening: string;
            };
        };
        astronomical: {
            sunset: string;
            sunrise: string;
            moonset: string;
            moonrise: string;
        };
        forecast: ForecastDay[];
    };
}


const iconForDescription = (description: string) => {
    if (description.toLowerCase().includes("thunder")) return <Zap className="w-4 h-4 text-white" />;
    if (description.toLowerCase().includes("cloud")) return <CloudSun className="w-4 h-4 text-white" />;
    return <Sun className="w-6 h-6 text-white" />;
};

export function WeatherBox() {
    const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
    const [astronomy, setAstronomy] = useState<{
        sunset: string;
        sunrise: string;
        moonrise: string;
        moonset: string;
    } | null>(null);
    const [humidity, setHumidity] = useState<{ morning: string; evening: string } | null>(null);
    const [city, setCity] = useState<string>("Delhi");
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch("https://weather.indianapi.in/india/weather?city=Delhi", {
                    headers: {
                        "x-api-key": "sk-live-B0UiHPhuSlJmFpNasENrMN68zKhTkxlVmcCAVlwJ",
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch");

                const data: WeatherData = await response.json();
                setCity(data.city);
                setForecast(data.weather.forecast.slice(0, 2));
                setAstronomy(data.weather.astronomical);
                setHumidity(data.weather.current.humidity);
            } catch (err) {
                console.error(err);
            }
        };

        fetchWeather();
    }, []);

    if (!forecast || !astronomy || !humidity) return null;

    return (
        <>
            <div
                className="text-white rounded-lg border p-1 h-full flex flex-col justify-center gap-1 cursor-pointer"
                onClick={() => setModalOpen(true)}
            >
                {forecast.map((day, idx) => (
                    <div key={idx} className="flex items-center justify-between p-1 rounded-md">
                        <div className="flex flex-col">
                            <span className="text-[0.7rem] font-semibold text-white/80 uppercase">
                                {idx === 0 ? "Today" : "Tomorrow"}
                            </span>
                            <span className="text-sm font-bold mt-1">
                                {parseFloat(day.max_temp).toFixed(0)}°C
                            </span>
                        </div>
                        <div className="flex flex-col justify-end items-end text-xs font-semibold">
                            {iconForDescription(day.description)}
                        </div>
                    </div>
                ))}
            </div>

            <WeatherDetailsModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                today={forecast[0]}
                tomorrow={forecast[1]}
                city={city}
                sunrise={astronomy.sunrise}
                sunset={astronomy.sunset}
                moonrise={astronomy.moonrise}
                moonset={astronomy.moonset}
                humidity={humidity}
            />
        </>
    );
}