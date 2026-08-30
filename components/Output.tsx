import { headers } from "next/headers";

type OutputProps = {
    oldUrl: string,
    newUrl: string
}

export default async function Output({ oldUrl, newUrl }: OutputProps) {
    const headerList = await headers();

    const host = headerList.get("host");
    const protocol = headerList.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");

    const origin = `${protocol}://${host}/s/${oldUrl}`;
 
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-5 bg-white rounded-2xl mx-auto w-full max-w-[800px]">
                <p className="py-2 text-3xl font-semibold tracking-tight">Old URL</p>
                <p>{newUrl}</p>

                <p className="py-2 text-3xl font-semibold tracking-tight">New URL</p>
                <p>{origin}</p>
            </div>
        </div>
    )
}