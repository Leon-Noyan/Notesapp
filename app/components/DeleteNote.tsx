'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DeleteNoteProps {
  id: string
}

export default function DeleteNote({ id }: DeleteNoteProps) {
    const [isdeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDeleteNote = async () => {

        setIsDeleting(true)
        try {
            const res = await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                router.push('/')
                router.refresh()
            } else {
              console.log('Failed to delete note!')
            }
        } catch (error) {
            console.error('Error deleting note:', error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <button
            onClick={handleDeleteNote}
            disabled={isdeleting}
            className="rounded-xl bg-red-800 p-1.5 m-1 text-white cursor-pointer"
        >
            {isdeleting ? 'Deleting...' : 'Delete'}
        </button>
    )
}
