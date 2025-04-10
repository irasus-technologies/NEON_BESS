"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";

export function DateTimeBox() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const dateString = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
    });

    const timeString = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
    });

    return (
        <div className="rounded-lg border h-full text-white flex flex-col justify-center gap-2 p-1">
            <div className="flex items-center gap-2 text-sm text-primary-foreground">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <span className="font-medium text-white">{dateString}</span>
            </div>
            <div className="flex items-center gap-2 text-md font-mono font-semibold tracking-wide">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>{timeString}</span>
            </div>
        </div>
    );
}
