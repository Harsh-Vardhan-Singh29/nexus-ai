export default function AnalyticsSkeleton() {

    return (

        <div className="space-y-8 animate-pulse">

            {/* Header */}

            <div
                className="
                    h-40
                    rounded-3xl
                    bg-slate-800
                "
            />

            {/* Cards */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {[...Array(4)].map((_, index) => (

                    <div
                        key={index}
                        className="
                            h-40
                            rounded-3xl
                            bg-slate-800
                        "
                    />

                ))}

            </div>

            {/* Charts */}

            <div className="grid gap-6 lg:grid-cols-2">

                <div
                    className="
                        h-[420px]
                        rounded-3xl
                        bg-slate-800
                    "
                />

                <div
                    className="
                        h-[420px]
                        rounded-3xl
                        bg-slate-800
                    "
                />

            </div>

            {/* Bottom */}

            <div className="grid gap-6 lg:grid-cols-2">

                <div
                    className="
                        h-[360px]
                        rounded-3xl
                        bg-slate-800
                    "
                />

                <div
                    className="
                        h-[360px]
                        rounded-3xl
                        bg-slate-800
                    "
                />

            </div>

        </div>

    );

}