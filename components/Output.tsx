import { headers } from "next/headers";
import CopyButton from "./CopyButton";
import Image from "next/image";
import { getAnalytics } from "@/lib/db";

type OutputProps = {
    shortUrl: string,
    longUrl: string
}

export default async function Output({ shortUrl, longUrl }: OutputProps) {
    const headerList = await headers();
    const qrSize = 150;

    const host = headerList.get("host");
    const protocol =
        headerList.get("x-forwarded-proto") ??
        (host?.startsWith("localhost") ? "http" : "https");

    const origin = `${protocol}://${host}/s/${shortUrl}`;
    longUrl = (longUrl.length <= 50) ? longUrl : longUrl.substring(0, 50) + "..."

    const analytics = await getAnalytics(shortUrl)
    if (analytics == null)
        return

    // the css of this file was written with ai
    return (
        
        <div className="grid grid-cols-2 gap-5 p-3 grid-rows-2 w-full min-h-screen">
            <div className="p-5 bg-white rounded-2xl mx-auto w-full border border-neutral-200 shadow-sm">
                <p className="py-2 text-3xl font-semibold tracking-tight">
                    Old URL
                </p>

                <div className="justify-between items-center flex gap-5 border p-2 rounded-lg">
                    <p className="truncate">
                        {longUrl}
                    </p>
                    
                </div>

                <p className="mt-10 py-2 text-3xl font-semibold tracking-tight">
                    New URL
                </p>

                <div className="justify-between items-center flex gap-5 border p-2 rounded-lg">
                    <p className="truncate">
                        {origin}
                    </p>

                    <CopyButton text={origin} />
                </div>
            </div>

            <div className="p-5 bg-white rounded-2xl mx-auto w-full max-w-[800px] border border-neutral-200 shadow-sm">
                <p className="py-2 text-3xl font-semibold tracking-tight">
                    QR Code
                </p>

                <div className="flex justify-center items-center pt-3">
                    <Image
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(origin)}`}
                        alt="QR code"
                        width={qrSize}
                        height={qrSize}
                        className="rounded-sm"
                    />
                </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                <p className="text-3xl font-semibold mb-5">
                    Statistics
                </p>

                <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                        <span>Total clicks</span>
                        <span className="font-semibold">{analytics.clicks}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span>Last visited</span>
                        <span className="font-semibold">{analytics.last_visited && analytics.last_visited.toLocaleString() || "Never"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Created at</span>
                        <span className="font-semibold">{analytics.timestamp.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}   