import { getUrl } from "@/lib/db"
import { notFound, redirect } from "next/navigation"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> })
{
    const { slug } = await params
    const longUrl = await getUrl(slug)
    console.log(longUrl)

    if (longUrl == null || typeof longUrl != "string")
        return notFound()
    return redirect(longUrl)
}