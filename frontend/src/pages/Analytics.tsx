import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsCards from "../components/analytics/AnalyticsCards";
import ProductivityScore from "../components/analytics/ProductivityScore";
import WeeklyChart from "../components/analytics/WeeklyChart";
import AIInsights from "../components/analytics/AIInsights";
import StreakCard from "../components/analytics/StreakCard";
import AnalyticsSkeleton from "../components/analytics/AnalyticsSkeleton";

import { useAnalytics } from "../hooks/useAnalytics";

export default function Analytics() {

    const {

        analytics,

        loading,

        error,

        refreshAnalytics,

    } = useAnalytics();

    if (loading) {

        return <AnalyticsSkeleton />;

    }

    if (error) {

        return (

            <div
                className="
                    flex
                    h-[70vh]
                    flex-col
                    items-center
                    justify-center
                    gap-6
                "
            >

                <h2
                    className="
                        text-3xl
                        font-bold
                        text-red-400
                    "
                >

                    Failed to load Analytics

                </h2>

                <p className="text-slate-400">

                    {error}

                </p>

                <button
                    onClick={refreshAnalytics}
                    className="
                        rounded-xl
                        bg-cyan-600
                        px-6
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-cyan-500
                    "
                >

                    Retry

                </button>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Header */}

            <AnalyticsHeader
            
              currentStreak={analytics.streak.current}
              longestStreak={analytics.streak.longest}
            />

            {/* Overview */}

            <AnalyticsCards
                analytics={analytics.summary}
            />

            {/* Main Analytics */}

            <div
                className="
                    grid
                    gap-8
                    xl:grid-cols-2
                "
            >

                <ProductivityScore
                    score={
                        analytics.summary.productivity_score
                    }
                />

                <WeeklyChart
                    labels={
                        analytics.weekly.labels
                    }
                    data={
                        analytics.weekly.values
                    }
                />

            </div>

            {/* Bottom */}

            <div
                className="
                    grid
                    gap-8
                    xl:grid-cols-2
                "
            >

                <StreakCard
                    currentStreak={
                        analytics.streak.current
                    }
                    longestStreak={
                        analytics.streak.longest
                    }
                />

                <AIInsights
                    insights={analytics.insights}
                    recommendations={analytics.recommendations}
                />

            </div>

        </div>

    );

}