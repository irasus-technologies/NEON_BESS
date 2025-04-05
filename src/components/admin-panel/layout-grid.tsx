export default function LayoutGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 py-4 min-h-screen">
            {/* Section 1 - 2 columns */}
            <section className="md:col-span-2 grid grid-rows-8 gap-2">
                <div className="row-span-1 bg-primary/10 rounded-lg border p-4">
                </div>
                <div className="row-span-3 bg-primary/20 rounded-lg border p-4">
                </div>
                <div className="row-span-4 bg-primary/30 rounded-lg border p-4">
                </div>
            </section>

            {/* Section 2 - 3 columns */}
            <section className="md:col-span-3 grid grid-rows-8 gap-2">
                {/* First Row: Split into 3 equal parts */}
                <div className="row-span-1 grid grid-cols-3 gap-2">
                    <div className="bg-primary/10 rounded-lg border p-4">
                    </div>
                    <div className="bg-primary/20 rounded-lg border p-4">
                    </div>
                    <div className="bg-primary/30 rounded-lg border p-4">
                    </div>
                </div>

                {/* Second Row: 2 row spans */}
                <div className="row-span-2 bg-primary/20 rounded-lg border p-4">
                </div>

                {/* Third Row: 5 row spans */}
                <div className="row-span-5 bg-primary/30 rounded-lg border p-4">
                </div>
            </section>

            {/* Section 3 - 3 columns */}
            <section className="md:col-span-3 grid grid-rows-8 gap-2">
                <div className="row-span-2 bg-primary/10 rounded-lg border p-4">
                </div>
                <div className="row-span-3 bg-primary/20 rounded-lg border p-4">
                </div>
                <div className="row-span-3 bg-primary/30 rounded-lg border p-4">
                </div>
            </section>
        </div>
    );
}