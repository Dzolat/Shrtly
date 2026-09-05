"use server"

import { postUrl } from "@/lib/db"
import { getShortUrl, validateShortUrl } from "@/lib/func"

export async function POST(request: Request) {
    const formData = await request.formData()
    const longUrl = formData.get("long_url")

    // check if url exists
    if (!longUrl || typeof longUrl != "string")
    {
        return Response.json("you need a url.")
    }

    let shortUrl = ""
    do {
        shortUrl = getShortUrl()
    } while (!await validateShortUrl(shortUrl))

    await postUrl(longUrl, shortUrl)

    return Response.json({
    shortUrl,
    longUrl,
    })
}