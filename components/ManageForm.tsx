import { redirect } from "next/navigation"
import Button from "./Items/Button"

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
                required
                placeholder="Slug"
                name="slug"
                className="w-full rounded-lg px-3 py-3 text-base border border-base-07 font-normal"
            />

            <Button text="Manage" />
        </form>
    )
    
}