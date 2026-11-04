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
                err instanceof Error
                    ? err.message
                    : 'An unknown error occurred'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }
    if (isEditing) {
        return (
            <form onSubmit={handleUpdateNote} className="flex flex-col gap-4">
                {error && <p className="text-red-500">{error}</p>}
                <div>
                    <label className="block mb-1 font-medium text-neutral-700">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full rounded-lg border border-gray-300 p-2"
                        maxLength={120}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-neutral-700">
                        Content
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Content"
                        className="w-full rounded-lg border border-gray-300 p-2"
                        rows={4}
                        maxLength={1000}
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded-lg bg-gray-300 px-4 py-2 text-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className="flex items-baseline justify-between gap-6 py-4 px-3 rounded-lg hover:bg-neutral-50 transition-colors">
            <div>
                <h3 className="font-medium text-neutral-900">{title}</h3>
                <p className="text-sm text-neutral-500 mt-1">
                    {text || 'No content'}
                </p>
            </div>
            <button
                onClick={() => setIsEditing(true)}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 shrink-0"
            >
                Edit
            </button>
        </div>
    )
}
