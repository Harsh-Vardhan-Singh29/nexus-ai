export default function PlannerSkeleton() {

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

            {/* Stats */}

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

            {/* Action Bar */}

            <div
                className="
                    h-24
                    rounded-3xl
                    bg-slate-800
                "
            />

            {/* Timeline */}

            <div
                className="
                    h-96
                    rounded-3xl
                    bg-slate-800
                "
            />

            {/* AI Insight */}

            <div
                className="
                    h-72
                    rounded-3xl
                    bg-slate-800
                "
            />

        </div>

    );

}