export default function InputForm()
{
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="p-5 bg-white rounded-2xl mx-auto w-full max-w-[800px]">
                <p className="py-2 text-3xl font-semibold tracking-tight">Paste a long link here</p>

                <input
                    placeholder="https://example.com/long_url"
                    className="w-full rounded-lg px-3 py-3 text-base border border-base-07 font-normal"
                />

                <button className="mt-4 p-2 rounded-lg btn text-white bg-blue-500 font-semibold text-base">
                    Shorten link
                </button>
            </form>
        </div>
    )
}