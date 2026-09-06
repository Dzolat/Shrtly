export default function Button({text} : { text: string })
{
    return (
        <button type="submit" className="mt-4 cursor-pointer rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white transition duration-150 hover:bg-blue-700 active:scale-[0.98]">
            {text}
        </button>
    )
}