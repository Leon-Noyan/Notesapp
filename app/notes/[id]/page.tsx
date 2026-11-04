import { connectDB } from '@/lib/mongodb'
import DeleteNote from '../../components/DeleteNote'
import Note, { INote } from '@/models/Notes'
import { notFound } from 'next/navigation'
import EditNote from '@/app/components/EditNote'

interface NotePageProps {
  params: Promise<{ id: string }>
}

export default async function NotePage( { params }: NotePageProps) {
  const { id } = await params
  await connectDB()
  const note = await Note.findById(id).lean() as INote | null

  if (!note) {
    notFound()
  }

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold text-neutral-900">Note Details</h1>

      <DeleteNote id={id} />
      <EditNote id={id} initialTitle={note.title} initialText={note.text || ''} />
    </main>
  )
}
