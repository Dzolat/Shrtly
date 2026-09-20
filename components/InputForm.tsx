"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Button from "./Items/Button"

export default function InputForm({ className }: { className: string })
{
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const form = event.currentTarget
        const formData = new FormData(form)
        setError(null)

        try {
            const response = await fetch("/api/shorten", {
                method: "POST",
                body: formData,
            })

            const result = await response.json()

            if (!response.ok) {
                setError(result.error ?? "Something went wrong.")
                return
            }

            const history = JSON.parse(
                localStorage.getItem("history") ?? "[]"
            )

            history.unshift({
                shortUrl: result.shortUrl,
                longUrl: result.longUrl,
            })

            localStorage.setItem("history", JSON.stringify(history))

            router.push(`/manage/${result.shortUrl}`)
        } catch {
            setError("Could not connect to the server. Please try again.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"p-5 bg-white rounded-2xl mx-auto w-full h-full " + className}>
            <p className="py-2 text-3xl font-semibold tracking-tight">Paste a long link here</p>

        <input placeholder="https://example.com/long_url" name="long_url" className="w-full rounded-lg px-3 py-3 text-base border border-base-07 font-normal"/>
            <Button text="Shorten Link" />
            
            {error && <p role="alert" aria-live="polite" className="mt-3 text-sm text-red-600">{error}</p>}
        </form>
        
    )
}
