"use client"

import { useRouter } from "next/navigation"
import Button from "./Items/Button"
import LongUrlInput from "./Items/LongUrlInput"

export default function CustomInputForm({ className }: { className: string })
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

            <LongUrlInput />
            <div>
                
                <input placeholder="Custom Url" name="custom_url" className="rounded-lg mr-2 p-2 border border-base-05 "></input>
                <Button text="Shorten link"/>
            </div>
            
        </form>
    )
}