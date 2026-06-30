import { useEffect, useState } from "react";
import {
    FaRobot,
    FaBell,
    FaPalette,
} from "react-icons/fa";

export default function Settings() {

    const [responseStyle, setResponseStyle] = useState(
        localStorage.getItem("responseStyle") || "Balanced"
    );

    const [aiMode, setAiMode] = useState(
        localStorage.getItem("aiMode") || "Student"
    );

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "Dark"
    );

    const [dailyBrief, setDailyBrief] = useState(
        localStorage.getItem("dailyBrief") !== "false"
    );

    const [plannerReminder, setPlannerReminder] =
        useState(
            localStorage.getItem("plannerReminder") !==
                "false"
        );

    const [aiRecommendation, setAiRecommendation] =
        useState(
            localStorage.getItem("aiRecommendation") !==
                "false"
        );

    const [overdueAlert, setOverdueAlert] =
        useState(
            localStorage.getItem("overdueAlert") !==
                "false"
        );

    const [workStart, setWorkStart] = useState(
          localStorage.getItem("workStart") || "09:00"
      );

      const [workEnd, setWorkEnd] = useState(
          localStorage.getItem("workEnd") || "18:00"
      );

      const [breakDuration, setBreakDuration] = useState(
          localStorage.getItem("breakDuration") || "30"
      );

      const [voiceEnabled, setVoiceEnabled] = useState(
          localStorage.getItem("voiceEnabled") !== "false"
      );

      const [wakeWord, setWakeWord] = useState(
          localStorage.getItem("wakeWord") || "NEXUS"
      );

      const [reminderMinutes, setReminderMinutes] = useState(
          localStorage.getItem("reminderMinutes") || "30"
      );

    useEffect(() => {

        localStorage.setItem(
            "responseStyle",
            responseStyle
        );

        localStorage.setItem(
            "aiMode",
            aiMode
        );

        localStorage.setItem(
            "theme",
            theme
        );

        localStorage.setItem(
            "dailyBrief",
            String(dailyBrief)
        );

        localStorage.setItem(
            "plannerReminder",
            String(plannerReminder)
        );

        localStorage.setItem(
            "aiRecommendation",
            String(aiRecommendation)
        );

        localStorage.setItem(
            "overdueAlert",
            String(overdueAlert)
        );

        localStorage.setItem("workStart", workStart);

        localStorage.setItem("workEnd", workEnd);

        localStorage.setItem("breakDuration", breakDuration);

        localStorage.setItem("reminderMinutes", reminderMinutes);

        localStorage.setItem(
            "voiceEnabled",
            String(voiceEnabled)
        );

        localStorage.setItem(
            "wakeWord",
            wakeWord
        );

    }, [
        responseStyle,
        aiMode,
        theme,
        dailyBrief,
        plannerReminder,
        aiRecommendation,
        overdueAlert,
        workStart,
        workEnd,
        breakDuration,
        voiceEnabled,
        wakeWord,
        reminderMinutes,
    ]);

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold text-white">

                    ⚙ Settings

                </h1>

                <p className="mt-2 text-slate-400">

                    Customize your NEXUS AI experience.

                </p>

            </div>

            {/* AI */}

            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

                <div className="mb-6 flex items-center gap-3">

                    <FaRobot className="text-cyan-400 text-2xl"/>

                    <h2 className="text-2xl font-bold text-white">

                        AI Preferences

                    </h2>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block text-slate-400">

                            Response Style

                        </label>

                        <select
                            title="AI Response Style"
                            aria-label="AI Response Style"
                            value={responseStyle}
                            onChange={(e)=>
                                setResponseStyle(
                                    e.target.value
                                )
                            }
                            className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        >

                            <option>Concise</option>
                            <option>Balanced</option>
                            <option>Detailed</option>

                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block text-slate-400">

                            AI Mode

                        </label>

                        <select
                            title="AI Mode"
                            aria-label="AI Mode"
                            value={aiMode}
                            onChange={(e)=>
                                setAiMode(
                                    e.target.value
                                )
                            }
                            className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        >

                            <option>Student</option>
                            <option>Professional</option>
                            <option>Creator</option>

                        </select>

                    </div>

                </div>

            </div>

            {/* Notifications */}

            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

                <div className="mb-6 flex items-center gap-3">

                    <FaBell className="text-yellow-400 text-2xl"/>

                    <h2 className="text-2xl font-bold text-white">

                        Notifications

                    </h2>

                </div>

                <div className="space-y-4">

                    <label className="flex justify-between text-white">

                        Daily Brief

                        <input
                            type="checkbox"
                            checked={dailyBrief}
                            onChange={(e)=>
                                setDailyBrief(
                                    e.target.checked
                                )
                            }
                        />

                    </label>

                    <label className="flex justify-between text-white">

                        Planner Reminder

                        <input
                            type="checkbox"
                            checked={plannerReminder}
                            onChange={(e)=>
                                setPlannerReminder(
                                    e.target.checked
                                )
                            }
                        />

                    </label>

                    <label className="flex justify-between text-white">

                        AI Recommendation

                        <input
                            type="checkbox"
                            checked={aiRecommendation}
                            onChange={(e)=>
                                setAiRecommendation(
                                    e.target.checked
                                )
                            }
                        />

                    </label>

                    <label className="flex justify-between text-white">

                        Overdue Alerts

                        <input
                            type="checkbox"
                            checked={overdueAlert}
                            onChange={(e)=>
                                setOverdueAlert(
                                    e.target.checked
                                )
                            }
                        />

                    </label>

                </div>

            </div>

            {/* Appearance */}

            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

                <div className="mb-6 flex items-center gap-3">

                    <FaPalette className="text-pink-400 text-2xl"/>

                    <h2 className="text-2xl font-bold text-white">

                        Appearance

                    </h2>

                </div>

                <select
                    title="Theme"
                    aria-label="Theme"
                    value={theme}
                    onChange={(e)=>
                        setTheme(
                            e.target.value
                        )
                    }
                    className="w-full rounded-xl bg-slate-800 p-3 text-white"
                >

                    <option>Dark</option>
                    <option>Light</option>
                    <option>System</option>

                </select>

            </div>

            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

                <h2 className="mb-6 text-2xl font-bold text-white">
                    📅 Planner Settings
                </h2>

                <div className="grid gap-6 md:grid-cols-3">

                    <div>

                        <label className="mb-2 block text-slate-400">
                            Work Start
                        </label>

                        <input
                            type="time"
                            value={workStart}
                            onChange={(e)=>setWorkStart(e.target.value)}
                            className="w-full rounded-xl bg-slate-800 p-3 text-white"
                            title="Work Start"
                            aria-label="Work Start"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-slate-400">
                            Work End
                        </label>

                        <input
                            type="time"
                            value={workEnd}
                            onChange={(e)=>setWorkEnd(e.target.value)}
                            className="w-full rounded-xl bg-slate-800 p-3 text-white"
                            title="Work End"
                            aria-label="Work End"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-slate-400">
                            Break (min)
                        </label>

                        <input
                            type="number"
                            value={breakDuration}
                            onChange={(e)=>setBreakDuration(e.target.value)}
                            className="w-full rounded-xl bg-slate-800 p-3 text-white"
                            title="Break Duration"
                            aria-label="Break Duration"
                        />

                    </div>

                </div>

            </div>

            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

              <h2 className="mb-6 text-2xl font-bold text-white">
                  🎤 Voice Assistant
              </h2>

              <label className="flex justify-between text-white">

                  Enable Voice

                  <input
                      type="checkbox"
                      checked={voiceEnabled}
                      onChange={(e)=>setVoiceEnabled(e.target.checked)}
                  />

              </label>

              <div className="mt-6">

                  <label className="mb-2 block text-slate-400">
                      Wake Word
                  </label>

                  <input
                      value={wakeWord}
                      onChange={(e)=>setWakeWord(e.target.value)}
                      className="w-full rounded-xl bg-slate-800 p-3 text-white"
                      title="Wake Word"
                      aria-label="Wake Word"
                  />

              </div>

          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

              <h2 className="mb-6 text-2xl font-bold text-white">

                  💾 Data

              </h2>

              <div className="flex flex-wrap gap-4">

                  <button className="rounded-xl bg-cyan-600 px-5 py-3 text-white hover:bg-cyan-700">

                      Export Tasks

                  </button>

                  <button className="rounded-xl bg-purple-600 px-5 py-3 text-white hover:bg-purple-700">

                      Export Analytics

                  </button>

                  <button
                      onClick={()=>{
                          localStorage.clear();
                          window.location.reload();
                      }}
                      className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                  >

                      Reset Settings

                  </button>

              </div>

          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

                <h2 className="text-2xl font-bold text-white">

                    ℹ About NEXUS AI

                </h2>

                <div className="mt-6 space-y-2 text-slate-300">

                    <p>Version: 1.0</p>

                    <p>Edition: Hackathon Build</p>

                    <p>Frontend: React + TypeScript</p>

                    <p>Backend: FastAPI</p>

                    <p>AI: Google AI Studio</p>

                    <p>Database: Supabase</p>

                </div>

            </div>

            <div className="rounded-3xl border border-green-500/30 bg-green-500/10 p-6">

              <h2 className="text-2xl font-bold text-green-400">

                  🟢 System Status

              </h2>

              <div className="mt-4 grid gap-3 md:grid-cols-2">

                  <p>✅ AI Connected</p>

                  <p>✅ Planner Ready</p>

                  <p>✅ Analytics Ready</p>

                  <p>✅ Calendar Ready</p>

              </div>

              <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

                  <h2 className="mb-6 text-2xl font-bold text-white">
                      🔔 Reminder Settings
                  </h2>

                  <label className="mb-2 block text-slate-400">
                      Notify Before Deadline
                  </label>

                  <select
                      title="Reminder Time"
                      aria-label="Reminder Time"
                      value={reminderMinutes}
                      onChange={(e) =>
                          setReminderMinutes(e.target.value)
                      }
                      className="w-full rounded-xl bg-slate-800 p-3 text-white"
                  >
                      <option value="15">15 Minutes</option>
                      <option value="30">30 Minutes</option>
                      <option value="60">1 Hour</option>
                      <option value="120">2 Hours</option>
                  </select>

              </div>

          </div>

        </div>

    );

}