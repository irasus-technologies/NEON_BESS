import { Leaf } from "lucide-react";

export function CO2SavedBox() {
    const demoCO2Value = 24.3; // in tons

    return (
        <div className="rounded-lg border p-1 flex flex-col justify-center h-full text-white">
            <div className="flex items-center gap-2 text-xs text-green-300 font-semibold uppercase mb-1 tracking-wide">
                <Leaf className="w-4 h-4 text-green-400" />
                CO₂ Saved
            </div>
            <div className="text-xl font-bold tracking-tight text-white leading-tight">
                {demoCO2Value.toFixed(1)} <span className="text-xl font-medium text-green-300">tons</span>
            </div>
            <div className="text-xs text-white/60 mt-1">
                Compared to baseline usage
            </div>
        </div>
    );
}
