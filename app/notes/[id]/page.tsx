import { connectDB } from '@/lib/mongodb'
import DeleteNote from '../../components/DeleteNote'
import Note, { INote } from '@/models/Notes'
import { notFound } from 'next/navigation'
import EditNote from '@/app/components/EditNote'
import Link from 'next/link'

interface NotePageProps {
    params: Promise<{ id: string }>
}

export default async function NotePage({ params }: NotePageProps) {
    const { id } = await params
    await connectDB()
    const note = (await Note.findById(id).lean()) as INote | null

    if (!note) {
        notFound()
    }

    return (
        <main className="mx-auto min-h-screen max-w-2xl w-full px-6 py-12">
            <div className="flex justify-between items-center mb-12 text-xs tracking-wider uppercase text-neutral-400 font-medium">
                <Link
                    href="/"
                    className="hover:text-neutral-700 transition-colors"
                >
                    {' '}
                    All Notes
                </Link>
            </div>

            <EditNote
                id={id}
                initialTitle={note.title}
                initialText={note.text || ''}
            />
            <div className="mt-16 pt-8 border-t border-neutral-200/60">
                <DeleteNote id={id} />
            </div>
        </main>
    )
}
