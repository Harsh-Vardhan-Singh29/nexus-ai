import { useEffect } from "react";

import PlannerHeader from "../components/planner/PlannerHeader";
import PlannerStats from "../components/planner/PlannerStats";
import PlannerTimeline from "../components/planner/PlannerTimeline";
import PlannerInsight from "../components/planner/PlannerInsight";
import PlannerActionBar from "../components/planner/PlannerActionBar";
import PlannerSkeleton from "../components/planner/PlannerSkeleton";
import PlannerRecommendation from "../components/planner/PlannerRecommendation";
import { usePlanner } from "../hooks/usePlanner";

export default function Planner() {

    const {

        loading,

        planner,

        generatePlan,

    } = usePlanner();

    useEffect(() => {

        generatePlan();

    }, []);

    if (loading) {

        return <PlannerSkeleton />;

    }

    return (

        <div className="space-y-8">

            <PlannerHeader />

            <PlannerStats planner={planner} />

            <PlannerRecommendation planner={planner} />

            <PlannerActionBar
                onGenerate={generatePlan}
            />

            <PlannerTimeline planner={planner} />

            <PlannerInsight planner={planner} />

        </div>

    );

}