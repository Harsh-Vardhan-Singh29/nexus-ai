import CalendarView from "../components/calendar/CalendarView";

export default function Calendar() {
    return (
        <div className="page-enter space-y-8">

            {/* Header */}

            <div>

                <h1 className="text-4xl font-bold text-white">
                    📅 AI Calendar
                </h1>

                <p className="mt-3 text-lg text-slate-400">
                    Plan your schedule, track deadlines, and let NEXUS AI
                    recommend the best task to work on every day.
                </p>

            </div>

            {/* Calendar */}

            <CalendarView />

        </div>
    );
}