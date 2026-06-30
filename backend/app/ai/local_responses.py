from datetime import datetime


class LocalResponses:

    @staticmethod
    def planner(context: dict) -> str:

        return f"""# 🗓 AI Planner

## 🎯 Today's Mission

**{context['priority_task']}**

This is the highest-priority task based on your workload, task importance, and current progress.

---

## 📅 Today's Schedule

• Pending Tasks: **{context['pending']}**

• Completed Tasks: **{context['completed']}**

• Workload: **{context['workload']}**

• Estimated Finish: **{context['estimated_finish']}**

---

## 💡 Recommendations

• Start with your highest-priority task.

• Work in focused 45-minute sessions.

• Minimize context switching until the priority task is complete.

---

## 🚀 Next Action

Begin working on **{context['priority_task']}** now.
"""

    @staticmethod
    def recommendation(context: dict) -> str:

        return f"""# 🎯 Decision Analysis

## Highest Priority

**{context['priority_task']}**

---

## Confidence

**{context['confidence']}%**

---

## Why this task?

This task currently has the highest decision score and provides the greatest productivity impact.

---

## Risk

Delay Risk: **{context['delay_risk']}**

Burnout Risk: **{context['burnout_risk']}**

---

## Next Best Task

**{context['next_best_task'] or 'None'}**

---

## Recommendation

Complete **{context['priority_task']}** before switching to another activity.
"""

    @staticmethod
    def productivity(context: dict) -> str:

        return f"""# 📈 Productivity Report

## Current Performance

• Productivity: **{context['productivity']}%**

• Daily Progress: **{context['daily_progress']}%**

• Focus Score: **{context['focus_score']}**

• Momentum: **{context['momentum_score']}**

• Energy: **{context['energy_state']}**

---

## Remaining Work

**{context['remaining_minutes']} minutes**

Estimated Finish:

**{context['estimated_finish']}**

---

## Risks

Delay Risk: **{context['delay_risk']}**

Burnout Risk: **{context['burnout_risk']}**

---

## Recommendation

Maintain focus and continue working on **{context['priority_task']}**.
"""

    @staticmethod
    def workflow(context: dict) -> str:

        return f"""# 🚀 Workflow Coach

## Current Situation

Workload: **{context['workload']}**

Remaining Work:

**{context['remaining_minutes']} minutes**

---

## Optimization Strategy

1. Finish the highest-priority task.

2. Avoid multitasking.

3. Take a short break at

**{context['recommended_break']}**

---

## Success Probability

**{context['completion_probability']}%**

---

## Recommended Next Step

Continue with **{context['priority_task']}**.
"""

    @staticmethod
    def general(context: dict) -> str:

        hour = datetime.now().hour

        if hour < 12:
            greeting = "Good Morning"

        elif hour < 17:
            greeting = "Good Afternoon"

        else:
            greeting = "Good Evening"

        return f"""# 👋 {greeting}

I'm currently operating in **Local Intelligence Mode**.

Gemini is unavailable, but I can still help you manage your productivity.

---

## Current Status

🎯 Priority Task

**{context['priority_task']}**

📦 Workload

**{context['workload']}**

📈 Productivity

**{context['productivity']}%**

⚡ Focus

**{context['focus_score']}**

---

Ask me about:

• Planning your day

• Productivity

• Recommendations

• Workflow optimization

I'll continue assisting using local intelligence.
"""