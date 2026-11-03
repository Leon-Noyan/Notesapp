import Link from 'next/link'
interface ListFeatureProps {
    title: string
    previewText: string
    id: string
}

export function ListFeature({ title, previewText, id }: ListFeatureProps) {
    return (
        <Link href={`/notes/${id}`} className="group">
            <div className=" group flex cursor-pointer items-baseline justify-between gap-6 py-4 px-3 transition-colors hover:bg-neutral-50 rounded-lg">
                <h3 className="shrink-0 font-medium text-neutral-900 group-hover:text-neutral-700">
                    {title}
                </h3>
                <p className="flex-1 truncate text-right text-sm text-neutral-500 ">
                    {previewText}
                </p>
            </div>
        </Link>
    )
}
