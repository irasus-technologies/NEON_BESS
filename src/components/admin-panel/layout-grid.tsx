import LineChart from "../charts/line-chart";
import PieChart from "../charts/pie-chart";
import SolarForecastChart from "../charts/SolarForecastChart";
import BatteryOverviewSection from "../demo/BatteryOverviewSection";
import { CO2SavedBox } from "../demo/CO2SavedBox";
import { DateTimeBox } from "../demo/DateTimeBox";
import LastUpdated from "../demo/LastUpdated";
import ImageCard from "../demo/Logo";
import SavingsAndRevenueSection from "../demo/SavingsAndRevenueSection";
import SelfSufficiencySection from "../demo/SelfSufficiencySection";
import StatusOverviewSection from "../demo/StatusOverviewSection";
import { WeatherBox } from "../demo/WeatherBox";



export default function LayoutGrid() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-8 gap-4 py-4 min-h-screen">
                {/* Section 1 - 2 columns */}
                <section className="md:col-span-2 grid grid-rows-8 gap-2">
                    <div className="row-span-1 rounded-lg border p-1">
                        <ImageCard src="/neonbg.png" alt="Neon" priority />
                    </div>
                    <div className="row-span-5  rounded-lg border p-4">
                        <div className="h-full w-full">
                            <PieChart />
                        </div>
                    </div>
                    <div className="row-span-4  rounded-lg border p-4">
                        <div className="h-full w-full">
                            <LineChart />
                        </div>
                    </div>

                </section>

                {/* Section 2 - 3 columns */}
                <section className="md:col-span-3 grid grid-rows-8 gap-2">
                    {/* First Row: Split into 3 equal parts */}
                    <div className="row-span-1 grid grid-cols-3 gap-2">
                        <div className="rounded-lg border p-1">
                            <DateTimeBox />
                        </div>
                        <div className="rounded-lg border p-1">
                            <WeatherBox />
                        </div>
                        <div className="rounded-lg border p-1">
                            <CO2SavedBox />
                        </div>
                    </div>

                    {/* Second Row: 2 row spans */}
                    <div className="row-span-2 rounded-lg border p-1">
                        <StatusOverviewSection />
                    </div>

                    {/* Third Row: 5 row spans */}
                    <div className="row-span-3 bg-primary/30 rounded-lg border p-4">
                    </div>
                    <div className="row-span-3 rounded-lg border p-1">
                        <SolarForecastChart />
                    </div>
                </section>

                {/* Section 3 - 3 columns */}
                <section className="md:col-span-3 grid grid-rows-8 gap-2">
                    <div className="row-span-2 rounded-lg border p-1">
                        <SavingsAndRevenueSection />
                    </div>
                    <div className="row-span-3 rounded-lg border p-1">
                        <SelfSufficiencySection />
                    </div>
                    <div className="row-span-3 rounded-lg border p-1">
                        <BatteryOverviewSection />
                    </div>
                </section>
            </div>
            <div className="text-white justify-end text-end"><LastUpdated /></div>
        </>
    );
}