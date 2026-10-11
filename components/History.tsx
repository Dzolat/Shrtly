

import Link from "next/link"

export type HistoryItem = {
    name: string,
    link: string
}

export default function InputForm({ className, history }: { className: string, history: HistoryItem[] })
{

        // the css of this file was written with ai

    return (
        <div className={"p-5 bg-white rounded-2xl mx-auto w-full h-full " + className}>
            <p className="py-2 text-3xl font-semibold tracking-tight">History</p>

            <ul className="flex flex-col">
                {history.map((item) => (
                    <Link className="hover:underline" key={item.name} href={`/manage/${item.name}`}>{item.name}</Link>
                ))}
            </ul>
        </div>
    )
}