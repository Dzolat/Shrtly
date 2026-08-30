"use server"

import { postUrl } from "@/lib/db"
import { getShortUrl } from "@/lib/func"

export async function POST(request: Request) {
    const formData = await request.formData()

    const longUrl = formData.get("long_url")

    // check if url exists
    if (!longUrl || typeof longUrl != "string")
    {
        return Response.json("you need a url.")
    }

    const shortUrl = getShortUrl()

    postUrl(longUrl, shortUrl)

    return Response.json({
        message: "Test"
    })
}