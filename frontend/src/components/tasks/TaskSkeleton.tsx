import Skeleton from "../common/Skeleton";

export default function TaskSkeleton() {
    return (
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

            <Skeleton className="h-8 w-52" />

            <Skeleton className="mt-4 h-5 w-full" />

            <Skeleton className="mt-2 h-5 w-4/5" />

            <div className="mt-6 flex gap-3">

                <Skeleton className="h-8 w-24 rounded-full" />

                <Skeleton className="h-8 w-28 rounded-full" />

            </div>

            <div className="mt-8 flex gap-3">

                <Skeleton className="h-10 w-28" />

                <Skeleton className="h-10 w-28" />

            </div>

        </div>
    );
}