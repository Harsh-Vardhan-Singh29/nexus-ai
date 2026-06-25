import Skeleton from "../common/Skeleton";

export default function DashboardSkeleton() {
    return (
        <div className="space-y-8">

            {/* Hero */}

            <Skeleton className="h-56 w-full rounded-3xl" />

            {/* Stats */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

                {[...Array(5)].map((_, index) => (

                    <Skeleton
                        key={index}
                        className="h-36"
                    />

                ))}

            </div>

            {/* Chart + AI */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                <Skeleton className="h-96 xl:col-span-2" />

                <Skeleton className="h-96" />

            </div>

            {/* Recent Tasks */}

            <Skeleton className="h-80" />

            {/* Quick Actions */}

            <Skeleton className="h-52" />

        </div>
    );
}