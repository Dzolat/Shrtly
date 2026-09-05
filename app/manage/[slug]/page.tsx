

import Output from "@/components/Output"
import { getUrl } from "@/lib/db"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Shortened({ params }: Props) {
    const { slug } = await params
    const longUrl = await getUrl(slug)

    if (longUrl == null || typeof longUrl != "string")
        return redirect("/")

    const info = {
        shortUrl: slug,
        longUrl: longUrl
    }

    return (
        <Output shortUrl={info.shortUrl} longUrl={info.longUrl} />
    )
}