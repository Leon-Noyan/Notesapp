import { connectDB } from '@/lib/mongodb'
import Note from '@/models/Notes'
import { CreateNote } from './components/CreateNote'
import { ListFeature } from './components/NoteList'

export const dynamic = 'force-dynamic'

interface NoteItems {
    id: string
    title: string
    text?: string
}

export default async function Home() {
    await connectDB()
    const notesData = await Note.find().sort({ createdAt: -1 }).lean()

    const notes: NoteItems[] = notesData.map((note) => ({
        id: note._id.toString(),
        title: note.title,
        text: note.text || ''
    }))

    return (
        <main className="mx-auto max-w-4xl w-full px-8 py-16">
            <header className="mb-12 flex items-center justify-between border-b border-neutral-200/60 pb-6">
                <div>
                    <h1 className="font-serif text-4xl text-neutral-900">
                        NotesApp
                    </h1>

                    <p className="text-sm text-neutral-500 mt-1">
                        {notes.length} notes
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <CreateNote />
                </div>
            </header>

            {/* List Container */}
            {notes.length === 0 ? (
                <p className="text-center text-sm text-neutral-500">
                    No notes found, create one now!
                </p>
            ) : (
                <div className="divide-y divide-neutral-100">
                    {notes.map((note) => (
                        <ListFeature
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            previewText={note.text || 'No content'}
                        />
                    ))}
                </div>
            )}
        </main>
    )
}
