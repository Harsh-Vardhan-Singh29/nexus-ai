import {
    Wand2,
    RotateCw,
    Save,
    FileDown,
} from "lucide-react";

interface Props {
    onGenerate: () => void;
}

export default function PlannerActionBar({
    onGenerate,
}: Props) {

    return (

        <div
            className="
                flex
                flex-wrap
                gap-4
                rounded-3xl
                border
                border-slate-700
                bg-slate-900
                p-6
            "
        >

            {/* Generate */}

            <button
                onClick={onGenerate}
                className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    px-6
                    py-3
                    font-semibold
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:scale-105
                "
            >

                <Wand2 size={20} />

                Generate Plan

            </button>

            {/* Regenerate */}

            <button
                disabled
                className="
                    flex
                    cursor-not-allowed
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-700
                    bg-slate-800
                    px-6
                    py-3
                    text-slate-500
                "
            >

                <RotateCw size={20} />

                Regenerate

            </button>

            {/* Save */}

            <button
                disabled
                className="
                    flex
                    cursor-not-allowed
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-700
                    bg-slate-800
                    px-6
                    py-3
                    text-slate-500
                "
            >

                <Save size={20} />

                Save Plan

            </button>

            {/* Export */}

            <button
                disabled
                className="
                    flex
                    cursor-not-allowed
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-700
                    bg-slate-800
                    px-6
                    py-3
                    text-slate-500
                "
            >

                <FileDown size={20} />

                Export PDF

            </button>

        </div>

    );

}