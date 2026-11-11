'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface EditNoteProps {
    id: string
    initialTitle: string
    initialText?: string
}

export default function EditNote({
    id,
    initialTitle,
    initialText
}: EditNoteProps) {
    const [title, setTitle] = useState(initialTitle)
    const [text, setText] = useState(initialText || '')
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    const handleCancel = () => {
        setTitle(initialTitle)
        setText(initialText || '')
        setError(null)
        setIsEditing(false)
    }

    const handleUpdateNote = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(`/api/notes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, text })
            })

            if (!res.ok) {
                const data = await res.json().catch(() => null)
                throw new Error(data.message || 'Failed to update note')
            }

            setIsEditing(false)
            router.refresh()
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : 'An unknown error occurred'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {isEditing ? (
                <form
                    onSubmit={handleUpdateNote}
                    className="flex flex-col gap-6"
                >
                    {error && <p className="text-red-500">{error}</p>}
                    <div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full text-4xl sm:text-5xl font-normal bg-transparent border-b border-neutral-300 pb-3 focus:outline-none focus:border-neutral-800 transition-colors placeholder:text-neutral-300 text-neutral-900"
                            maxLength={120}
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Write whats on your mind..."
                            className="w-full bg-transparent border border-neutral-200 rounded-lg p-4 font-sans text-neutral-700 text-base leading-relaxed focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-400 resize-y"
                            rows={4}
                            maxLength={2000}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="rounded-full px-5 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div>
                    <div>
                        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-neutral-900 tracking-tight mb-8">
                            {title}
                        </h1>
                        <div className="space-y-4">
                            <p className=" text-neutral-700 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                                {text || 'No content'}
                            </p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
