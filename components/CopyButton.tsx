"use client"

import { Clipboard, ClipboardCheck } from "lucide-react"
import { useState } from "react"

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        await navigator.clipboard.writeText(text)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1500)
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy short URL"
            className="border rounded-lg p-1"
        >
            {copied ? <ClipboardCheck /> : <Clipboard />}
        </button>
    )
}