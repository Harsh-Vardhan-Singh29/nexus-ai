import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
    content: string;
}

export default function MarkdownMessage({
    content,
}: Props) {
    return (
        <article
            className="
                prose
                prose-invert
                max-w-none

                prose-headings:font-bold
                prose-headings:text-white

                prose-h1:text-3xl
                prose-h2:text-2xl
                prose-h3:text-xl

                prose-p:text-slate-300
                prose-p:leading-8

                prose-strong:text-white
                prose-em:text-cyan-300

                prose-a:text-cyan-400
                prose-a:no-underline
                hover:prose-a:underline

                prose-li:text-slate-300
                prose-ul:my-5
                prose-ol:my-5

                prose-blockquote:border-cyan-500
                prose-blockquote:text-slate-400

                prose-hr:border-slate-700

                prose-table:border-collapse
                prose-th:border
                prose-th:border-slate-700
                prose-th:bg-slate-900
                prose-th:p-3

                prose-td:border
                prose-td:border-slate-700
                prose-td:p-3

                prose-pre:border
                prose-pre:border-slate-700
                prose-pre:bg-slate-950
                prose-pre:rounded-xl
                prose-pre:p-5

                prose-code:text-cyan-400
                prose-code:font-semibold

                prose-img:rounded-xl
                prose-img:shadow-xl
            "
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}