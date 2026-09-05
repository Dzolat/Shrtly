"use client"

import { useRouter } from "next/navigation"

export default function InputForm({ className }: { className: string })
{
    const router = useRouter()


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const form = event.currentTarget
        const formData = new FormData(form)

        const response = await fetch("/api/shorten", {
            method: "POST",
            body: formData,
        })

        if (!response.ok) {
            return
        }

        const result = await response.json()

        const history = JSON.parse(
            localStorage.getItem("history") ?? "[]"
        )

        history.unshift({
            shortUrl: result.shortUrl,
            longUrl: result.longUrl,
        })

        localStorage.setItem("history", JSON.stringify(history))

        router.push(`/manage/${result.shortUrl}`)
    }

    return (
        <form onSubmit={handleSubmit} className={"p-5 bg-white rounded-2xl mx-auto w-full h-full " + className}>
            <p className="py-2 text-3xl font-semibold tracking-tight">Paste a long link here</p>

            <input
                placeholder="https://example.com/long_url"
                name="long_url"
                className="w-full rounded-lg px-3 py-3 text-base border border-base-07 font-normal"
            />

            <button type="submit" className="mt-4 p-2 rounded-lg btn text-white bg-blue-500 font-semibold text-base">
                Shorten link
            </button>
        </form>
    )
}