import { redirect } from "next/navigation"

export default function ManageForm({ className }: { className: string })
{
    async function redirectManage(formData: FormData)
    {
        const slug = formData.get("slug")
        redirect(`/manage/${slug}`)
    }

    return (
        <form action={redirectManage} className={"p-5 bg-white rounded-2xl mx-auto w-full h-full " + className}>
            <p className="py-2 text-3xl font-semibold tracking-tight">Paste a slug here</p>

            <input
                placeholder="Slug"
                name="slug"
                className="w-full rounded-lg px-3 py-3 text-base border border-base-07 font-normal"
            />

            <button type="submit" id="manage" className="mt-4 p-2 rounded-lg btn text-white bg-blue-500 font-semibold text-base">
                Shorten link
            </button>
        </form>
    )
    
}