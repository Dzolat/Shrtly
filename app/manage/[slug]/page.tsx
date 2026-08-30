import Output from "@/components/Output"
import { getUrl } from "@/lib/db"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Shortened({ params }: Props) {
    const { slug } = await params
    const newUrl = await getUrl(slug)

    if (newUrl == null || typeof newUrl != "string")
        return redirect("/")

    const info = {
        oldUrl: slug,
        newUrl: newUrl
    }

    return (
        <Output oldUrl={info.oldUrl} newUrl={info.newUrl} />
    )
}