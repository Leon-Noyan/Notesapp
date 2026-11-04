import { connectDB } from '@/lib/mongodb'
import Note from '@/models/Notes'
import { CreateNote } from './components/CreateNote'
import { ListFeature } from './components/List'

export const dynamic = 'force-dynamic'

export default async function Home() {
    await connectDB()
    const notes = await Note.find().sort({ createdAt: -1 }).lean()

    return (
        <main className="mx-auto min-h-screen max-w-2xl px-6 py-12">
            <header className="mb-8 flex items-center justify-between border-b border-neutral-200 pb-4">
                <h1 className="text-2xl font-bold text-neutral-900">
                    Notes App
                </h1>

                <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-600">
                    {notes.length}
                </span>
            </header>
            <CreateNote />
            {/* List Container */}
            {notes.length === 0 ? (
                <p className="text-center text-sm text-neutral-500">
                    No notes found, create one now!
                </p>
            ) : (
                <div className="divide-y divide-neutral-100">
                    {notes.map((note) => (
                        <ListFeature
                            key={note._id.toString()}
                            id={note._id.toString()}
                            title={note.title}
                            previewText={note.text || 'No content'}

                        />
                    ))}
                </div>
            )}
        </main>
    )
}
