"use client";

export default function LastUpdated({ updatedAt }: { updatedAt?: Date }) {
    const now = new Date();
    const fallbackTime = new Date(now.getTime() - 15 * 60 * 1000); // 15 mins ago
    const time = updatedAt ?? fallbackTime;

    const formatted = time.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <p className="text-sm text-muted-foreground font-light italic">
            Last updated: {formatted}
        </p>
    );
}
