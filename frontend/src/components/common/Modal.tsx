interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({
    open,
    onClose,
    children,
}: Props) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-slate-900 rounded-xl p-8 w-[500px] border border-slate-700 relative">

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>

                {children}

            </div>

        </div>

    );
}