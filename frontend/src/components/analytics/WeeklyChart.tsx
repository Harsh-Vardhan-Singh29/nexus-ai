interface Props {
    labels: string[];
    data: number[];
}

export default function WeeklyChart({
    labels,
    data,
}: Props) {

    const max = Math.max(...data, 1);

    return (

        <div
            className="
                rounded-3xl
                border
                border-slate-700
                bg-slate-900
                p-8
            "
        >

            <div className="mb-8">

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-white
                    "
                >
                    Weekly Productivity
                </h2>

                <p className="mt-2 text-slate-400">
                    Task completion trend over the last 7 days.
                </p>

            </div>

            <div
                className="
                    flex
                    h-72
                    items-end
                    justify-between
                    gap-4
                "
            >

                {data.map((value, index) => {

                    const height =
                        (value / max) * 220;

                    return (

                        <div
                            key={labels[index]}
                            className="
                                flex
                                flex-1
                                flex-col
                                items-center
                            "
                        >

                            <span
                                className="
                                    mb-3
                                    text-sm
                                    font-semibold
                                    text-cyan-400
                                "
                            >
                                {value}
                            </span>

                            <div
                                className="
                                    flex
                                    h-[220px]
                                    w-full
                                    items-end
                                "
                            >

                                <div
                                    style={{
                                        height,
                                    }}
                                    className="
                                        w-full
                                        rounded-t-2xl
                                        bg-gradient-to-t
                                        from-cyan-600
                                        to-blue-400
                                        transition-all
                                        duration-700
                                        hover:opacity-80
                                    "
                                />

                            </div>

                            <span
                                className="
                                    mt-4
                                    text-slate-400
                                "
                            >
                                {labels[index]}
                            </span>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}