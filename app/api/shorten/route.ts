import { postUrl } from "@/lib/db"
import { getShortUrl, validateShortUrl } from "@/lib/func"

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const longUrlValue = formData.get("long_url")
        const customUrlValue = formData.get("custom_url")

        if (typeof longUrlValue !== "string" || longUrlValue.trim() === "") {
            return Response.json(
                { error: "Please enter a URL." },
                { status: 400 },
            )
        }

        const longUrl = longUrlValue.trim()

        try {
            const parsedUrl = new URL(longUrl)

            if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
                return Response.json(
                    { error: "Only HTTP and HTTPS URLs are supported." },
                    { status: 400 },
                )
            }
        } catch {
            return Response.json(
                { error: "Please enter a valid URL." },
                { status: 400 },
            )
        }

        const customUrl =
            typeof customUrlValue === "string" ? customUrlValue.trim() : ""

        let shortUrl: string | null = null

        if (customUrl !== "") {
            if (!/^[A-Za-z0-9_-]{1,32}$/.test(customUrl)) {
                return Response.json(
                    {
                        error: "Custom slugs may only contain letters, numbers, underscores, and hyphens.",
                    },
                    { status: 400 },
                )
            }

            if (!(await validateShortUrl(customUrl))) {
                return Response.json(
                    { error: "That custom slug is already in use." },
                    { status: 409 },
                )
            }

            shortUrl = customUrl
        } else {
            for (let attempt = 0; attempt < 10; attempt++) {
                const candidate = getShortUrl()

                if (await validateShortUrl(candidate)) {
                    shortUrl = candidate
                    break
                }
            }
        }

        if (shortUrl === null) {
            return Response.json(
                { error: "Could not generate a unique short URL. Please try again." },
                { status: 503 },
            )
        }

        await postUrl(longUrl, shortUrl)

        return Response.json({
            shortUrl,
            longUrl,
        })
    } catch {
        return Response.json(
            { error: "Something went wrong while creating the short URL." },
            { status: 500 },
        )
    }
}
